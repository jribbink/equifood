## Handoff guide

### Overview

It is important to understand that the Equifood App is comprised of multiple sub-projects which are all distributed as a part of the monorepo. This is an [NX](https://nx.dev/) monorepo and all syntax for interfacing with these projects (i.e. running particular actions) will be according to the NX standards.

The three applications that exist are currently **Equifood Customer**, **Equifood Merchant**, and **Equifood API**.

Additionally, some shared libraries exist for code-sharing between these apps.

All code is strongly-typed and written in [TypeScript](https://www.typescriptlang.org/) for the benefits of static analysis and error prevention, as well as a more convenient developer experience.

#### Frontend

There are two frontend apps for this project.

1. The customer facing app
2. The merchant/restaurant facing app

**NOTE** The frontend requires an `.env` file to be created (use `example.env` as reference)

##### Customer App

The client-facing frontend for the project (React Native) can be found in the `apps/customer-app` directory.

The app is supported as an IOS/Android application.

**NOTE** The Equifood Customer App requires an `.env` file to be created (use `example.env` as reference)

##### Merchant App

The merchant-facing frontend for the project (React Native) can be found in the `apps/merchant-app` directory.

The app is supported as an IOS/Android application.

**NOTE** The Equifood Merchant App requires an `.env` file to be created (use `example.env` as reference)

#### Backend

The backend for the project (NestJS) can be found in the `apps/equifood-api` directory.

Within the backend/API an admin portal endpoint is exposed for the administartor users (`/admin`). For instance, if your API is running on http://localhost:3333, then your admin portal would exist at http://localhost/admin.

**NOTE** The backend requires an `.env` file to be created (use `example.env` as reference)

#### Shared

Shared types for the frontend and backend can be found in the `lib/api-interfaces` directory.

These types are shared between all of the TypeScript apps within this project for easy code reuse,

Additionally, UI components, auth flows, and various other hooks/providers are shared in the `lib/ui-shared` directory. These are shared between the two React Native apps (Equifood Customer & Equifood Merchant).

### Usage

#### Installation & Configuration

1. Install [Node JS](https://nodejs.org/en/) v16. This task can optionally be completed using [Node Version Manager](https://github.com/nvm-sh/nvm).
2. Ensure you have C/C++ build tools installed on machine (i.e. gcc). Bettersqlite uses node-gyp and is dependent on these. [Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170) may be required for users on Windows. If you encounter issues with compiled binaries, please consider running the `npm run rebuild` command.
3. Run `npm install`
4. Create a configuration file `.env` in the `apps/equifood-api`, `apps/equifood-customer`, and `apps/equifood-merchant` directory (use `example.env` for reference)

#### Development

Apps can be served using `nx serve APP_NAME` command. Currently available apps are `equifood-api`, `equifood-customer`, and `equifood-merchant`.

Remember, for either the customer or merchant application to functional, the backend must be running and properly configured in the respective `.env` file.

Currently, there are 3 apps that can be launched:

1. Equifood Customer: `npx nx run equifood-customer`
2. Equifood Merchant: `npx nx run equifood-merchant`
3. Equifood API: `npx nx run equifood-api`

#### Testing

1. Run `npx nx test PROJECT_NAME` in order to run all tests for the desired project. If more information is needed, please refer to the [NX documentation](https://nx.dev/).

### Documention

Relevant documentation for this project exists in the `documentation` folder

Within this folder all technical specifications for the software, IP agreements, configuration instructions, and any other pertinent information can be found.

These are mostly written in markdown, however some exists in the form of PDF files.

## Relevant Resources

Link to GitHub repository: https://github.com/jribbink/equifood

Link to Promo Video: https://github.com/jribbink/equifood/blob/master/docs/promo-video.mp4
