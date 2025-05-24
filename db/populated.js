require("dotenv").config()
const { generatePassword } = require("../utilities/password")
const { Client } = require("pg")

const { salt, hash } = generatePassword("admin")

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  first_name VARCHAR ( 255 ), 
  last_name VARCHAR ( 255 ), 
  password VARCHAR (255), 
  salt VARCHAR (255), 
  membership_status VARCHAR (255)
);

INSERT INTO users (username, first_name, last_name, password, salt, membership_status) 
VALUES
  ('admin', 'admin', 'admin', '${hash}', '${salt}', 'admin');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.DB_PSW}>@localhost:5432/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();