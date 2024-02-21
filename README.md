# Vite + Deno + React + TypeScript

Project boilerplate was created by running:
```bash
deno run --allow-env --allow-read --allow-write npm:create-vite-extra

```

and chose "Vite + React" and then "TypeScript + SWC" from the prompts offered.

NOTE: please, [see SWC issues](https://github.com/swc-project/swc/issues/7435), as it's still considered to be a bit experimental transpiler.

Deno just happens to be the JavaScript runtime of choice of the author right now, mostly for it's robust support of TypeScript that comes out of the box, and for native support for [fetch](https://docs.deno.com/runtime/tutorials/fetch_data).

## What it consists of

* state management - [zustand](https://github.com/pmndrs/zustand)


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

## Notes

- You need to use `.mjs` or `.mts` extension for the `vite.config.[ext]` file.

## Papercuts

Currently there's a "papercut" for Deno users:

- peer dependencies need to be referenced in `vite.config.[ext]` - in this example
  it is `react` and `react-dom` packages that need to be referenced

## Notes:

Online API documentation might benefit from describing "https://uptime.com/api/v1/auth/login/" endpoint both better and at all.

https://uptime.com/api/v1/auth/login/?format=api

(Is it an endpoint, added and handled by Django module?)

By reverse-engineering a bit, it looks like Django Token auth is used)
Authorization: token xxxx

(?) Is it possible to invalidate auth token upon logout?
