#!/bin/bash

echo -e "-----------------\nACGAM BUILD SCRIPT\n-----------------\n\ninitiating build process..."
yarn run build
echo -e "\n\nBuild Complete."
echo -e "Moving to build directory to server"
mv -v ./build ../acgam-express
echo -e "Process complete."
