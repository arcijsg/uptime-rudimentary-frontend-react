// Vendor imports
import { useStore } from "zustand"
// App imports
import { useAuthStore, hasAuthToken } from "/src/state/auth.store.ts";
import {
  API_RESPONSE_GENERAL_ERRORS,
  ApiErrorCode,
  ApiErrorResponse,
} from "./errors.ts";

// To overcome CORS issues when using from localhost,
// please, run a local proxy server which would act as a middleman between
// the browser and Uptime.com API and would ensure each response would have
// at least "Access-Control-Allow-Origin: *" header set to lull the browser into submission.
//
// Either a locally-run proxy could be used, like one for Deno:
//
// ```bash
// deno run --allow-net --allow-env https://deno.land/x/cors_proxy/mod.ts --port=7007
// ```
//
// or [npm:local-cors-proxy](https://github.com/garmeeh/local-cors-proxy)
//
// The gist of solution demonstrated by:
// - https://github.com/hackathon-sidn/cors-proxy/blob/master/server.ts
//
// Alternatively, a publicly available CORS proxy service could be used, like
// https://cors-proxy.fringe.zone/{originalURL}.
//
// Be sure to update .env file at project root and prefix UPTIME_API_BASE_URL
// value with a proxy when developing locally.
//
// See also: https://v2.vitejs.dev/guide/env-and-mode.html#env-files

const DEFAULT_API_BASE = "https://uptime.com/api/v1";
const configuredApiBaseUrl: string = import.meta.env.UPTIME_API_BASE_URL ?? DEFAULT_API_BASE;

// w/o trailig slash for convenience
export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, '');

export async function apiPost(
  resource: string,
  payload: any,
  options: Omit<RequestInit, 'body', 'method'> = {},
): Promise<Response> {
  return apiRequest("POST", resource, { ...options, body: payload });
}


export async function apiRequest(
  method: "HEAD" | "OPTIONS" | "GET" | "POST" | "PUT" | "DELETE",
  resource: string,
  // see: https://docs.deno.com/deploy/api/runtime-request#requestinit
  options: Omit<RequestInit, 'method'> = {},
): Promise<Response> {
  if (!resource.startsWith("/")) {
    resource = `/${resource}`;
  }
  const url = `${API_BASE_URL}${resource}`;

  if (!!options.body && "string" !== typeof options.body) {
    options.body = JSON.stringify(options.body);
  }

  options.headers = new Headers(options.headers);

  if (!options.headers.has("content-type")) {
    options.headers.set("content-type", "application/json");
  }

  // TODO: normally, global state like this would be dependency-injected
  // (provided by a DI mechanism of choice), instead of referencing app-wide
  // singleton directly.
  if (!options.headers.has("authorization") && hasAuthToken.getState()) {
    const authToken = useAuthStore.use.accessToken(); // .getState()
    options.headers.set("authorization", `Token ${authToken}`);
  }

  const request = new Request(url, {...options, method});
  return fetch(request);
}
