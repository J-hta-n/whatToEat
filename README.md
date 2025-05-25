## Intro

WhatToEat is a web app which allows users to organise their favourite food places by various useful categories, so that in future, they can filter these places more efficiently based on those categories to aid in deciding where and what to eat.

This project uses [Next.js](https://nextjs.org/) with Radix UI on the frontend, as well as for the backend APIs, together with Prisma ORM, Zod Data Validation, and PostgreSQL database (hosted on AWS RDS).

## NextJS App Routing

- This project uses NextJS App Routing, meaning the actual routing follows the folder hierarchy, so no need for an app-level `views` folder
- For clearer distinction between route and non-route folders, prefix all non-route folders with `_`, eg `_components`, `_services`, `_utils`, `_lib` etc
  <route_name, eg explore>/
  ├── \_components/ # UI stuff
  ├── \_utils/ # Generic helpers
  ├── \_services/ # Domain-specific business logic / API calls
  ├── \_lib/ # Infra, low-level app logic
  │ ├── prisma.ts
  │ ├── auth.ts
  │ ├── redis.ts

## Getting Started

- Supply `DATABASE_URL` in .env using any empty postgres db (eg locally), then seed some dummy data with

```bash
npx prisma migrate reset
npx prisma db seed
```

- Run dev server with `npm run dev`
- To simulate prod behaviour run `npm run build` then `npm start`
