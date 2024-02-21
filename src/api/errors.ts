
// MARK: type definitions for API error responses

/**
 * Relevant values of "message.error_code" in scope of this example application.
 *
 * Helps to discern problem cause when Uptime.com API responds with 400 HTTP status code
 */
export enum ApiErrorCode {
  // exception while attempting API request (does not originate from Uptime.com)
  ApiRequestError = "API_REQUEST_ERROR",
  Unknown = "UNKNOWN_PROBLEM",
  // Relevant error codes, returned by Uptime.com API
  RateLimit = "API_RATE_LIMIT",
  NotAAcceptable = "NOT_ACCEPTABLE",
  ValidationError = "VALIDATION_ERROR",
}


export interface ApiErrorResponse {
  errors: true;
  error_code: ApiErrorCode | string;
  // General error message (full sentence in English)
  error_message: string;
  // Maps field names to list of problems, associated with them.
  // Special "non_field_errors" key lists error messages that describes the
  // situation as a whole (like "Unable to log in with provided credentials.")
  error_fields: Record<string, string[]>
}

/**
 * Validation errors which are not tied to a particular request data field
 * are listed under this key in API (validation?) error responses.
 */
export const API_RESPONSE_GENERAL_ERRORS = "non_field_errors";

// MARK: utilities for consuming API error responses

export function createApiErrorResponse(
  code: ApiErrorCode,
  problem: string,
  reasons: string[]
): ApiErrorResponse {
  return {
    errors: true,
    error_code: code,
    error_message: problem,
    error_fields: {
      [API_RESPONSE_GENERAL_ERRORS]: reasons || [],
    }
  };
}

/**
 * Takes an object, mapping field names to list of error messages as strings,
 * associated with that field.
 *
 * Returns an object that maps field names to single error message that names
 * all problems associated with each (request) field.
 *
 * TODO: belongs to presentational layer.
 */
export function flattenErrors(
  errorsByField: Record<string, string[]>,
  delimiter = "; "
): Record<string, string> {
  return objectMap(errorsByField, (errors: string[]) => errors.join(delimiter));
}

/**
 *
 */


// Adapted from https://stackoverflow.com/a/14810722
// TODO: extract to app-wide utilities if code outside from API error handling
//   might benefit from this f-ion.
function objectMap(obj, mapFn) {
  return Object.fromEntries(
    Object.entries(obj).map(
      ([key, val], idx) => [key, mapFn(val, key, idx)]
    )
  );
}
