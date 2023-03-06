# ml-app-framework

## Requirements

- MarkLogic 10+
- Node.js 16+
- npm 8+

## Clone project, install dependencies, and build library

```
git clone http://github.com/iveyMarklogic/ml-app-framework
cd ml-app-framework/ml-application-framework
npm install
```

Build the library in `/src` into `/dist` with the Rollup module bundler:

```
npm run build
```

CommonJS format is saved in `/dist/cjs` and ES modules format is saved in `/dist/mjs`.

## Set up and run demo application

### Set up MarkLogic environment

```
cd ../examples/ml-demo-app/setup
npm install
```

Copy `config_sample.js` as `config.js` and edit for your environment. Then run:

```
node setup.js
```

This sets up your MarkLogic Server (create databases, a REST server, a user, etc.) and loads example documents. 

### Set up and start middle-tier server

```
cd ../server/
npm install
```

Copy `config_sample.js` as `config.js` and edit for your environment. Then run:

```
node server.js
```

This runs an Node.js Express server that proxies requests to and responses from the MarkLogic REST server.

### Set up and run example application UI

In a new terminal window:

```
cd ml-app-framework/examples/ml-demo-app/ui
npm install
```

Run the demo application:

```
npm start
```

Open demo application here: http://localhost:3000

## Set up and run Storybook

Use Storybook to view and interact with libary components.

In a new terminal window:

```
cd ml-app-framework/ml-application-framework
npm run build-storybook
```

Run the built Storybook application:

```
npm run storybook
```

Open Storybook here: http://localhost:6006
