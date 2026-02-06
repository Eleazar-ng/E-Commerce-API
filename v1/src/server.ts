import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;
const ENV = env.NODE_ENV;

console.log(`\nStarting server...`);
console.log(`Starting server in ${ENV} mode`);

app.listen(PORT, (err) => {
  if (err) {
    return console.error('something bad happened', err)
  }

  console.log(`\nE-Commerce API server running on http://localhost:${PORT}`);
  console.log(`\n!!! Version-1 root: http://localhost:${PORT}/api/v1`);
});