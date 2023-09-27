This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:0000](http://localhost:0000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## For Mobile Debugging

Use mkcert to create a local CA and cert files

```
brew install mkcert
brew install nss # if you use Firefox
```

Create your certificate authority

```
mkcert -install
```

Create your cert and key files for localhost

```
mkcert localhost
```

Run a local proxy server to direct https traffic to your nextJS server

```
npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000
```

[Follow these instructions](https://dev.to/paytoncodes/how-to-view-localhost-on-your-phone-13ij#step-two-get-your-local-ip-address) to get your local IP address.

Visit the appropriate address in your phone's browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
