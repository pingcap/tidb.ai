import {ExpressionBuilder, expressionBuilder, RawBuilder, ReferenceExpression, sql} from 'kysely';
import {rag} from "@/core/interface";
import Vector = rag.Vector;

type VectorLike = Vector | number[];

export function cosineDistance<DB, TB extends keyof DB, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(eb: ExpressionBuilder<DB, TB>, column: RE, value: VectorLike) {
  return  eb.fn<number>('VEC_COSINE_DISTANCE', [
    column,
    eb => eb.val(vectorToSql(value))],
  );
}

export function cosineSimilarity<DB, TB extends keyof DB, RE extends ReferenceExpression<DB, TB> = ReferenceExpression<DB, TB>>(eb: ExpressionBuilder<DB, TB>, column: RE, value: VectorLike) {
   return eb(eb.lit<number>(1), '-', cosineDistance(eb, column, value));
}

export function vectorToSql (vector: VectorLike) {
  return `[${vector.join(',')}]`;
}
