import { LowSync, JSONFileSync } from "lowdb";
import { Data } from "./types";

const adapter = new JSONFileSync<Data>("db.json");
const db = new LowSync<Data>(adapter);

db.read();

db.data ||= { products: [] };

db.write();

export default db;
