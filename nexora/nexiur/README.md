# Reksona Platform

## Stack
- Frontend: HTML/CSS/Vanilla JS (Arabic RTL)
- Backend: Node.js + Express
- Business storage: SQLite (`node:sqlite`)
- Authentication storage: PostgreSQL
- Auth: JWT access token + refresh token (HttpOnly cookie) + RBAC

## Auth Module (New)
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Logout: `POST /api/auth/logout`
- Refresh token: `POST /api/auth/refresh`
- Forgot password: `POST /api/auth/forgot-password`
- Reset password: `POST /api/auth/reset-password`
- Verify email: `POST /api/auth/verify-email`
- Current user: `GET /api/auth/me`
- Admin user management:
  - `GET /api/auth/admin/users`
  - `POST /api/auth/admin/users`
  - `PATCH /api/auth/admin/users/:id/role`
  - `PATCH /api/auth/admin/users/:id/active`

## Frontend Auth Pages
- `login.html`
- `register.html`
- `forgot-password.html`
- `reset-password.html`
- `verify-email.html`
- Admin login: `admin-login.html`

## Run
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env`
4. Configure `DATABASE_URL` (PostgreSQL required for auth)
5. `npm run start`
6. Open `http://localhost:8080/admin-login.html`

## Default Admin (Seeded in PostgreSQL)
- Email: `admin@reksona.local`
- Password: `ChangeMe123!`

## Notes
- If PostgreSQL is not running, auth routes return `503` with `AUTH_DB_UNAVAILABLE`.
- Vodafone checkout and existing business modules keep working on SQLite.
