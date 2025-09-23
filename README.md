## Intro

WhatToEat is a web app which allows users to organise their favourite food places by various useful categories, so that in future, they can filter these places more efficiently based on those categories to aid in deciding where and what to eat.

This fullstack project uses [Next.js](https://nextjs.org/) with Radix UI, Prisma ORM, Zod, and PostgreSQL database.

## Project structure

```
src/
├── app/
│   └── api/
│       └── <apiResource>
│           └── <get/post/patch/delete>.ts      # API controllers
│           └── post.schema.ts                  # Schema for create / update
│           └── route.ts                        # Import controllers here
│   └── <viewRoute>
│       └── _components      # Subcomponents specific to this view
│       └── loading.tsx
│       └── page.tsx
├── components/              # Reusable global UI components
├── lib/
│   ├── auth            # NextAuth config
│   ├── middlewares
│   ├── prisma
│   └── utils           # Reusable global utils
```

## Getting Started

- Supply `DATABASE_URL` in .env using any empty postgres db (eg locally), then seed some dummy data with

```bash
npx prisma migrate reset
npx prisma db seed
```

- Run locally with `npm run dev`, or `npm run build` then `npm start`
