FROM intdocker.OfficeSmart.com/os/node:8.3.0

WORKDIR /cs_dashboard
COPY . /cs_dashboard/

RUN npm install && npm run build
EXPOSE 8080

CMD ["npm","run","start:int"]