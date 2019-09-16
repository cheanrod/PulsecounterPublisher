# PulsecounterPublisher

MQTT publisher for [stall.biz Pulsecounter](https://www.stall.biz/project/wiffi-count-2fach-zaehler-fuer-strom-gas-wasser-und-solar).

Sample docker-compose-yml file:

```yml
version: '3.7'

services:

  pulsecounter:
    image: cheanrod/pulsecounter-publisher
    restart: always
    ports:
      - "8181:8181"
    environment:
      - "MQTT_SERVER=mqtt-broker.net:1883"
      - "STATE_TOPIC=pulsecounter/state"
      - "TELE_TOPIC=pulsecounter/tele"
      - "PORT=8181"
```

_PORT_ is the port the PulsecounterPublisher listens on for connections from Pulsecounter.
