# starter-ts-express

Simple typescript express server that rebuilds and restarts on changes

First time setup:

    yarn install

Automatic restart-on-change functionality is achieved by running two separate processes at once:

1. In one terminal, run webpack with "--watch" to build, then rebuild on changes:

        yarn build --watch

2. In another terminal, use `node-dev` to run the server then restart when `dist` content changes
   (which it will do when the `yarn build --watch` process rebuilds):

        node-dev --no-notify ./dist/server.js

Then invoke the API at http://localhost:8100/

An easy way to test if it's working is to edit `src/app.ts`, e.g. a small change to the
output returned by the API call. Save the change, wait a second and then reload the URL
above, and it should "just work".

Note: you'll need `node-dev` installed for this to work. One way is to install globally, like this:

    npm install -g node-dev

but it's possible (probable?) that installing `node-dev` in this tree only is all that's necessary.
