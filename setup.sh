#!/bin/bash
echo "Initiating Setup";
touch .env
cat .env.example >> .env
echo "About to install dependencies";
yarn install
echo "Please get values for all the environment variables from the maintainer"
