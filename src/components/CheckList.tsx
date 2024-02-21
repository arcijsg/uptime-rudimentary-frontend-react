/**
 * Displays a list of monitoring checks currently logged in user has created.
 *
 * TODO: paginate the lists or offer something akin to "Load more" or "Load on scroll"
 * TODO: filter lists by:
 *  - type (API, Webhook, Heartbeat, ...)
 *  - activity (is paused or not)
 */

export default function CheckList() {
  // TODO: load checks in zustand store, owned by this component, using:
  // useEffect(
  //    () => fetchFrom(https://uptime.com/api/v1/docs/#/auth/get_auth_me),
  //  []  // mimic behaviour of Vue "mounted" life-cycle hook.
  // )

  // TODO: allow to filter by check type ("API", "Webhook", ...)
  // TODO: see if `leitenFilterRequest` from https://github.com/hecmatyar/leiten-zustand might be useful
  //   to refetch relevant checks whenever filters change?
  return (
  )
}
