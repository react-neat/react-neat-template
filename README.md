# Vite React Template

- Storybook
- Jest
- Vite
- Bun
- React
- TypeScript
- SCSS

## Getting Started

First, install the dependencies:

```bash
bun i
npm i
```

Then, run the development server:

```bash
bun run dev
npm run dev
```

Open [http://localhost:5173](http://localhost:3000) with your browser to see the result.

### `react-router` and `pages` directory

This project use `react-router-dom` and `generoute` to generate routes looking at `pages` directory just like in Nextjs.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

## Learn More



## Deploy

First, you need to build the app
```bash
npm run build
bun run build
```

Then you need to setup the deploy service that you're going to use and update the build github workflow to use your service.
