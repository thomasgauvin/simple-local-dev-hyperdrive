import postgres from "postgres";

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "HYPERDRIVE" with the variable name you defined.
  HYPERDRIVE: Hyperdrive;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Create a database client that connects to our database via Hyperdrive
    // Hyperdrive generates a unique connection string you can pass to
    // supported drivers, including node-postgres, Postgres.js, and the many
    // ORMs and query builders that use these drivers.
    const sql = postgres(env.HYPERDRIVE.connectionString);

    try {
      // Test query
      const result = await sql`SELECT * FROM pg_tables;`;

      // Returns result rows as JSON
      return Response.json({ result: result });
    } catch (e: any) {
      console.log(e);
      return Response.json({ error: e.message }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;