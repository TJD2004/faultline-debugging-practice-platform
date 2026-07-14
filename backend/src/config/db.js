const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

// Fail fast and loud on startup instead of a confusing stack trace on the
// first request that touches the DB.
async function verifyConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("\n✗ MONGODB_URI is not set.");
    console.error("  Add it to your .env file — see .env.example.\n");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const dbName = mongoose.connection.name;
    console.log(`✓ Connected to MongoDB database "${dbName}"`);
  } catch (err) {
    console.error("\n✗ Could not connect to MongoDB.");
    if (err.name === "MongoServerSelectionError" || err.message?.includes("ECONNREFUSED")) {
      console.error(
        "  Nothing reachable at the host in MONGODB_URI.\n" +
          "  If you're using MongoDB Atlas, double check:\n" +
          "    - the connection string (including username/password) is correct\n" +
          "    - your current IP is allow-listed under Network Access\n"
      );
    } else if (err.message?.includes("Authentication failed") || err.message?.includes("bad auth")) {
      console.error("  The username/password in MONGODB_URI are wrong for this cluster.\n");
    } else {
      console.error(`  ${err.message}\n`);
    }
    process.exit(1);
  }
}

module.exports = mongoose;
module.exports.verifyConnection = verifyConnection;
