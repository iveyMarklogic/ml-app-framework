# Middle-Tier Server

## Set up and run

1. Change to the `server` directory.
```
cd server
```

2. Copy `config_sample.js` as a new file named `config.js`:
```
cp config_sample.js config.js
```
Edit `config.js` for your environment.

3. Install the project dependencies for setup:
```
npm install
```

4. Run the server:
```
node server.js
```
This will run an Express server that proxies requests to and responses from the MarkLogic REST server. XML content in the results is transformed to JSON.

## Run tests

From the `setup` directory run: 
```
npm test
```
