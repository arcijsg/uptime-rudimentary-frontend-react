// Vendor imports
import { create } from "zustand"
import { derive } from "derive-zustand"
import { devtools, persist } from "zustand/middleware"
// App imports
import { storeWithSelectors } from "./utils.ts";

interface State {
  accessToken: string | null;
}

interface Actions {
  login: (token: State['accessToken']) => void;
  logout: () => void;
}

export const useAuthStoreRaw = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        // Actions:
        login: (token: string) => set((state) => ({ accessToken: token })),
        logout: () => set((state) => ({ accessToken: null })),
      }),
      {
        name: "authStore",
      }
    )
  )
);

// Allows to access individual items on store simply by:
// const accessToken = useAuthStore.use.accessToken();
export const useAuthStore = storeWithSelectors(useAuthStoreRaw);

/**
 * [derived state]
 *
 * Whether there is a non-empty access token known in app-wide state?
 * NOTE: we do not call it like 'isLoggedIn', as auth token might be both regenerated
 *   or invalidated via Uptime.com as well as augmented by directly editing browser storage.
 */
export const hasAuthToken = derive<boolean>((get) => get(useAuthStoreRaw).accessToken?.length > 0);
