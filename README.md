# Vite + Deno + React + TypeScript

Project boilerplate was created by running:
```bash
deno run --allow-env --allow-read --allow-write npm:create-vite-extra
```

and chose "Vite + React" and then "TypeScript + SWC" from the prompts offered.

NOTE: please, [see SWC issues](https://github.com/swc-project/swc/issues/7435), as it's still considered to be a bit experimental transpiler.

Deno just happens to be the JavaScript runtime of choice of the author right now, mostly for it's robust support of TypeScript that comes out of the box, and for native support for [fetch](https://docs.deno.com/runtime/tutorials/fetch_data).

## What it currently is

As a first attempt of writing anything in React by the author, it consists of an quite modest login page, where email and password pair can be exchanged to an opaque API token, tied to Uptime.com user account.

The API token form the only app-wide state right now (managed by [zustand]https://github.com/pmndrs/zustand) for simplicity), and by the virtue of zustand [persist middleware](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md) gets serialized to browser `localStorage`. Which is not exactly a great practice, but for this contrived example it allows the application to keep auth state after page gets refreshed.

In a more realistic case, a tiny proxying backend layer between Uptime.com API and custom front end might be useful to avoid exposing API tokens to browser and use an approach, pleasantly described in [this article](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3).

[Evergreen, design system used by Segment](https://evergreen.segment.com/) was chosen for quickly assembling visual primitives.

CORS issues were worked around by using a publicly accessible tiny proxy layer, https://cors-proxy.fringe.zone/ (see `.env.development`), although a locally executed proxy (like [this npm package](https://github.com/garmeeh/local-cors-proxy) or [a similar one for Deno](https://github.com/hackathon-sidn/cors-proxy/blob/master/server.ts)) could offer similar remedy to the widely known problem that plagues developers who relies upon remote APIs while developing front end locally.

## Running

You need to have Deno v1.28.0 or later [installed](https://docs.deno.com/runtime/manual/getting_started/installation) to run this repo.

Start a development server:

```
$ deno task dev
```

## Deploy

Build production assets:

```
$ deno task build
```

## Notes:

- dependencies need to be imported and referenced in `vite.config.mts`;
- import maps from `deno.json` seems to be ignored when using with Vite.
