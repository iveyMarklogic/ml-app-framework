const config = require('./config_sample'),
      rp = require('request-promise'),
      client = require('./client.js');

jest.setTimeout(60000);

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

beforeAll(() => {
  config.auth.user = 'admin';
  config.auth.pass = 'admin';
});

test('Can create and delete a database', async () => {
  const dbName = 'testDb';
  await client.createDatabase(dbName, config);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/databases/?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed = JSON.parse(response);
  // Check if db exists
  expect(parsed["database-default-list"]["list-items"]["list-item"].findIndex(x => x.nameref === dbName)).toBeGreaterThanOrEqual(0);
  await client.deleteDatabase(dbName, config);
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/databases/?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed2 = JSON.parse(response2);
  // Check if db does not exist
  expect(parsed2["database-default-list"]["list-items"]["list-item"].findIndex(x => x.nameref === dbName)).toBeLessThan(0);
});

test('Can create and delete a forest', async () => {
  const dbName = 'testDb';
  await client.createDatabase(dbName, config);
  await client.createForest(dbName, config);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/forests/?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed = JSON.parse(response);
  // Check if forest exists
  expect(parsed['forest-default-list']['list-items']["list-item"].findIndex(x => x.nameref === dbName.concat("-1"))).toBeGreaterThanOrEqual(0);
  await client.deleteDatabase(dbName, config); // Must delete associated db before deleting forest
  await client.deleteForest(dbName.concat("-1"), config);
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/forests/?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed2 = JSON.parse(response2);
  // Check if forest does not exist
  expect(parsed2['forest-default-list']['list-items']["list-item"].findIndex(x => x.nameref === dbName.concat("-1"))).toBeLessThan(0);
});

test('Can create, update auth on, and delete a REST server', async () => {
  const dbName = 'testDb';
  const modulesName = 'testModules';
  config.rest["rest-api"].name = "rest-test";
  config.rest["rest-api"].port = 8088;
  config.rest["rest-api"].database = 'testDb';
  config.rest["rest-api"]["modules-database"] = 'testModules';
  await client.createDatabase(dbName, config);
  await client.createForest(dbName, config);
  await client.createDatabase(modulesName, config);
  await client.createForest(modulesName, config);
  await client.createREST(config);
  await sleep(config.pause || 10000);
  await client.setRESTAuth(config);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/v1/rest-apis/?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed = JSON.parse(response);
  // Check if REST exists
  const restIndex = parsed["rest-apis"].findIndex(x => x.name === config.rest["rest-api"].name);
  expect(restIndex).toBeGreaterThanOrEqual(0);
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/servers/' + config.rest["rest-api"].name + '/properties/?format=json&group-id=Default',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed2 = JSON.parse(response2);
  // Check if REST authentication is as configured
  expect(parsed2['authentication']).toBe(config.rest.security.authentication);
  await client.deleteREST(config.rest["rest-api"].name, config);
  await sleep(config.pause || 10000);
  const response3 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/v1/rest-apis/?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed3 = JSON.parse(response3);
  // Check if REST does not exist
  expect(parsed3["rest-apis"].findIndex(x => x.name === config.rest["rest-api"].name)).toBeLessThan(0);
});

test('Can create and delete an XDBC server', async () => {
  const dbName = 'testDb';
  const modulesName = 'testModules';
  config.xdbc["server-name"] = "xdbc-test";
  config.xdbc.port = 8089;
  config.xdbc["content-database"] = dbName;
  await client.createDatabase(dbName, config);
  await client.createForest(dbName, config);
  await client.createXDBC(config);
  await sleep(config.pause || 10000);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/servers/' + config.xdbc["server-name"] + '?format=json&group-id=Default',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed = JSON.parse(response);
  // Check if XDBC exists
  expect(parsed['server-default'].name).toBe('xdbc-test');
  await client.deleteXDBC(config.xdbc["server-name"], config);
  await sleep(config.pause || 10000);
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/servers/?format=json&group-id=Default',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed2 = JSON.parse(response2);
  // // Check if XDBC does not exist
  expect(parsed2['server-default-list']['list-items']['list-item'].findIndex(x => x.nameref === config.xdbc["server-name"])).toBeLessThan(0);
  await client.deleteDatabase(dbName, config); // Must delete associated db before deleting forest
  await client.deleteForest(dbName.concat("-1"), config);
});

test('Can create and delete a role', async () => {
  config.role["role-name"] = "role-test";
  await client.createRole(config);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/roles?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed = JSON.parse(response);
  // Check if role exists
  expect(parsed["role-default-list"]["list-items"]["list-item"].findIndex(x => x.nameref === config.role["role-name"])).toBeGreaterThanOrEqual(0);
  await client.deleteRole(config.role["role-name"], config);
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/roles?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed2 = JSON.parse(response2);
  // // Check if role does not exist
  expect(parsed2["role-default-list"]["list-items"]["list-item"].findIndex(x => x.nameref === config.role["role-name"])).toBeLessThan(0);
});

test('Can create and delete a user', async () => {
  config.user["user-name"] = "user-test";
  await client.createUser(config);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/users?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed = JSON.parse(response);
  // Check if user exists
  expect(parsed["user-default-list"]["list-items"]["list-item"].findIndex(x => x.nameref === config.user["user-name"])).toBeGreaterThanOrEqual(0);
  await client.deleteUser(config.user["user-name"], config);
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/users?format=json',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  const parsed2 = JSON.parse(response2);
  // Check if user does not exist
  expect(parsed2["user-default-list"]["list-items"]["list-item"].findIndex(x => x.nameref === config.user["user-name"])).toBeLessThan(0);
});

test('Can load to content and modules databases and load search options', async () => {
  const dbName = 'testDb';
  const modulesName = 'testModules';
  config.databases.content.name = dbName;
  config.databases.modules.name = modulesName;
  config.rest["rest-api"].name = "rest-test";
  config.rest["rest-api"].port = 8088;
  config.rest["rest-api"].database = dbName;
  config.rest["rest-api"]["modules-database"] = 'testModules';
  config.rest.options = {
    name: "test-options",
    file: "test/test-options.xml"
  }
  config.user["user-name"] = "user-test";
  config.content = [
    {
      collection: "test",
      path: "/data/test"
    }
  ];
  config.modules = {
      collection: "test",
      path: "/data/test"
  };
  await client.createDatabase(dbName, config);
  await client.createForest(dbName, config);
  await client.createDatabase(modulesName, config);
  await client.createForest(modulesName, config);
  await client.createREST(config);
  await sleep(config.pause || 10000);
  await client.setRESTAuth(config);
  await client.createUser(config);
  await client.loadContent(config);
  await client.loadModules(config);
  await client.loadSearchOptions(config);
  await sleep(config.pause || 10000);
  const response = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':' + config.rest["rest-api"].port + '/v1/documents?uri=/test/test.xml',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  // Check if content exists
  expect(response).toBeDefined();
  const response2 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':' + config.rest["rest-api"].port + '/v1/documents?uri=/test.xml&database=testModules',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  // Check if module exists
  expect(response2).toBeDefined();
  const response3 = await rp({
    method: 'GET',
    uri: 'http://' + config.host + ':' + config.rest["rest-api"].port + '/v1/documents?uri=/Default/rest-test/rest-api/options/test-options.xml&database=testModules',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  });
  // Check if search options exists
  expect(response3).toBeDefined();
  await client.deleteUser(config.user["user-name"], config);
  await client.deleteREST(config.rest["rest-api"].name, config);
  await sleep(config.pause || 10000);
});