// Runs a local MongoDB for development (no system install needed).
// Data is kept in server/.mongo-data so it survives restarts.
// Point MONGODB_URI at mongodb://127.0.0.1:27017 to use it.
import { MongoMemoryServer } from "mongodb-memory-server";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dbPath = fileURLToPath(new URL("../.mongo-data", import.meta.url));
mkdirSync(dbPath, { recursive: true });

const mongod = await MongoMemoryServer.create({
  instance: { port: 27017, dbPath, storageEngine: "wiredTiger" },
});

console.log(`Local MongoDB running at ${mongod.getUri()} (data: ${dbPath})`);

const shutdown = async () => {
  await mongod.stop({ doCleanup: false });
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
