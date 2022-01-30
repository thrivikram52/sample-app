require("babel-core/register");
require("babel-polyfill");
const deleteUsers = require("./DeleteData");

function main() {
  return deleteUsers();
}

main();
