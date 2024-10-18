@echo off

rem Create main directory
mkdir pokeapi-integration

rem Change to the main directory
cd pokeapi-integration

rem Create root files
type nul > index.html
type nul > search.html
type nul > details.html
type nul > types.html
type nul > README.md

rem Create subdirectories and files
mkdir css
type nul > css\styles.css

mkdir js
type nul > js\search.js
type nul > js\details.js
type nul > js\types.js

mkdir img

mkdir assets
mkdir assets\bootstrap

echo Directory structure created successfully!
