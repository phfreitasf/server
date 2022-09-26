import https from 'https';
import fs from "fs";
import { app } from './appExpress'

const httpsServer = https.createServer({
    key: fs.readFileSync("private.key"),
    cert: fs.readFileSync("certificate.crt"),
  }, app);

  export { httpsServer }