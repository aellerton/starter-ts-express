# starter-ts-express

## TL;DR

    yarn install        # First time only
    yarn build --watch  # Builds dist dir and rebuilds on change
    yarn serve          # In another terminal, runs the server and reuns on change
    yarn test --watch   # Runs tests and reruns on change

## Basic instructions

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

## The '/' endpoint

The root endpoint returns a text message:

    $ curl http://localhost:8100/
    Hello world at Sun Apr 14 2019 10:37:28 GMT+0800

The name is an optional query parameter:

    $ curl http://localhost:8100/\?name=Bob
    Hello Bob at Sun Apr 14 2019 10:39:33 GMT+0800

The endpoint can return JSON by setting the `Accept` header:

    $ curl -H "Accept: application/json" http://localhost:8100/\?name=Alice
    {
      "name": "Alice",
      "timestamp": "2019-05-01T13:01:23.430Z",
      "message": "Hello Alice at Wed May 01 2019 13:01:23 GMT+0000"
    }

## The '/contact' endpoint

The "contact" endpoint sends and receives JSON:

    curl -H "Content-Type: application/json" http://localhost:8100/contact \
      -d '{"sender": "Alice", "subject": "hey", "message": "line one\nline two"}'

    {
      "error": [],
      "ok": true,
      "timestamp": "2019-05-03T10:48:29.400Z"
    }

Minimal validation on input data is applied, namely the sender and message body must be non-blank.

Bad input is handled one of two ways:

1. Either a 200 response is returned with "error" set to something, or
2. A 400 response is returned with "error" set as above.

Example:

    {
      "error": [
        {
          "field": "message",
          "error": "missing",
          "msg": "Please enter a value for \"message\" field"
        }
      ],
      "ok": false,
      "timestamp": "2019-05-03T10:48:01.780Z"
    }

The caller can choose the latter by setting "fail400" to any truthy value.

The case can be made for both being valid, as "successfully processed bad data" can be interpreted as a
"200" successful response. Reading MDN for 400, often considered the "bad data" response, suggests that sending
a 200 with an error message is more sensible:

> 400 Bad Request response status code indicates that the server cannot or will not process the request
> due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request
> message framing, or deceptive request routing).

## Logging

Minimal use of "Winston" logging is demonstrated.
