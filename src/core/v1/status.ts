import {getDb, tx} from "@/core/v1/db";
import {DB as DBv1, Status} from "@/core/v1/db/schema";
import {ValueExpression} from "kysely";

export type StatusDataType = ValueExpression<DBv1, "status", "string" | "number" | "object" | "array" | "date">;

export async function updateStatusByName(name: string, value: any) {
  return await getDb().updateTable('status')
    .set({
      status_value: JSON.stringify(value)
    })
    .where('status_name', '=', name)
    .execute();
}

export async function createStatus({ status_name, status_type, status_value }: StatusBase<any>) {
  return await getDb().insertInto('status')
    .values({
      status_name: status_name,
      status_type: status_type,
      status_value: JSON.stringify(status_value),
    })
    .execute();
}

export type StatusBase<V> = Pick<Status, 'status_name' | 'status_type'> & Partial<Pick<Status, 'created_at' | 'last_modified_at'>> & { status_value: V }

export async function compareAndSwap<V>(
  newStatus: StatusBase<V>,
  needUpdate: (oldVal: V, newVal: V) => boolean,
  action: () => Promise<void>,
  createIfNotExists = false,
): Promise<boolean> {
  const { status_name: statusName, status_value: newValue } = newStatus;
  return await tx(async () => {
    let oldStatus;
    try {
      const query = getDb().selectFrom('status')
        .selectAll()
        .where('status_name', '=', eb => eb.val(statusName))
        .forUpdate()
        .noWait()

      if (createIfNotExists) {
        oldStatus = await query.executeTakeFirst();
        if (oldStatus === undefined) {
          await createStatus(newStatus);
          return true;
        }
      } else {
        oldStatus = await query.executeTakeFirstOrThrow();
      }
    } catch (e: any) {
      // Skip if the record is locked.
      if (e?.code === 'ER_LOCK_NOWAIT') {
        return false;
      }
      throw e;
    }

    // Handle date type.
    let oldValue = oldStatus.status_value as any;
    if (oldStatus.status_type == 'date') {
      try {
        oldValue = new Date(oldStatus.status_value as string);
      } catch (e) {
        console.warn('Invalid date format in status value:', oldStatus.status_value);
        return false;
      }
    }

    // Skip if no need to update.
    if (!needUpdate(oldValue, newValue)) {
      return false;
    }

    await action();

    await updateStatusByName(statusName, newValue)
    return true;
  });
}
