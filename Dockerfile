FROM oven/bun

WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH



ARG VITE_API_HOST
ARG VITE_API_CACHE_TIME

ARG VITE_GA_ID

COPY . ./

RUN bun i --silent
RUN bun run build

# Serve command
CMD bunx serve -s build
