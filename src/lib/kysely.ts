import { rag } from '@/core/interface';
import { type Expression, ExpressionBuilder, ExpressionWrapper, ReferenceExpression } from 'kysely';
import type { UUID } from 'node:crypto';
import Vector = rag.Vector;

type VectorLike = Vector | number[];

export function cosineDistance<DB, TB extends keyof DB, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>> (eb: ExpressionBuilder<DB, TB>, column: RE, value: VectorLike) {
  return eb.fn<number>('VEC_COSINE_DISTANCE', [
    column,
    eb => eb.val(vectorToSql(value))],
  );
}

export function cosineSimilarity<DB, TB extends keyof DB, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>> (eb: ExpressionBuilder<DB, TB>, column: RE, value: VectorLike) {
  return eb(eb.lit<number>(1), '-', cosineDistance(eb, column, value));
}

export function vectorToSql (vector: VectorLike) {
  return `[${vector.join(',')}]`;
}

interface TypedFunctions<DB, TB extends keyof DB> {
  uuid_to_bin (uuid: ReferenceExpression<DB, TB> | Expression<UUID>): Buffer;

  bin_to_uuid (bin: ReferenceExpression<DB, TB> | Expression<Buffer>): UUID;
}

declare module 'kysely' {
  export interface FunctionModule<DB, TB> {
    <K extends keyof TypedFunctions<DB, TB>> (name: K, args: Readonly<Parameters<TypedFunctions<DB, TB>[K]>>): ExpressionWrapper<DB, TB, ReturnType<TypedFunctions<DB, TB>[K]>>;
  }
}

export function uuidToBin<DB = any, TB extends keyof DB = any> (value: UUID): ((eb: ExpressionBuilder<DB, TB>) => ExpressionWrapper<DB, TB, Buffer>) {
  return (eb: ExpressionBuilder<DB, TB>) => {
    return eb.fn('uuid_to_bin', [eb.val(value)]);
  };
}

export function binToUUID<DB = any, TB extends keyof DB = any, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>> (eb: ExpressionBuilder<DB, TB>, value: RE): ExpressionWrapper<DB, TB, UUID> {
  return eb.fn('bin_to_uuid', [eb.val(value)]);
}


