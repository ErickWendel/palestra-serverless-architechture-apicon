#!/usr/bin/env bash
cd src/functions

for D in `ls | grep -v '^_environment'`
do 
  cd $D
  echo 'installing packages to' $D
  npm i --silent
  cd ..
done
