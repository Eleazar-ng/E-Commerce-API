import mongoose from "mongoose";
import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;
const ENV = env.NODE_ENV;

console.log('\x1b[35m' + `\nStarting server...`+ '\x1b[0m');
console.log('\x1b[36m' + `Starting server in ${ENV} mode` + '\x1b[0m');

// Database Connection
mongoose.connect(env.DATABASE_URL)
.then(() => {
  console.log('\x1b[32m' + '\nConnected to MongoDB successfully!' + '\x1b[0m')
})
.catch((err) => {
  console.log('\x1b[31m' + '\nFailed to connect to MongoDB' + '\x1b[0m')
  console.error('\x1b[41m' + `Error connecting to MongoDB:`, err);
  console.log('\x1b[0m')
})

app.listen(PORT, (err) => {
  if (err) {
    return console.error('something bad happened', err)
  }

  console.log('\x1b[34m' + `\nE-Commerce API server running on http://localhost:${PORT}`);
  console.log(`\n!!! Version-1 root: http://localhost:${PORT}/api/v1` + '\x1b[0m');

});