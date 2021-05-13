#!/bin/bash

echo -e "-----------------\nACGAM BUILD SCRIPT\n-----------------\n\ninitiating build process..."
yarn run build;
echo -e "\n\nBuild Complete.";
echo -e "Moving to build directory to server";
BUILD_DIR_PATH="../acgam-express/build";
if [ -d "$BUILD_DIR_PATH" ]; then rm -Rf $BUILD_DIR_PATH; fi
mv -v ./build ../acgam-express
echo -e "Process complete."
