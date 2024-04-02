import {NextResponse} from "next/server";

export class APIError extends Error {
  constructor(public message: string, public statusCode: number, cause: Error | null = null) {
    super(message, {
      cause
    });
  }

  static new(message: string, statusCode: number, cause: Error | null = null) {
    return new APIError(message, statusCode, cause);
  }

  toResponse() {
    return NextResponse.json({ message: this.message }, { status: this.statusCode });
  }

}

/**
 * Authentication related errors
 */

export const AUTH_REQUIRE_AUTHED_ERROR = APIError.new('Require authentication', 401);


/**
 * ReCaptcha related errors
 */

export const RECAPTCHA_REQUIRE_TOKEN_ERROR = APIError.new('Require reCaptcha token', 401);

export const RECAPTCHA_RETRIEVE_CONFIG_ERROR = APIError.new('Failed to retrieve reCaptcha config', 501);

export const RECAPTCHA_INVALID_TOKEN_ERROR = APIError.new('ReCaptcha token invalid', 401);

export const RECAPTCHA_INVALID_MODE_ERROR = APIError.new('ReCaptcha mode invalid', 501);
