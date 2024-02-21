import { apiPost } from "./common.ts";

import {
  API_RESPONSE_GENERAL_ERRORS,
  ApiErrorCode,
  ApiErrorResponse,
  createApiErrorResponse,
} from "./errors.ts";

/**
 * Takes credentials of user registered at Uptime.com (username (email) and password)
 * and attempts to authorize using Uptime Open API.
 *
 * Resolves to an API token, linked with user whose credentials were provided.
 * Rejects with an error it credentials were absent or did not match to a known user.
 */
export async function attemptLogin(
  email: string,
  password: string
): Promise<string | ApiErrorResponse> {
  try {
    const response = await apiPost("/auth/login/", { email, password });
    const result = await response.json();

    if (!response.ok) {
      return result?.messages ?? createApiErrorResponse(
        ApiErrorCode.Unknown,
        "Unknown problem occurred. Please, let us know.",
        [`Raw response: ${await response.text()}`]
      );
    }

    if (!result?.access_token?.length) {
      // [ASSERTION FAILED] Despite success response being received, expected
      //   field was not present in response payload.
      return createApiErrorResponse(
        ApiErrorCode.ApiRequestError,
        "Unknown problem occurred. Please, let us know.",
        ["'access_token' field was absent from login success response."]
      );
    }

    return result.access_token;
  } catch (error) {
    // A problem with fetch parameters, with CORS settings, or network-related error.
    console.error(error);

    return createApiErrorResponse(
      ApiErrorCode.ApiRequestError,
      "Login attempt failed - please, try again later!",
      [error.message]
    );
  }
}
