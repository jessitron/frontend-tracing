# Play with tracing in the browser

## do stuff

`cp .env.example .env`

then put your API key in .env

`docker compose up`

Then to test it:

`curl -iv -H "Content-Type: application/json" http://localhost:4318/v1/traces -d @small_data.json`

(thanks lightstep for that documentation)

To test it again, open small_data.json and change the trace ID.


