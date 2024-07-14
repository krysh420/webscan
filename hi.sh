#!/bin/bash
docker build --tag 'test' .
sleep 2
docker run --name "nikto" test
docker start nikto
docker attach nikto
