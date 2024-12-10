from typing import Optional, List

from fastapi import APIRouter, status, HTTPException, Depends
from fastapi_pagination import Params, Page
from sqlalchemy import func
from sqlmodel import select, case, desc

from app.api.admin_routes.evaluation.models import CreateEvaluationDataset, UpdateEvaluationDataset, \
    ModifyEvaluationDatasetItem
from app.file_storage import default_file_storage
from app.models import EvaluationTask, EvaluationItem, Upload, EvaluationStatus, EvaluationDataset, \
    EvaluationDatasetItem
from app.api.deps import SessionDep, CurrentSuperuserDep

import pandas as pd
from fastapi_pagination.ext.sqlmodel import paginate

from app.tasks.evaluate import add_evaluation_task
from app.types import MimeTypes

router = APIRouter()


@router.post("/admin/evaluation/dataset")
def create_evaluation_dataset(
    evaluation_dataset: CreateEvaluationDataset,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> EvaluationDataset:
    """
    Create a dataset for a given question and chat engine.
    This API depends on the /admin/uploads API to upload the evaluation data.
    The evaluation data is expected to be a CSV file with the following columns:

    - query: The query to evaluate
    - reference: The expected response to the query

    You can add more columns to the CSV file, and the extra columns will adhere to the results.

    Args:
        evaluation_dataset.name: The name of the evaluation dataset.
        evaluation_dataset.upload_id: The ID of the uploaded CSV file of the evaluation dataset.

    Returns:
        True if the evaluation dataset is created successfully.
    """
    name = evaluation_dataset.name
    evaluation_file_id = evaluation_dataset.upload_id

    if evaluation_file_id is not None:
        # If the evaluation_file_id is provided, validate the uploaded file
        upload = session.get(Upload, evaluation_file_id)

        if not upload or upload.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Uploaded file not found",
            )

        if upload.mime_type != MimeTypes.CSV:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The uploaded file must be a CSV file.",
            )

        with default_file_storage.open(upload.path) as f:
            df = pd.read_csv(f)

            # check essential columns
            must_have_columns = ["query", "reference"]
            if not set(must_have_columns).issubset(df.columns):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"The uploaded file must have the following columns: {must_have_columns}",
                )

            eval_list = df.to_dict(orient='records')
            # create evaluation dataset items
            evaluation_data_list = [EvaluationDatasetItem(
                query=item["query"],
                reference=item["reference"],
                retrieved_contexts=[],  # TODO: implement this after we can retrieve contexts
                extra={k: item[k] for k in item if k not in must_have_columns},
            ) for item in eval_list]

    evaluation_task = EvaluationDataset(
        name=name,
        user_id=user.id,
        evaluation_data_list=evaluation_data_list,
    )

    session.add(evaluation_task)
    session.commit()

    return evaluation_task


@router.delete("/admin/evaluation/dataset/{evaluation_dataset_id}")
def delete_evaluation_dataset(
    evaluation_dataset_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> bool:
    evaluation_dataset = session.get(EvaluationDataset, evaluation_dataset_id)

    if not evaluation_dataset or evaluation_dataset.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation dataset not found",
        )

    session.delete(evaluation_dataset)
    session.commit()

    return True


@router.put("/admin/evaluation/dataset/{evaluation_dataset_id}")
def update_evaluation_dataset(
    evaluation_dataset_id: int,
    updated_evaluation_dataset: UpdateEvaluationDataset,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> EvaluationDataset:
    evaluation_dataset = session.get(EvaluationDataset, evaluation_dataset_id)

    if not evaluation_dataset or evaluation_dataset.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation dataset not found",
        )

    evaluation_dataset.name = updated_evaluation_dataset.name

    session.merge(evaluation_dataset)
    session.commit()

    return evaluation_dataset


@router.get("/admin/evaluation/dataset")
def list_evaluation_dataset(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[EvaluationDataset]:
    stmt = (
        select(EvaluationDataset)
        .where(EvaluationDataset.user_id == user.id)
        .order_by(desc(EvaluationDataset.id))
    )
    return paginate(session, stmt, params)


@router.post("/admin/evaluation/dataset-item")
def create_evaluation_dataset_item(
    evaluation_dataset_item: ModifyEvaluationDatasetItem,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> EvaluationDatasetItem:
    evaluation_task_item = EvaluationDatasetItem(
        query=evaluation_dataset_item.query,
        reference=evaluation_dataset_item.reference,
        retrieved_contexts=evaluation_dataset_item.retrieved_contexts,
        extra=evaluation_dataset_item.extra,
        evaluation_dataset_id=evaluation_dataset_item.evaluation_dataset_id,
    )

    session.add(evaluation_task_item)
    session.commit()

    return evaluation_task_item


@router.delete("/admin/evaluation/dataset-item/{evaluation_dataset_item_id}")
def delete_evaluation_dataset_item(
        evaluation_dataset_item_id: int,
        session: SessionDep,
        user: CurrentSuperuserDep
) -> bool:
    evaluation_dataset_item = session.get(EvaluationDatasetItem, evaluation_dataset_item_id)

    if not evaluation_dataset_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation dataset item not found",
        )

    session.delete(evaluation_dataset_item)
    session.commit()

    return True


@router.put("/admin/evaluation/dataset-item/{evaluation_dataset_item_id}")
def update_evaluation_dataset_item(
    evaluation_dataset_item_id: int,
    updated_evaluation_dataset_item: ModifyEvaluationDatasetItem,
    session: SessionDep,
    user: CurrentSuperuserDep
) -> EvaluationDatasetItem:
    evaluation_dataset_item = session.get(EvaluationDatasetItem, evaluation_dataset_item_id)

    if not evaluation_dataset_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation dataset item not found",
        )

    evaluation_dataset_item.query = updated_evaluation_dataset_item.query
    evaluation_dataset_item.reference = updated_evaluation_dataset_item.reference
    evaluation_dataset_item.retrieved_contexts = updated_evaluation_dataset_item.retrieved_contexts
    evaluation_dataset_item.extra = updated_evaluation_dataset_item.extra
    evaluation_dataset_item.evaluation_dataset_id = updated_evaluation_dataset_item.evaluation_dataset_id

    session.commit()

    return evaluation_dataset_item


@router.get("/admin/evaluation/dataset/{evaluation_dataset_id}/dataset-item")
def list_evaluation_dataset_item(
    session: SessionDep,
    user: CurrentSuperuserDep,
    evaluation_dataset_id: int,
    params: Params = Depends(),
) -> Page[EvaluationDatasetItem]:
    stmt = (
        select(EvaluationDatasetItem)
        .where(EvaluationDatasetItem.evaluation_dataset_id == evaluation_dataset_id)
        .order_by(EvaluationDatasetItem.id)
    )
    return paginate(session, stmt, params)
