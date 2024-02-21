/**
 * Displays a list of monitoring checks currently logged in user has created.
 *
 * TODO: paginate the lists or offer something akin to "Load more" or "Load on scroll"
 * TODO: filter lists by:
 *  - type (API, Webhook, Heartbeat, ...)
 *  - activity (is paused or not)
 */

export default function CheckList() {
    return (
      <ul>
        <Check />
      </ul>
    )
}
