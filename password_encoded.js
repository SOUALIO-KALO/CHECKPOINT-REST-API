require("dotenv").config();
const PASSWORD = process.env.PASSWORD;
const PASSWORD_ENCODED = encodeURIComponent(PASSWORD);

console.log(`[] PASSWORD : ${PASSWORD_ENCODED}`);
