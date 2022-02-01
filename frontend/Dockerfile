FROM node:16

WORKDIR /srv/frontend

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN yarn

ENTRYPOINT ["/entrypoint.sh"]

CMD ["yarn", "dev", "--host"]