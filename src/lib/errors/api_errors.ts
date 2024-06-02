import {NextResponse} from "next/server";
import * as util from "util";

export interface APIErrorOptions {
  name?: string;
  cause?: Error | null;
}

export class APIError extends Error {

  public name: string = 'API_ERROR';

  constructor(public message: string, public statusCode: number, options: APIErrorOptions = {}) {
    super(message, {
      cause: options.cause
    });

    if (options.name) {
      this.name = options.name
    }
  }

  static new(message: string, statusCode: number, options: APIErrorOptions = {}) {
    return new APIError(message, statusCode, options);
  }

  static fromError(error: unknown, statusCode: number = 500) {
    // TODO: Handle Zod errors

    if (error instanceof APIError) {
      return error;
    }

    if (error instanceof Error) {
      return new APIError(error.message, statusCode, {
        name: error.constructor.name,
        cause: error,
      });
    } else {
      return new APIError(String(error), statusCode);
    }
  }

  format(...args: any[]) {
    this.message = util.format(this.message, ...args);
    return this;
  }

  toResponse() {
    return NextResponse.json({ message: this.message }, { status: this.statusCode });
  }

}

/**
 * Authentication related errors
 */

export const AUTH_REQUIRE_AUTHED_ERROR = APIError.new('Require authentication', 401);

export const AUTH_FORBIDDEN_ERROR = APIError.new('Forbidden', 403);

/**
 * The third-party application related errors
 */

export const APP_AUTH_REQUIRE_AUTH_TOKEN_ERROR = APIError.new('Require Access Token for the third-party application', 401);

export const APP_AUTH_INVALID_AUTH_TOKEN_ERROR = APIError.new('Invalid Access Token for the third-party application', 401);

/**
 * CronJob related errors
 */

export const CRONJOB_REQUIRE_AUTH_TOKEN_ERROR = APIError.new('Require CronJob authentication token', 401);

export const CRONJOB_INVALID_AUTH_TOKEN_ERROR = APIError.new('Invalid CronJob authentication token', 401);

/**
 * ReCaptcha related errors
 */

export const RECAPTCHA_REQUIRE_TOKEN_ERROR = APIError.new('Require reCaptcha token', 401);

export const RECAPTCHA_RETRIEVE_CONFIG_ERROR = APIError.new('Failed to retrieve reCaptcha config', 501);

export const RECAPTCHA_INVALID_TOKEN_ERROR = APIError.new('ReCaptcha token invalid', 401);

export const RECAPTCHA_INVALID_MODE_ERROR = APIError.new('ReCaptcha mode invalid', 501);

/**
 * Index related errors
 */
export const INDEX_NOT_FOUND_ERROR = APIError.new('Index <%s> not found', 404);

/**
 * Chat Engine Related
 */
export const CHAT_ENGINE_NOT_FOUND_ERROR = APIError.new(`Specified chat engine %s is not found.`, 404);

/**
 * Chat Related
 */
export const CHAT_CAN_NOT_ASSIGN_SESSION_ID_ERROR = APIError.new( 'Cannot assign sessionId when creating chats.', 400);
