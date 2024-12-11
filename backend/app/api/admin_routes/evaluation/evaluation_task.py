from typing import Optional, List

from fastapi import APIRouter, status, HTTPException, Depends
from fastapi_pagination import Params, Page
from sqlalchemy import func
from sqlmodel import select, case, desc

from app.api.admin_routes.evaluation.models import CreateEvaluationTask, EvaluationTaskSummary
from app.api.admin_routes.evaluation.tools import must_get_and_belong, must_get
from app.file_storage import default_file_storage
from app.models import EvaluationTask, EvaluationItem, EvaluationStatus, EvaluationDataset, EvaluationDatasetItem
from app.api.deps import SessionDep, CurrentSuperuserDep

import pandas as pd
from fastapi_pagination.ext.sqlmodel import paginate

from app.tasks.evaluate import add_evaluation_task
from app.types import MimeTypes

router = APIRouter()


@router.post("/admin/evaluation/task")
def create_evaluation_task(
    evaluation_task: CreateEvaluationTask,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> Optional[EvaluationTask]:
    """
    Create an evaluation task from the evaluation dataset.

    Args:
        evaluation_task.name: The name of the evaluation task.
        evaluation_task.evaluation_dataset_id: The ID of the uploaded evaluation dataset.
        evaluation_task.chat_engine: The chat engine to evaluate the queries against. Default is "default".
        evaluation_task.run_size: The number of queries to evaluate. Default is None, which means all queries in the CSV file.

    Returns:
        True if the evaluation task is created successfully.
    """

    name = evaluation_task.name
    evaluation_dataset_id = evaluation_task.evaluation_dataset_id
    chat_engine = evaluation_task.chat_engine
    run_size = evaluation_task.run_size

    dataset = must_get_and_belong(session, EvaluationDataset, evaluation_dataset_id, user.id)

    # create evaluation items
    # caveat: Do the deep copy on purpose to avoid the side effect of the original dataset modification
    evaluation_items = [EvaluationItem(
        status=EvaluationStatus.NOT_START,
        chat_engine=chat_engine,
        query=item.query,
        reference=item.reference,
        retrieved_contexts=item.retrieved_contexts,
        extra=item.extra,
    ) for item in dataset.evaluation_data_list]

    evaluation_task = EvaluationTask(
        name=name,
        user_id=user.id,
        evaluation_items=evaluation_items,
        dataset_id=evaluation_dataset_id,
    )

    session.add(evaluation_task)
    session.commit()

    add_evaluation_task.delay(evaluation_task.id)

    return evaluation_task


@router.get("/admin/evaluation/task/{evaluation_task_id}/summary")
def get_evaluation_task_summary(
    evaluation_task_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> EvaluationTaskSummary:
    task = session.exec(select(EvaluationTask).where(EvaluationTask.id == evaluation_task_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="EvaluationTask not found")

    if task.user_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    status_counts = (
        session.query(
            func.count(case((EvaluationItem.status == EvaluationStatus.NOT_START, 1), else_=None)).label("not_start"),
            func.count(case((EvaluationItem.status == EvaluationStatus.EVALUATING, 1), else_=None)).label(
                "evaluating"),
            func.count(case((EvaluationItem.status == EvaluationStatus.DONE, 1), else_=None)).label("done"),
            func.count(case((EvaluationItem.status == EvaluationStatus.ERROR, 1), else_=None)).label("error"),
        )
        .filter(EvaluationItem.evaluation_task_id == evaluation_task_id)
        .one()
    )

    stats = {}
    if status_counts.not_start == 0 and status_counts.evaluating == 0:
        stats = (
            session.query(
                func.avg(EvaluationItem.factual_correctness).label('avg_factual_correctness'),
                func.avg(EvaluationItem.semantic_similarity).label('avg_semantic_similarity'),
                func.min(EvaluationItem.factual_correctness).label('min_factual_correctness'),
                func.min(EvaluationItem.semantic_similarity).label('min_semantic_similarity'),
                func.max(EvaluationItem.factual_correctness).label('max_factual_correctness'),
                func.max(EvaluationItem.semantic_similarity).label('max_semantic_similarity'),
                func.stddev(EvaluationItem.factual_correctness).label('std_factual_correctness'),
                func.stddev(EvaluationItem.semantic_similarity).label('std_semantic_similarity'),
            )
            .filter(
                EvaluationItem.evaluation_task_id == evaluation_task_id,
                EvaluationItem.status == EvaluationStatus.DONE,
                EvaluationItem.factual_correctness.isnot(None),
                EvaluationItem.semantic_similarity.isnot(None),
            )
            .one()
        )

    return EvaluationTaskSummary(
        task=task,
        not_start=status_counts.not_start,
        succeed=status_counts.done,
        errored=status_counts.error,
        progressing=status_counts.evaluating,
        avg_factual_correctness=stats.avg_factual_correctness,
        avg_semantic_similarity=stats.avg_semantic_similarity,
        min_factual_correctness=stats.min_factual_correctness,
        min_semantic_similarity=stats.min_semantic_similarity,
        max_factual_correctness=stats.max_factual_correctness,
        max_semantic_similarity=stats.max_semantic_similarity,
        std_factual_correctness=stats.std_factual_correctness,
        std_semantic_similarity=stats.std_semantic_similarity,
    )


@router.get("/admin/evaluation/tasks")
def list_evaluation_task(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[EvaluationTask]:
    stmt = (
        select(EvaluationTask)
        .where(EvaluationTask.user_id == user.id)
        .order_by(desc(EvaluationTask.id))
    )
    return paginate(session, stmt, params)


@router.get("/admin/evaluation/tasks/{evaluation_task_id}/items")
def list_evaluation_task_items(
    evaluation_task_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> List[EvaluationItem]:
    task = session.exec(select(EvaluationTask).where(EvaluationTask.id == evaluation_task_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="EvaluationTask not found")

    if task.user_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    return task.evaluation_items
