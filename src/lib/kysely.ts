import {RawBuilder, sql} from 'kysely';
import {rag} from "@/core/interface";
import Vector = rag.Vector;

type VectorLike = Vector | number[];

export function l1Distance(column: string, value: VectorLike): RawBuilder<number> {
  return sql`VEC_L1_DISTANCE(${sql.ref(column)}, ${toSql(value)})`;
}

export function l2Distance(column: string, value: VectorLike): RawBuilder<number> {
  return sql`VEC_L2_DISTANCE(${sql.ref(column)}, ${toSql(value)})`;
}

export function negativeInnerProduct(column: string, value: VectorLike): RawBuilder<number> {
  return sql`VEC_NEGATIVE_INNER_PRODUCT(${sql.ref(column)}, ${toSql(value)})`;
}

export function innerProduct(column: string, value: VectorLike): RawBuilder<number> {
  return sql`1 - VEC_NEGATIVE_INNER_PRODUCT(${sql.ref(column)}, ${toSql(value)})`;
}

export function cosineDistance(column: string, value: VectorLike): RawBuilder<number> {
  return sql`VEC_COSINE_DISTANCE(${sql.ref(column)}, ${toSql(value)})`;
}

export function cosineSimilarity(column: any, value: VectorLike): RawBuilder<number> {
  return sql`1 - VEC_COSINE_DISTANCE(${sql.ref(column)}, ${toSql(value)})`;
}

export function fromSql(value: string) {
  return value.substring(1, value.length - 1).split(',').map((v) => parseFloat(v));
}

export function toSql (vector: VectorLike) {
  return `[${vector.join(',')}]`;
}
