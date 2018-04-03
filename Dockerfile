FROM node:8

MAINTAINER Pat Nolan <pat@deltareadytechnology.com.au>

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PORT 3000
ENV TINI_VERSION v0.16.1

RUN apt-get update

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# Handling Kernel Signals
# Add Tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /sbin/tini

WORKDIR /home/node/app

COPY ./www .

RUN chmod +x /sbin/tini \
    && chown -R node:node /home/node

USER node

RUN npm i -g http-server

# EXPOSE won't be observed in a Heroku Deployment scenario. The $PORT env variable must be supplied instead
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--" ]

# Using shell form of CMD to allow port to be read by the shell
CMD /home/node/.npm-global/bin/http-server -p $PORT -c0
