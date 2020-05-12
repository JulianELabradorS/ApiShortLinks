const db = require("mongoose");

db.Promise = global.Promise;

async function connect(url, dbName) {
  await db
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    })
    .then(() => console.log("[db] Connected successfully"))
    .catch((err) => console.error("[db]", err));
}
module.exports = connect;
