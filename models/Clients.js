import { Schema } from "mongoose";

import * as mongoConnect from "../connections/mongoConnect";

const { mainDb } = mongoConnect;

const ClientsSchema = new Schema({
  apiKey: {
    type: String,
  },
});

const Clients = mainDb.model("Clients", ClientsSchema, "Clients");
export default Clients;
