FROM node:16-alpine As development

WORKDIR /usr/src/app

# FIRST CREATE DIRECTORIES
RUN mkdir -p packages/libs
RUN mkdir -p packages/backend

# GET INSTANCE FROM DEVELOPMENT
FROM development As build

# MOVE ROOT PACKAGE JSON
COPY --chown=node:node package*.json ./ 

# MOVE LIB PACKAGE JSON
COPY --chown=node:node ./packages/libs/package.json packages/libs/
# MOVE LIB SOURCE
COPY --chown=node:node ./packages/libs packages/libs/

# MOVE packages/backend PACKAGE JSON
COPY --chown=node:node ./packages/backend/package.json packages/backend/
# MOVE packages/backend
COPY --chown=node:node ./packages/backend packages/backend/

RUN npm i
RUN npm run build -w ./packages/libs
RUN npm run build -w ./packages/backend

CMD [ "node", "packages/backend/dist/main.js" ]
