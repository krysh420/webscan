This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## IMPORTANT NOTE FROM MY SIDE (for whosoever will try to run this app)
1. Make sure to create a .env file. Inside it, store the connection string of your MongoDB (atlas/compass, whatever you wish to use) in this format:

MONGO_URL="connection string"

2. It is better to add name of a custom database with connection string, for this app, so that you can identify the DB easily and consider it whenever needed.

3. To add name of DB, just add "/" and then the name. eg (in my case): mongodb://localhost:27017/TodoNextApp.
'TodoNextApp' is the name of custom DB and remaining part (before it) is the connection string.

4. Make sure to run the command "npm install" or "npm i". It downloads all the required dependencies at once.





## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
