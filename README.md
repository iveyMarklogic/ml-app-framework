# ml-application-framework

## Clone project and install dependencies

```
git clone git@github.com:iveyMarklogic/ml-app-framework.git
cd ml-application-framework
npm install
```

## Build the library

**Option 1, using webpack:**

```
npm run build
```

This converts and bundles the code in `/dist` into   `/cjs` for common js and `/mjs` for module.


## Set up example application

```
cd examples/ml-demo-app
npm install
```

Installed as a dependency is the library from above. See in `ml-demo-app/package.json`:

```
...
"ml-application-framework": "file:../..",
...
```

The `Test` component is imported and used in `App.js`.

## Run example application

```
npm start
```

Open application here: http://localhost:3000