/* eslint-disable import/no-import-module-exports */
import * as AbstractModels from "../../models/AbstractModels";
import User from "../../models/User";

const deleteUsers = async () => {
  const findCondition = {};
  await AbstractModels.mongoDelete(User, findCondition);
  console.log("users deleted executed");
};

module.exports = deleteUsers;
