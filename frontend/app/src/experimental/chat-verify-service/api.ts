import { handleResponse } from '@/lib/request';
import { z } from 'zod';

const HOST = 'https://verify.tidb.ai';

export const enum VerifyState {
  CREATED = 'CREATED',
  EXTRACTING = 'EXTRACTING',
  VALIDATING = 'VALIDATING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED'
}

const verifyResponse = z.object({
  job_id: z.string(),
});

const getVerifyResponse = z.object({
  status: z.enum([VerifyState.CREATED, VerifyState.EXTRACTING, VerifyState.VALIDATING, VerifyState.SUCCESS, VerifyState.FAILED]),
  message: z.string().nullish(),
  runs: z.object({
    sql: z.string(),
    explanation: z.string(),
  })
    .and(z.object({
      success: z.literal(true),
      results: z.any().array().array(),
    }).or(z.object({
      success: z.literal(false),
      sql_error_code: z.number().nullish(),
      sql_error_message: z.string().nullish(),
      warnings: z.string().array(),
    }))).array(),
});

export async function verify (question: string, answer: string) {
  return await fetch(`${HOST}/api/v1/sqls-validation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ qa_content: `User question: ${question}\n\nAnswer:\n${answer}` }),
  }).then(handleResponse(verifyResponse));
}

export async function getVerify (id: string) {
  return await fetch(`${HOST}/api/v1/sqls-validation/${id}`).then(handleResponse(getVerifyResponse));
}

export function isFinalVerifyState (state: VerifyState) {
  return [VerifyState.SUCCESS, VerifyState.FAILED, VerifyState.SKIPPED].includes(state);
}