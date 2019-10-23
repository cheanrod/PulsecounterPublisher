# PulsecounterPublisher

![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/cheanrod/PulsecounterPublisher?include_prereleases)
![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/cheanrod/pulsecounter-publisher)
![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/cheanrod/pulsecounter-publisher)
![GitHub](https://img.shields.io/github/license/cheanrod/PulsecounterPublisher)

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
