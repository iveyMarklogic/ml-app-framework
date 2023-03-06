# ml-app-framework

## Requirements

- MarkLogic 10+
- Node.js 16+
- npm 8+

## Clone project and install library dependencies

```
git clone http://github.com/iveyMarklogic/ml-app-framework
cd ml-app-framework
npm install
```

## Build library

Build the library code in in `/src` into `/dist` with the Rollup module bundler:

```
npm run build
```

CommonJS format is saved in `/dist/cjs` and ES modules format is saved in `/dist/mjs`.


## Set up MarkLogic environment

```
cd setup
npm install
```

Copy `config_sample.js` as `config.js` and edit for your MarkLogic environment. Then run:

```
node setup.js
```

This sets up databases, an app server, and a user, and loads records and config files for the example application.

## Set up and start middle-tier server

```
cd ../server/
npm install
```

Copy `config_sample.js` as `config.js` and edit for your environment. Then run:

```
node server.js
```

## Set up example application

In a new terminal window:

```
cd ml-application-framework/examples/ml-demo-app
npm install
```

The built library is installed as a dependency, see in `ml-demo-app/package.json`:

```
...
"ml-application-framework": "file:../..",
...
```

## Run example application

```
npm start
```

Open example application here: http://localhost:3000
