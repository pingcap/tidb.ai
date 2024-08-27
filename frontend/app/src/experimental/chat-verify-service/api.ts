import { handleResponse } from '@/lib/request';
import { z, type ZodType } from 'zod';

const HOST = 'https://verify.tidb.ai';

export const enum VerifyStatus {
  CREATED = 'CREATED',
  EXTRACTING = 'EXTRACTING',
  VALIDATING = 'VALIDATING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED'
}

export interface MessageVerifyResponse {
  status: VerifyStatus;
  message?: string | null;
  runs: MessageVerifyResponse.Run[];
}

export namespace MessageVerifyResponse {
  export type Run = {
    sql: string
    explanation: string
    success: boolean
    results?: any[][]
    sql_error_code?: number | null
    sql_error_message?: string | null
    llm_verification?: string | null
    warnings?: string[]
  }
}

const verifyResponse = z.object({
  job_id: z.string(),
});

const getVerifyResponse = z.object({
  status: z.enum([VerifyStatus.CREATED, VerifyStatus.EXTRACTING, VerifyStatus.VALIDATING, VerifyStatus.SUCCESS, VerifyStatus.FAILED, VerifyStatus.SKIPPED]),
  message: z.string().nullish(),
  runs: z.array(z.object({
    sql: z.string(),
    explanation: z.string(),
    success: z.boolean(),
    results: z.any().array().array().optional(),
    sql_error_code: z.number().nullish(),
    sql_error_message: z.string().nullish(),
    llm_verification: z.string().nullish(),
    warnings: z.string().array().optional(),
  })),
}) satisfies ZodType<MessageVerifyResponse, any, any>;

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

export function isFinalVerifyState (state: VerifyStatus) {
  return [VerifyStatus.SUCCESS, VerifyStatus.FAILED, VerifyStatus.SKIPPED].includes(state);
}

export function isVisibleVerifyState (state: VerifyStatus) {
  return [VerifyStatus.SUCCESS, VerifyStatus.FAILED].includes(state);
}
