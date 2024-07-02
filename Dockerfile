FROM node:20-alpine AS development
RUN apk add --no-cache \
  bash \
  jq \
  git \
  g++ \
  make \
  openssh-client \
  ;

RUN corepack enable

ARG workdir
WORKDIR ${workdir}
COPY .setup/ /root/
COPY package.json yarn.lock .yarnrc.yml ${workdir}/
RUN yarn install
RUN ["/bin/bash", "-c", "source ~/.bashrc"]
# CMD ["yarn", "dev"]