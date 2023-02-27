const config = require(process.argv[2] || './config'),
      client = require('./client.js');

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const teardown = async (config) => {
  console.log(
    '                           TEARDOWN STARTED                           '.gray.bold.inverse
  );
  await client.deleteREST(config.rest["rest-api"].name, config);
  // await pressAnyKey("Restart MarkLogic Server, then press any key to continue.".red); // NOTE for servers running from command line
  await sleep(config.pause || 10000);
  await Promise.all([
    client.deleteDatabase(config.databases.content.name, config),
    client.deleteDatabase(config.databases.modules.name, config),
    client.deleteUser(config.user["user-name"], config),
    // deleteRole(config.role["role-name"]); // NOTE If needed
  ]);
  console.log(
    '                           TEARDOWN FINISHED                          '.gray.bold.inverse
  );
}

teardown(config);
