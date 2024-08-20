import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(
      "postgresql://uber_owner:pEBn4QgYXN9H@ep-cool-snowflake-a14xoe1k.ap-southeast-1.aws.neon.tech/uber?sslmode=require",
    );
    const { name, email, clerkId } = await request.json();
    if (!name || !email || !clerkId) {
      return Response.json({
        error: "All fields are required",
        status: 400,
      });
    }
    const res = await sql`INSERT INTO users (name, email, clerkId) VALUES (${name}, ${email}, ${clerkId})`;
    console.log(res);
    return new Response(JSON.stringify({ data: res }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}
