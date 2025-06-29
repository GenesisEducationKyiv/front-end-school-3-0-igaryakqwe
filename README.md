# Music Platform

Music Platform is a modern web application for managing and listening to music tracks. It allows users to create, edit, delete, and organize tracks with features such as filtering, sorting, searching, and pagination. The platform includes an audio player with advanced controls, audiowave visualization, and supports both dark and light modes. Designed for a smooth user experience, it also offers bulk actions, optimistic UI updates, and robust error handling.

## Setup

1. Install dependencies

```bash
pnpm install
```

2. Add environment variables

```bash
cp .env.example .env
```

3. Run the app

- in development mode

```bash
pnpm run dev
```

- in production mode

```bash
  pnpm build
  pnpm preview
```

## Bundle analyzing

## Tech stack

### General

- Turborepo
- Typescript
- ESlint

### Front-end

- Vite
- TanStack Query
- shadcn
- zustand
- Vitest
- Playwright
- SocketIO

### Back-end

- Fastify
- ConnectRPC
- Vitest
- SocketIO

## Infrastructure

- Monorepo managed with Turborepo, containing both frontend and backend apps.

- Frontend is a Vite-based React app, using TanStack Query for data fetching, Zustand for state management, and shadcn/ui for UI components.

- Backend is a Fastify server, exposing APIs via ConnectRPC (gRPC-web), serving static files, and handling real-time features with Socket.IO.

- Data Storage is file-based (JSON and uploads) within the repo, with directories for tracks, genres, and uploaded audio.

- Environment configuration is managed via .env files, loaded and validated at runtime.

- Development uses pnpm for package management, with scripts for dev, build, lint, and test.

- Testing is set up for both frontend (Playwright, Vitest) and backend (Vitest).
