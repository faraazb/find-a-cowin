[![Find-a-COWIN: Find a vaccination slot and get vaccinated][banner]](https://faraazb.github.io/find-a-cowin/)

# Find-a-CoWIN
![build-and-deploy workflow](https://github.com/faraazb/find-a-cowin/actions/workflows/main.yml/badge.svg)

This repository contains the source code for the Find-a-CoWIN website.

## What is it?
Find-a-CoWIN is  a slot **finder/checker** for MoHFW's (India) CoWIN vaccination platform.

It uses the CoWIN Public API to get the vaccination slots data for any district in any state across India.

## How to use it?
Visit https://faraazb.github.io/find-a-cowin/ and select your state and district to get started.

## Features
* Multiple keyword search

  ![keyword search]
* Starred centers
* Table and Tags view for Sessions of each center
* Extensive filtering: Fee (Free/Paid), Age category, Vaccine (Covaxin, Covishield, Sputnik V)
* Automatic data refresh at selected interval

## Development
1. Run `yarn install` in the project directory to install all dependencies.
2. Run `yarn start` to run the project on a development server.


<!-- Links -->
[banner]: https://raw.githubusercontent.com/faraazb/find-a-cowin/main/src/images/banner.svg
[keyword search]: https://raw.githubusercontent.com/faraazb/find-a-cowin/main/src/images/screenshot1.jpg
