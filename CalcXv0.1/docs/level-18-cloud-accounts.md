# Level 18 - Cloud and Accounts

## Status

Blocked and not released. The repository currently has no backend, API, database, or account implementation. The environment does not provide a usable Python runtime, PostgreSQL service, Docker, or existing server boundary, so registration, login, secure sessions, cloud history, saved formulas, and synchronized preferences were not falsely implemented.

## Required Prerequisites

Implementing this milestone requires a verified Python 3 environment, FastAPI/Uvicorn, SQLAlchemy 2.x, Alembic, an Argon2id package, PostgreSQL, and a reproducible local deployment strategy. These must be installed from official/project-supported sources and tested before the v0.18 release.

## Intended Security Design

The future implementation should use Argon2id password hashes, server-side sessions with hashed identifiers, HttpOnly/Secure/SameSite cookies, CSRF tokens, explicit credentialed CORS, rate limits, resource ownership checks, and environment-provided secrets. Passwords, hashes, tokens, and secrets must never enter browser storage or Git.
# Level 18 - Cloud and Accounts

## Status

Not implemented. Repository inspection found no Python runtime, FastAPI application, PostgreSQL service, Docker installation, API layer, or account model. No fake authentication or cloud synchronization was added.

## Intended Boundary

The future backend should expose `/auth`, `/history`, `/formulas`, and `/preferences` REST endpoints using server-side sessions, Argon2id password hashing, CSRF protection, explicit credentialed CORS, ownership checks, SQLAlchemy models, Alembic migrations, and PostgreSQL.

The checked-in `.env.example` documents the required configuration names without containing credentials. Actual dependency installation and implementation must happen in an environment with the required runtimes and services available.