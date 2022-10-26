---
title: Software Requirements Specification
subtitle: Equifod Group C
author:
  - Riley Comer
  - Jordan Colledge
  - Joonsik Kim
  - Jordan Ribbink
output: pdf_document
header-includes: |
  \usepackage{fancyhdr}
  \pagestyle{fancy}
  \fancyhead[R]{Equifood Group C}
  \fancyhead[L]{\leftmark}
---

<!--

This markdown document is designed for rendering via pandoc script provided (render-srs.sh)

It is NOT compatible with Github-flavoured markdown.

-->

\newpage

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Software Description](#software-description)
- [User Groups](#user-groups)
- [Data Flow Diagrams](#data-flow-diagrams)
  - [Legend](#legend)
  - [DFD Level 0](#dfd-level-0)
  - [DFD Level 1](#dfd-level-1)
- [Schedule](#schedule)
- [Functional requirements](#functional-requirements)
- [Non-Functional requirements and environmental constraints](#non-functional-requirements-and-environmental-constraints)
- [Frameworks, libraries, and database ("Tech Stack")](#frameworks-libraries-and-database-tech-stack)
  - [Frontend App](#frontend-app)
  - [Backend](#backend)
  - [Database](#database)
- [Testing plan](#testing-plan)
  - [Static analysis](#static-analysis)
  - [Regression Testing](#regression-testing)
  - [Unit testing](#unit-testing)
  - [End-to-end testing](#end-to-end-testing)
- [Questions & Answers](#questions--answers)

\newpage

# Software Description

The EquiFood software is meant as a way to connect consumers with food distribution businesses to reduce food waste by selling food at a discounted price that would otherwise go to waste. It's not designed to sell the products on its own, but only to allow this connection. The app functions by allowing businesses to post listings of food that they want to sell at a discounted price, which should have a list of tags that can be added to allow for easy searching later. These listings should have a geolocation attached; each restaurant would have a default geolocation, but it should be editable if necessary. The consumers are then able to log into the app and search for food they're interested in -- either by browsing food that is nearest to them, or by searching for food by name or by tag.

A potential option is for the customers to "reserve" the food, and have it removed from the listing so that they can be sure to pick it up. If this direction is taken, the app would notify the restaurant about the reservation, and require a specific timeline from the customer for when they will be able to pick the food up. If the customer does not follow through in that time, the reservation should be removed.

\newpage

# User Groups

There are three main user groups that can be identified:

1. **Administrators**

   Programmers, administration and similar users who need global access to the app and all functions therein.

2. **Businesses**

   Restaurants and other food distribution businesses. This includes groups such as grocery stores, and notably, university food businesses, who may want a centralized way of advertising themselves to students and distributing food that would otherwise go to waste. In short, they should be able to log into the app through the business view to add, edit and remove the products they have available.

3. **The public**

   Low-income families, university students, and anyone else who is looking to help reduce food waste or find savings on food. They should be able to open the app through the user view, and search for specific products or browse the products available near them, so that they can place a reservation on the product.

\newpage

# Data Flow Diagrams

Below are the level 0 and level 1 Data Flow Diagrams for this project. The color of each arrows, proccess, and database depends on the type of information it is dealing with. For example any process that involves the daily report is in pink.

## Legend

- Items \textbf{\textcolor{green}{(green)}}\newline
- Pickup orders \textbf{\textcolor{yellow}{(yellow)}}\newline
- Customer accounts \textbf{\textcolor{blue}{(blue)}}\newline
- Restaurant accounts and applications \textbf{\textcolor{red}{(red)}}\newline
- Daily/weekly reports \textbf{\textcolor{violet}{(violet)}}\newline

## DFD Level 0

![DFD Level 0](./DFDs/Equifoods_DFD_0.png)

\newpage

## DFD Level 1

![DFD Level 1](./DFDs/Equifoods_DFD_1.png)

\newpage

# Schedule

**Term 1**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 7: Requirements report + project requirement presentation\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 8: Create settings page\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 9: Create account/admin page, get dummy account working.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 10: Create customer account database and functions.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 11: Create restaurant merchant account database and functions.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 12: Finish up little touches building home screen.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 13: Peer testing report I + video demo (Bug Testing)\newline

This is the bare minimum requirement; homescreen must be working at the minimum.\newline

**Term 2**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 1: Implement Add / Remove items database.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 2: implement Item history and Item inventory.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 3: Start on Google Maps API to link with restaurants.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 4: Link the description page with google maps.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 5: Make the restaurants list in proximity order.\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 6: Make order confirmation page\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 7: Remove listing upon order confirmation \newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 8: Bug testing / Finishing up touches for peer testing\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 9: Peer testing report II + video demo II (Bug Testing)\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 10: Bug testing / Optional features\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 11: Bug testing / Optional features\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 12: Bug testing / Optional features\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 13: Bug testing / Optional features\newline
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Week 14: Final Report + Final Presentation\newline

\newpage

# Functional requirements

- Any user should be able to identify which food and which store to choose from.
- Merchants in the map view show their distance to the user.
- The user should not be able to use the system without logging in.
- Merchant accounts should be able to add, edit and remove items from the database.
- The Google Map API should be online to use the app.
- The order will be automatically cancelled depending on how much time was spent. (Ex: `Distance to the store * (on foot || driving) + extra time`)
- Cooldown of approximately 4 - 5 hours on every successful claim by the user in order to prevent spam.
- The account will be set up with full name and phone number to limit bot accounts.
- The admin account should be able to ban/time out any account.

# Non-Functional requirements and environmental constraints

- Programming Languages: Javascript and Typescript
- User interface must be mobile friendly and support native mobile gestures.
- Inventories must be reliable and up-to-date to prevent invalid orders.
- The database should not be directly accessible and modifiable by regular users.
- More broadly: all users should only have as much database access as is absolutely required. (e.g. none for regular users, access to their entries for merchants)
- The homescreen should open in under 2 seconds at the slowest.
- The map should open within 3 seconds, with all pinpoints on the map around the user.
- Include loading screen as required in order to keep the user experience smooth and clear.
- The account will require full name and phone number upon signing up, the name is never disclosed, but phone number is shared with the restaurants for quality assurance.
- There will not be any information stored about the user from the restaurants other than the user ID for order history purposes.

\newpage

# Frameworks, libraries, and database ("Tech Stack")

The EquiFood software necessitates both a frontend, client-facing interface (in the form of a mobile app) and a backend API responsible for software business logic. Additionally, this backend API must be paired with some form of relational database.

## Frontend App

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Pros &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Cons &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React Native**                                                                                       | - Very familiar language (JavaScript), very mature\newline&nbsp;- Up to 70% of code can be shared across platforms\newline- Can share typings with a Node.js/JS backend\newline- Business logic can be shared with JS backend\newline- Widespread adoption (~15% of top 500 US apps use RN & used by Instagram, Facebook, Walmart) \newline                                     | - Larger bundle size\newline- Slightly lower performance than the latter two options\newline- Bottlenecked performance between worker and UI thread \newline                                                                                                                                                   |
| Native (Swift/Kotlin)                                                                                  | - Superior performance\newline- Smaller bundle size \newline                                                                                                                                                                                                                                                                                                                    | - Not cross platform\newline- Requires knowledge of multiple less-familiar programming languages\newline- Greater learning curve than JavaScript/React Native \newline                                                                                                                                         |
| Flutter                                                                                                | - Cross-platform\newline- SDK with prebuilt widgets and components\newline- Robust community support                                                                                                                                                                                                                                                                            | - Large bundle size\newline- Uses unfamiliar and immature programming language (Dart)\newline- Limited ecosystem compared to JavaScript                                                                                                                                                                        |

For the reasons listed above, it seems clear that React Native is the superior option. Development times will be markedly faster than those of a native solution (Swift/Kotlin) and the learning curve will be far easier than that of Flutter/Dart. JavaScript is a very familiar language with a history of several decades and React.js is extremely familiar to any frontend developer.

Additionally, the pairing of JavaScript/TypeScript on both the frontend and backend systems will allow sharing of business logic/types as well as liberate the developers of learning multiple esoteric programming languages.

**React Native** is the clear winner.

\newpage

## Backend

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Pros&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   | Cons &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **NestJS**                                                                                             | - Very opinionated (clear design patterns, structure), uses MVC architecture\newline- Built-in features (users, auth, more)\newline- Single language for frontend/backend (JS)\newline- Seamless database integration\newline- Angular-like dependency injection\newline- High performance\newline- Medium learning curve\newline- TypeScript\newline- Highly scalable\newline | - Can potentially be too opinionated\newline- Relatively new/not very mature\newline- Lots of obfuscation (not obvious what certain decorators do) \newline                                                                                                                                                        |
| EspressJS                                                                                              | - Easy learning curve\newline- High performance\newline- Single language for frontend/backend (JS) \newline                                                                                                                                                                                                                                                                    | - Not suitable for large projects\newline- Poor out-of-box security\newline- Limited out-of-box features\newline- No clear design patterns/too open ended and difficult to structure project well \newline                                                                                                         |
| Django                                                                                                 | - Uses MVC architecture\newline- Many built-in features (users, auth, etc.)\newline- Built-in security features (i.e. XSS)\newline- Highly scalable                                                                                                                                                                                                                            | - Not suitable for small projects\newline- Monolithic framework\newline- No conventions\newline- Steep learning curve\newline- Different language than frontend                                                                                                                                                    |

From the options listed Django and NestJS are likely the strongest contenders. A fully-fledged framework with built in autherntication and REST API support is required for this project. EspressJS would be far to flexibile for a project such as this and would likely lead to a bloated and hard-to-follow project strucure (meaning that if NodeJS was the desired platform, NestJS would be superior).

However, NestJS is chosen due to its better support for small to mid sized projects as well as lower level of granulaity. This is ideal for the timeframe presented as minimizing development times is of high priority. Furthermore, while Python is very familiar, using TypeScript for both the frontend and backend is ideal and will further work to reduce development times as well as allow all developers to easily work full-stack.

Therefore, **NestJS** is the winner.

\newpage

## Database

A relational database is required for this project. Becasue the data is very structured (users, orders, businesses, etc.) and requires many relationships, a relational database is the superior option (compared to NoSQL).

For the scope of this project, there is a general indifference regarding which relational database Equifood uses (dataset and number of concurrent queries will be very small).

Two alternatives are **MySQL** and **Postgres**.

MariaDB is faster than MySQL and is open-source. However MariaDB does not support any data masking (but this is outside the scope of Equifood). Open-source is necessary for the Equifood software as it is a community service and will likely be opensource in its entirety.

Postgres and MariaDB are very comparible (and to chose between them for a project of this scale would be pulling hairs), but MariaDB was the choice most familiar to us so it made the most sense to use it given the constraints of development time.

Due to this reason, the **MariaDB** will be the database of choice. It is very easy to configure and couples well with NestJS/TypeORM.

\newpage

# Testing plan

The testing plan is a large concern of the Equifood software as it insures that developers do not create bugs (or regressions) as they augment features within the software.

Another benefit is that a good suite of tests will make the functionality of the software very obvious and benefit the onboarding of new developers.

Finally, automated testing pipelines will prevent the Equifood developers from having to complete manual QA tasks (or at least reduce the scope of them).

## Static analysis

The first line of defence against poor code/bugs in the Equifood codebase against will be **static anaylsis**.

- **ESLint** will be deployed in both the frontend & backend of the equifood software. This will prevent common bugs and enforce code design rules. ESLint is well supported and has many plugins (such as those for React Native/React) so it will pair well in our project.
- **Prettier** will be used to improv the quality of the code. While this isn't necessarily a static analysis tool, prettier will help to enforce styling consistent conventions in the codebase as well as make the code more readable => easier for other devs to understand & less prone to bugs.
- **TypeScript** will be used universally to enforce strong types throughout the Equifood software. This is superior to vanilla JS, as it prevents the creation of type related bugs, unintended `null`/`undefined` values, is more readable (=> less bugs), and has better OOP support than JS.

## Regression Testing

The Equifood software will utilize **retest-all regression testing**.

This means that the software will run the entire test suite again any time that changes are made to the codebase. In practice, this means there will exist a **GitHub Actions** workflow which runs on `pull_request` to `master` and `push` to `master`. This workflow will run the build scripts (i.e. `npm run build`) and the whole test suite (i.e. `npm run test`).

Our automated testing CI/CD pipeline will contain both [unit tests](#unit-testing) and [E2E tests](#end-to-end-testing).

## Unit testing

The choice of unit testing framework for the Equifood software is [Jest](https://jestjs.io/) - which is the most widely supported and used testing framework in Javascript.

Using these Unit tests, the Equifood software will test the logic of small, individual components within the software (classes, funcitons, etc.)

These tests will be writen for both the [frontend](#client-app) and the [backend](#backend).

## End-to-end testing

For E2E tests we will use [Detox](https://github.com/wix/Detox). This choice is justified by the fact that it is built specifically for React Native and is very popular within the community.

E2E tests will run the application as if it would be used by a user and simulate user interactions. These tests will test the whole system (frontend, backend, database).

While E2E tests are very effective at spotting bugs, they are very expensive to develop and not as scalable as unit tests. Additionally these E2E tests will be prone to "flakiness" and unreliability.

For these reasons, only core functionalities will deserve E2E tests (i.e. authentication, happy path of making order, etc.) but niche functions will not receive these tests.

\newpage

# Questions & Answers

- **How do you plan to allow users to sort between different types of food?**
  There is no official roadmap for this. The client was quite adamant on this being an agnostic catalog - he did not seem to want any categorization of our items. While we think it is a beneficial feature, we have no choice but to do as the client intends currently and raise this issue to him when it necessitates itself.

- **Are you going to develop each version (android ios pc) at the same time?**
  This is correct - there will be no PC version. It will only be a React Native mobile app. The majority of code will be shared and only small adaptations will be required per device target. Adding PC target in the future is an option.

- **The DFD 0 is a little too complicated and should have some details moved to the DFD 1**
  We tend to agree on this and have simplified DFD level 0.

- **What are your budget constraints?**
  We have essentially a budget of $0 as our client is a UBC student. While he can request funding it is very nuanced and we realisitcally don't need a budget if this will only be deployed locally (everything is open-source/free as far as tooling goes)

- **What criteria is there to approve a restaurant for an account?**
  This is a business constraint which is outside of our domain.

- **The DFD's are difficult to grasp, and it would be great if you broke it down.**
  Agreed. Has been done.

- **What's Jest?**
  Jest is a JavaScript testing framework by Facebook and the most common JS testing framework used for unit tests.

- **Will the weekly report be emailed to admins or sent through another medium?**
  Yes reports will be emailed and be visible through the administrative page.

- **Will it track what restaurants are the highest donors on the app?**
  Yes this will be part of weekly report.

- **One of mongoDB’s problems is how it lacks support for mobile applications and might need customized codes for the app to sync properly with the server? Have your team considered this potential issue?**

  1. We are not using MongoDB, we are using MariaDB.
  2. If this question is with regards to realtime updates, yes we have considered this issue. We will have to build out websockets in order to dispatch realtime updates. This is necessary for push notifications as well.

- **Will you use a UI Library**
  We will use [NativeBase](https://nativebase.io/). Will speed up development time and we have no UI/UX person, so making anything look nice without would be hard.

- **Adding many different foods can be time-consuming**
  This is a business requirement. The merchant adds what they want. We have no say in how this part of the App operates.

- **Will there be a date showing when the food goes bad online? May forget to take a food listing down**
  Great idea. Foods will default to expiry at end of day and can be configured for otherwise if desired.

- **May be a bit too much given the constraints and timeline to complete by**
  I think you are right. But we never got to choose this project, our client is a UBC student with no knowledge of software engineering or project management, and we need to do it to graduate. I offer my condolances to the other two equifood groups.

- **For the food items that will have a cost, will the money go to Equifood or the restaurant?**
  Restaurant. Equifood makes no profit.

- **Will there be a cancellation fee for users who do not pick up their food?**
  There is no way to enforce this as Equifood does not process payments

- **Will there be something implemented to ensure the food posted is safe to consume? Maybe it will be beneficial to add a blurb on food safety for the specific post.**
  This is probably smart from a liability standpoint. Again. Business requirement which has not been thought out and we have no say over.

- **Use a laser pointer when explaining diagram. The digram was hard to follow at points both in terms of complexity and visually. How can businesses find out about the app could it be a feature?**
  We are not responsible for marketing and partnerships.

- **What is your budget? Where are you hosting the app? Why did you pick relational over nonrelational databases? What proof of enrollment would be required for a restaurant to join the app?**
  $0 budget, as already mentioned. No hosting because it has to run locally.

- **In your presentation, there didn’t seem to be a mention of whether you are planning to build the app for iOS native or Android native. Has one been decided yet or do you plan to do both?**
  For both, using React Native.

- **Can users make payments directly online? Since there were mentions about the donations, it is quite unclear what 'donations' mean in this case.**
  No payment processing.

- **How are you guys going to enforce security for the transactions on your app?**
  No transactions. Will use JWT for authentication of users.
- **Project never elaborated on the budget of the developement**
  $0

- **Are there any approval processes for a restaurant? Are there criterias to be met?**
  This is a business decision for the client. We will just implement functionality to submit application.

- **Will delivery service be implemented in the future?**
  Not that we know of.

- **Can a customer be notified if their order is removed?**
  Yes everything will be realtime and they will know about cancellations.

- **When the user looks for food around them, how will you filter the food? Dietary restrictions, type of food (like SkipTheDishes)?**
  This is outside of the scope of this project

- **How will the restaurant be notified? By email, by notification, or only in the app if they look at the food donation they posted?**
  Will need a merchant-facing app.

- **Will restaurants be able to see how much food was reduced by other nearby restaurants, or will that information be private?**
  We are not sure yet, this is something we will have to consult the client about.

- **Are all group members comfortable with the chosen tech stack? Would a lack of knowledge cause issues down the road during development? (constraints/risks)**
  Learning curve isn't too bad and they are reading documentation currently. It was the best choice available.

- **Good description of the problem and idea. How do people apply, do you need an account or is it just anyone? With having to make a restaurant add or remove items, it may be hard for them to add items if stock is constantly rotating. Is there any way to set an inventory mode or quantity? Are the daily reports made automatically or does someone have to manually make it. Like the other Equi Food projects it would be great to see some design ideas. Tech stack seems very well thought out. Overall seems good but make sure you have a design beforehand.**
  Ultimately people will apply through a web form. In the short term, they will apply by emailing administrators. 100% there will be quantities associated with all items. Daily reports are automatic.
