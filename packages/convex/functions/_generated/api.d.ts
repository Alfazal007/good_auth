/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as createApiKeyAndSecret from "../createApiKeyAndSecret.js";
import type * as createOrganization from "../createOrganization.js";
import type * as getApiKeyByProjectId from "../getApiKeyByProjectId.js";
import type * as getOrganizationById from "../getOrganizationById.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  createApiKeyAndSecret: typeof createApiKeyAndSecret;
  createOrganization: typeof createOrganization;
  getApiKeyByProjectId: typeof getApiKeyByProjectId;
  getOrganizationById: typeof getOrganizationById;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
