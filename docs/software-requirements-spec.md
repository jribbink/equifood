# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Schedule](#schedule)
- [Software Description](#software-description)
- [Frameworks, libraries, and database ("Tech Stack")](#frameworks-libraries-and-database-tech-stack)
  - [Client App](#client-app)
  - [Backend](#backend)
  - [Database](#database)
- [User Groups](#user-groups)
- [Non-Functional requirements and environmental constraints](#non-functional-requirements-and-environmental-constraints)

# Introduction

<< Insert Introduction here>>

# Schedule

    Term 1

        Week 7: Requirements report + project requirement presentation
        Week 8: Decide which software we are using for the app.
        Week 9: Finish paper prototype and start on the app.
        Week 10: Get the base code working to have phone compatible AR size to show.
        Week 11: Position buttons and categories and make sure the buttons work.
        Week 12: Finish up little touches building home screen.
        Week 13: Peer testing report I + video demo (Bug Testing)

        This is the bare minimum requirement. homescreen working at the minimum.

    Term 2
        Week 1: Make a template page for restaurant description / option
        Week 2: Start on Google Maps API to link with restaurants.
        Week 3: Make a map tab in the app and make Google map show.
        Week 4: Link the description page with google maps.
        Week 5: Make the restaurants list in proximity order.
        Week 6: Make order confirmation page
        Week 7: Remove listing upon order confirmation
        Week 8: Bug testing / Finishing up touches for peer testing
        Week 9: Peer testing report II + video demo II (Bug Testing)
        Week 10: Create settings page
        Week 11: Create account page, get dummy account working.
        Week 12: Bug testing / Extra features
        Week 13: Bug testing / Extra features
        Week 14: Final Report + Final Presentation

# Software Description

The EquiFood software is meant as a way to connect consumers with food distribution businesses to reduce food waste by selling food at a discounted price that would otherwise go to waste. It's not designed to sell the products on its own, but only to allow this connection. The app functions by allowing businesses to post listings of food that they want to sell at a discounted price, which should have a list of tags that can be added to allow for easy searching later. These listings should have a geolocation attached; each restaurant would have a default geolocation, but it should be editable if necessary. The consumers are then able to log into the app and search for food they're interested in -- either by browsing food that is nearest to them, or by searching for food by name or by tag.

A potential option is for the customers to "reserve" the food, and have it removed from the listing so that they can be sure to pick it up. If this direction is taken, the app would notify the restaurant about the reservation, and require a specific timeline from the customer for when they will be able to pick the food up. If the customer does not follow through in that time, the reservation should be removed.

# Frameworks, libraries, and database ("Tech Stack")

The EquiFood software necessitates both a frontend, client-facing interface (in the form of a mobile app) and a backend API responsible for software business logic. Additionally, this backend API must be paired with some form of relational database.

## Client App

|                       | Pros                                                                                                                                                                                                                                                                                                                          | Cons                                                                                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React Native**      | - Very familiar language (JavaScript), very mature language<br />- Up to 70% of code can be shared across platforms<br />- Can share typings with a Node.js/JS backend<br />- Business logic can be shared with JS backend<br />- Widespread adoption (~15% of top 500 US apps use RN & used by Instagram, Facebook, Walmart) | - Larger bundle size<br />- Slightly lower performance than the latter two options<br />- Bottlenecked performance between worker and UI thread           |
| Native (Swift/Kotlin) | - Superior performance<br />- Smaller bundle size                                                                                                                                                                                                                                                                             | - Not cross platform<br />- Requires knowledge of multiple less-familiar programming languages<br />- Greater learning curve than JavaScript/React Native |
| Flutter               | - Cross-platform<br />- SDK with prebuilt widgets and components<br />- Robust community support                                                                                                                                                                                                                              | - Large bundle size<br />- Uses unfamiliar and immature programming language (Dart)<br />- Limited ecosystem compared to JavaScript                       |

For the reasons listed above, it seems clear that React Native is the superior option. Development times will be markedly faster than those of a native solution (Swift/Kotlin) and the learning curve will be far easier than that of Flutter/Dart. JavaScript is a very familiar language with a history of several decades and React.js is extremely familiar to any frontend developer.

Additionally, the pairing of JavaScript/TypeScript on both the frontend and backend systems will allow sharing of business logic/types as well as liberate the developers of learning multiple esoteric programming languages.

**React Native** is the clear winner.

## Backend

|            | Pros                                                                                                                                                                                                                                                                                                                                                         | Cons                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NestJS** | - Very opinionated (clear design patterns, structure)<br />- Uses MVC architecture<br />- Built-in features (users, auth, more)<br />- Single language for frontend/backend (JS)<br />- Seamless database integration<br />- Angular-like dependency injection<br />- High performance<br />- Medium learning curve<br />- TypeScript<br />- Highly scalable | - Can potentially be too opinionated<br />- Relatively new/not very mature<br />- Lots of obfuscation (not obvious what certain decorators do)                                              |
| EspressJS  | - Easy learning curve<br />- High performance<br />- Single language for frontend/backend (JS)                                                                                                                                                                                                                                                               | - Not suitable for large projects<br />- Poor out-of-box security<br />- Limited out-of-box features<br />- No clear design patterns/too open ended and difficult to structure project well |
| Django     | - Uses MVC architecture<br />- Many built-in features (users, auth, etc.)<br />- Built-in security features (i.e. XSS)<br />- Highly scalable                                                                                                                                                                                                                | - Not suitable for small projects<br />- Monolithic framework<br />- No conventions<br />- Steep learning curve<br />- Different language than frontend                                     |

From the options listed Django and NestJS are likely the strongest contenders. A fully-fledged framework with built in autherntication and REST API support is required for this project. EspressJS would be far to flexibile for a project such as this and would likely lead to a bloated and hard-to-follow project strucure (meaning that if NodeJS was the desired platform, NestJS would be superior).

However, **NestJS** is chosen due to its better support for small to mid sized projects as well as lower level of granulaity. This is ideal for the timeframe presented as minimizing development times is of high priority. Furthermore, while Python is very familiar, using TypeScript for both the frontend and backend is ideal and will further work to reduce development times as well as allow all developers to easily work full-stack.

## Database

A relational database is required for this project. Becasue the data is very structured (users, orders, businesses, etc.) and requires many relationships (traditional CRUD, essentially), a relational database is the superior option.

For the scope of this project, there is a general indifference regarding which relational database we choose to use (dataset and number of concurrent queries will be very small).

Due to this reason, the **MariaDB** will be the database of choice. It is very easy to configure and couples well with NestJS/TypeORM.

# User Groups

There are three main user groups that can be identified. One is the "admin" class of users; the programmers, administration and similar users working on the app itself, who should have global access to the app and all the functions therein. Another is the restaurants and other businesses, who should be able to log into the app through the business view to add, edit and remove the products they have available. The third group is the public; these users can open the app through the user view, and search for specific products or browse the products available near them.

# Non-Functional requirements and environmental constraints

    - Links to Google Maps API
    - Javascript is the main language
    - React Native for app making
    - The server is run locally on the machine for the project.
