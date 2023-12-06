FROM oven/bun

WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH



ARG VITE_API_HOST
ARG VITE_API_CACHE_TIME

ARG VITE_GA_ID



COPY package.json bun.lockb ./
RUN bun i --silent
RUN bun run build -- -l silent
COPY . ./

# Serve command
CMD bunx serve -s build
