# Play with tracing in the browser

## do stuff

### run the collector

`cp .env.example .env`

then put your API key in .env

`docker compose up`

Then to test it:

`curl -iv -H "Content-Type: application/json" http://localhost:4318/v1/traces -d @small_data.json`

(thanks lightstep for that documentation)

To test it again, open small_data.json and change the trace ID.

### serve the app

`npm install`

`npm run build`

Parcel serves it, and gives you a URL.
You should see a page with a button.

Push the button to get to a different page. The time that page takes to load is measured in a trace.
It gives you a link to that trace, except in my team, so if you want that link to work, change "team" and "dataset" in page2.js
