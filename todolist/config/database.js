const connectionString = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.SERVER_NAME,
  database: process.env.DB_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: process.env.NODE_ENV === "production", // true for production
    trustServerCertificate: process.env.NODE_ENV !== "production", // false for production
  },
};

export default connectionString;
