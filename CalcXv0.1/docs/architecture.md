# CalcX Architecture

## Current

```text
Professional GUI
  -> Existing browser calculation engines
  -> Structured result presentation
  -> Local history and export
```

The static frontend is the current application. Mathematical ownership remains in the existing expression, programmer, engineering, matrix, and statistics engines. `app.js` owns navigation and presentation.

## Future Cloud Boundary

```text
Web UI -> REST API -> FastAPI backend -> PostgreSQL
Calculator UI -> calculation engine -> structured result -> history service -> database
```

This boundary is documented only and is not deployed. No account or cloud capability is claimed until backend, database, migration, security, and integration tests exist.
# CalcX Architecture

## Current Application

```text
Professional GUI
  -> Existing browser calculation engines
  -> Structured result presentation
  -> Local browser history/export
```

The static frontend is the current production surface. Mathematical ownership remains in the existing expression, programmer, engineering, matrix, and statistics modules. `app.js` manages navigation and presentation; calculation modules do not depend on UI markup.

## Future Cloud Boundary

```text
Web UI -> REST API -> FastAPI backend -> PostgreSQL
Calculator UI -> calculation engine -> structured result -> history service -> database
```

This boundary is documented but not deployed. No account or cloud feature is claimed as implemented until a real backend, database, migrations, security tests, and browser integration are available.

## Security Principles

Future authentication must use HttpOnly secure cookies, server-side hashed sessions, Argon2id passwords, CSRF tokens, explicit CORS, resource ownership checks, rate limits, and environment-provided secrets. Tokens and passwords must never be stored in browser local storage or committed to Git.