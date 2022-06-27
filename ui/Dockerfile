# Stage 1
FROM node as build-stage
WORKDIR /ui
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
EXPOSE $REACT_DOCKER_PORT
CMD ["npm", "start"]