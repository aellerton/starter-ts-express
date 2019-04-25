# starter-ts-express

## TL;DR

    yarn install        # First time only
    yarn build --watch  # Builds dist dir and rebuilds on change
    yarn serve          # In another terminal, runs the server and reuns on change
    yarn test --watch   # Runs tests and reruns on change

## Details

Simple typescript express server that rebuilds and restarts on changes

First time setup:

    yarn install

Automatic restart-on-change functionality is achieved by running two separate processes at once:

1. In one terminal, run webpack with "--watch" to build, then rebuild on changes:

        yarn build --watch

2. In another terminal, use `node-dev` to run the server then restart when `dist` content changes
   (which it will do when the `yarn build --watch` process rebuilds):

        yarn serve

   That just runs this:

        node-dev --no-notify ./dist/server.js

Try invoking the API to see if it works:

    $ curl http://localhost:8100/
    Hello world at Sun Apr 14 2019 10:37:28 GMT+0800

Try making a trivial change to `src/app.ts` and see that all you need to do is save the file
and the tools rebuild and restart the server. For example:

    $ git diff src/app.ts
    diff --git a/src/app.ts b/src/app.ts
    ...
      app.get('/', (req, res) => {
    -   res.send(`Hello world at ${new Date()}`)
    +   res.send(`Hi world at ${new Date()}`)
      })

The new change should be visible immediately:

    $ curl http://localhost:8100/
    Hi world at Sun Apr 14 2019 10:38:26 GMT+0800

Run tests and exit with:

    yarn test

Run tests and rerun when files change with:

    yarn test --watch

or, identically:

    yarn test:watch
