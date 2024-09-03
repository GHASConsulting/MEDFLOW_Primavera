import { knex as setupKnex, Knex } from 'knex'
import Oracle from 'oracledb'

Oracle.initOracleClient({ libDir: process.env.ORACLE_DIR })

const databaseConfig: Knex.Config = {
  client: 'oracledb',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
    pool: {
      min: 1,
      max: 50,
    },
  },
}

/** @description Database connection */
const knex = setupKnex(databaseConfig)

export default knex
