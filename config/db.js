const env = process.env.NODE_ENV; // 环境变量

let MYSQL_CONFIG;
let REIDS_CONFIG;
if (env === "dev") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "asd123456",
    port: 3306,
    database: "ghost"
  };
  REIDS_CONFIG = {
    host: "127.0.0.1",
    port: 6379
  };
}

if (env === "production") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "asd123456",
    port: 3306,
    database: "ghost"
  };

  REIDS_CONFIG = {
    host: "127.0.0.1",
    port: 6379
  };
}

module.exports = {
  MYSQL_CONFIG,
  REIDS_CONFIG
};
