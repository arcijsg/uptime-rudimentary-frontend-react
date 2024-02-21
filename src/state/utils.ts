/**
 * Utility functions to simplify working with Zustand stores.
 */

 import { StoreApi, UseBoundStore } from "zustand";

/**
 * A convenience f-ion (a syntactic sugar) to honour the principles of DRY
 * and avoid a need for tediously writing individual selector f-ions whenever
 * accessing properties or actions from a Zustand store.
 *
 * ```TS
 * // Having an example store like:
 *
 * interface CookiesState {
 *   cookiesOnPlate: number
 *   bake: (howMany: number) => void
 * }
 *
 * const useCookiesStore = create<CookiesState>()((set) => ({
 *   cookiesOnPlate: 0,
 *   bake: (by) => set((state) => ({ cookiesOnPlate: state.cookiesOnPlate + howMany })),
 * }))
 *
 * // Instead of writing individual selector for each store item like this:
 *
 * const cookiesRightNow = useCookiesStore((state) => state.cookiesOnPlate);
 * const bakeMeMoreOfThesePlease = useCookiesStore((state) => state.bake);
 *
 * // We can export a store with auto-generated selectors like:
 * const useCookiesStoreConveniently = storeWithSelectors(useCookiesStore);
 *
 * const cookies = useCookiesStoreConveniently.use.cookiesRightNow();
 * ```
 *
 * Source: https://github.com/pmndrs/zustand/blob/main/docs/guides/auto-generating-selectors.md#create-the-following-function-createselectors
 *
 * NOTE: it is not possible to use this convenience f-ion for stores that have
 *   top-level member named "use"!
 */
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const storeWithSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;

  store.use = {};

  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store;
}
