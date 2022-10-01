# Equifood

This is a capstone (COSC 499) project for the Equifood App.

## Overview

### Context

Project Equifood tries to reduce food wastage and promotes sustainable food systems in Kelowna. The designed app will help to reduce food wastage by donating leftovers from restaurants.

### Description

A mobile app that would connect restaurants with individuals in order to allow the individuals to obtain the restaurants' food leftovers for free or at a significantly reduced price.

The app will also streamline EquiFood's current donations tracking process, as it will automatically keep track of the money amount worth of food that EquiFood has contributed to donating via its restaurant partners, which is currently done manually.

The system will involve three types of users:

- **Individuals**: anyone who signs up on the app to be connected to restaurants and obtain food donations.
- **Restaurant representatives**: restaurant managers or their delegate who are able to post donations onto the system and manage their restaurant’s information in the EquiFood app. These users must be vetted by the administrators.
- **Administrators**: members of the EquiFood team who can approve restaurant managers and view the donation amounts.

### Group Members

- Joonsik Kim - QA
- Jordan College - Client Liason
- Jordan Ribbink - Tech Lead
- Riley Comer - Scrum Master

### Project Structure

This project is written exclusively in TypeScript to emphasize code reuse (in both the form of types and some business logic). React Native is the choice of frontend due to its easy cross-platform native-link support, superior performance, flexibility, and community support.

Additionally, it provides a familiar interface for frontend developers familiar with the vanilla React library.

#### Documention

Relevant documentation for this project exists in the `documentation` folder

Within this folder all technical specifications for the software, IP agreements, configuration instructions, and any other pertinent information can be found.

These are mostly written in markdown, however some exists in the form of PDF files.

#### Frontend

There are two frontend apps for this project.

1. The customer facing app
2. The merchant/restaurant facing app

##### Customer App

The client-facing frontend for the project (React Native) can be found in the `customer_app` directory.

The app is supported as an IOS/Android application.

##### Restaurant App

The restaurant-facing frontend for the project (React Native) can be found in the `restaurant_app` directory.

The app is supported as an IOS/Android application.

#### Backend

The backend for the project (NestJS) can be found in the `backend` directory.

#### Shared

Shared types for the frontend and backend can be found in the `shared` directory.

These types are shared between all of the TypeScript apps within this project for easy code reuse,

## License

Copyright © 2022 Equifood.

Unauthorized copying or distribution of this software is prohibited without the expressed permission of Equifood.
