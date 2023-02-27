# MarkLogic Setup

## Set up MarkLogic Environment

1. Change to the `setup` directory.
```
cd setup
```

2. Copy `config_sample.js` as a new file named `config.js`:
```
cp config_sample.js config.js
```
Edit `config.js` for your environment. At a minimum, edit `config.auth` for your MarkLogic Server.

3. Install the project dependencies for setup:
```
npm install
```

4. Run the setup script:
```
node setup.js
```
This will set up your MarkLogic Server (create databases, a REST server, a user, etc.) and load example documents. 

After setup, you can view your MarkLogic Server configuration in the Admin UI (http://localhost:8001) and the loaded documents in Query Console (http://localhost:8000/qconsole).

## Run Tests

From the `setup` directory run: 
```
npm test
```
