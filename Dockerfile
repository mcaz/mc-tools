FROM node:13.7-alpine
WORKDIR /workdir
RUN yarn global add @google/clasp
COPY package.json yarn.lock /workdir/
RUN yarn install