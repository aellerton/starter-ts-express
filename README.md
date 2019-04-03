# starter-ts-express

Simple typescript express server that rebuilds and restarts on changes

Once only setup:

    yarn install

Optionally:

    npm install -g node-dev

In one terminal, run webpack. Use "--watch" to re-run on changes:

    yarn build --watch

In another terminal, run the server with automatic restarts when `dist` content changes:

    node-dev --no-notify ./dist/server.js

Try invoking the API at http://localhost:8100/

An easy way to test if it's working is to edit `src/app.ts`, e.g. a small change to the
output returned by the API call. Save the change, wait a second and then reload the URL
above, and it should "just work".

