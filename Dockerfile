###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install
COPY --chown=node:node . .
USER node


###################
# BUILD FOR PRODUCTION  
###################

FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package.json yarn.lock prisma ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules  
COPY --chown=node:node . .
# RUN npx prisma migrate dev
# RUN npx prisma migrate deploy
# Run the build command which creates the production bundle
RUN yarn run build
# Set NODE_ENV environment variable
ENV NODE_ENV production 
RUN yarn install --production --frozen-lockfile
USER node

###################
# PRODUCTION
###################

FROM node:20-alpine AS production
WORKDIR /usr/src/app
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# CMD [ "npx prisma migrate deploy " ]

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
