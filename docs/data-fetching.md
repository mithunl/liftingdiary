# Data Fetching

## Server Components Only

**All data fetching must be done exclusively via React Server Components.**

- Do NOT fetch data in Client Components (`"use client"`)
- Do NOT fetch data in Route Handlers (`app/api/`)
- Do NOT use `useEffect` + `fetch`, SWR, React Query, or any client-side fetching pattern
- Do NOT fetch data directly inside page or layout files — delegate to helper functions (see below)

If a component needs data, it must be a Server Component. If interactivity is required, split the component: fetch data in a Server Component parent and pass it down as props to a Client Component child.

## Data Helper Functions

All database queries must live in helper functions under the `/data` directory (e.g. `src/data/workouts.ts`).

Rules for `/data` helpers:

- **Always use Drizzle ORM** — do NOT write raw SQL strings under any circumstances
- Each helper function is responsible for one well-scoped query or mutation
- Helpers are plain async functions (not route handlers, not API endpoints)
- They are imported directly into Server Components and called at render time

Example structure:

```
src/
  data/
    workouts.ts     # getWorkoutsForDate(), createWorkout(), etc.
    exercises.ts    # getExercises(), etc.
```

## Data Ownership & Authorization

**A logged-in user must only ever be able to access their own data.**

This is a hard security requirement. Every helper function that reads or writes data must:

1. Accept the authenticated user's ID as a parameter (obtained from the session in the calling Server Component)
2. Scope every query with a `where` clause that filters by that user ID
3. Never expose a query that returns data across multiple users

Example:

```ts
// src/data/workouts.ts
import { db } from "@/lib/db";
import { workouts } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function getWorkoutsForDate(userId: string, date: Date) {
  return db
    .select()
    .from(workouts)
    .where(and(eq(workouts.userId, userId), eq(workouts.date, date)));
}
```

The user ID must **never** come from client-supplied input (e.g. query params, request body). It must always be sourced from the server-side session.
