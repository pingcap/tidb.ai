import { handleResponse } from '@/lib/request';
import { z } from 'zod';

const HOST = 'https://verify.tidb.ai';

export const enum VerifyState {
  CREATED = 'CREATED',
  EXTRACTING = 'EXTRACTING',
  VALIDATING = 'VALIDATING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

const verifyResponse = z.object({
  job_id: z.string(),
});

const getVerifyResponse = z.object({
  state: z.enum([VerifyState.CREATED, VerifyState.EXTRACTING, VerifyState.VALIDATING, VerifyState.SUCCESS, VerifyState.FAILED]),
  message: z.string().optional(),
  runs: z.object({
    sql: z.string(),
  }).and(z.object({
    success: z.literal(true),
    results: z.any().array().array(),
  }).or(z.object({
    success: z.literal(false),
    sql_error_code: z.number(),
    sql_error_message: z.string(),
    warnings: z.string(),
  }))).array().optional(),
});

export async function verify (question: string, answer: string) {
  return await fetch(`${HOST}/api/v1/sqls-validation`, {
    method: 'POST',
    body: JSON.stringify({ qa_content: `User question: ${question}\n\nAnswer:\n${answer}` }),
  }).then(handleResponse(verifyResponse));
}

export async function getVerify (id: string) {
  return await fetch(`${HOST}/api/v1/sqls-validation/${id}`, {}).then(handleResponse(getVerifyResponse));
}

export function isFinalVerifyState (state: VerifyState) {
  return [VerifyState.SUCCESS, VerifyState.FAILED].includes(state);
}