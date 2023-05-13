## Setup the project

1. Create `.env` file  (copy `.env.example`)
2. Create postgres database (e.g. via https://www.elephantsql.com/)
3. Sign up to https://clerk.com/ and add your api keys to env file
4. Run `npm i`
5. Run `npm prisma db push`
6. Run `npm run dev`


## Useful resources

This project uses the t3stack. You can read the documentation here https://create.t3.gg/en/introduction

We also recommend to learn about trpc (https://trpc.io/docs/) and tansack query (used by trpc under the hood) (https://tanstack.com/query/latest/docs/react/overview)

## Useful commands

npx prisma studio (starts the data browser) https://www.prisma.io/docs/concepts/components/prisma-studio

Sometimes the linter breaks and you get errors that shouldn't be there. When experiencing this you need to restart the `es-lint server` or `typescript server` in VS code:

`CMD` + `p`, then enter `> restart`

<img width="631" alt="image" src="https://github.com/simbacity/boilerplate/assets/98182227/2aedb802-29a2-4702-b634-312e366f5ec8">
