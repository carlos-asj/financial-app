import database from "infra/database.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const dbVersionRes = await database.query("SHOW server_version;");
    const dbVersionFormat = dbVersionRes.rows[0].server_version;

    const dbName = process.env.POSTGRES_DB;

    const maxConnectionsRes = await database.query("SHOW max_connections;");
    const maxConnectionsFormat = maxConnectionsRes.rows[0].max_connections;

    const openedConnections = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [dbName],
    });
    const openedConnectionsRes = openedConnections.rows[0].count;

    response.status(200).json({
      message: "working great!",
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: dbVersionFormat,
          max_connections: parseInt(maxConnectionsFormat),
          opened_connections: openedConnectionsRes,
        },
      },
    });
  } catch (error) {
    console.log("\n Erro dentro do catch do controller:");
    console.error(error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
}

export default status;
