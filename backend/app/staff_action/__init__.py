from sqlmodel import Session

from app.models import StaffActionLog


def create_staff_action_log(
    session: Session, action, target_type, target_id, before, after, commit=True
):
    staff_action_log = StaffActionLog(
        action=action,
        target_type=target_type,
        target_id=target_id,
        before=before,
        after=after,
    )
    session.add(staff_action_log)
    if commit:
        session.commit()
    return staff_action_log
