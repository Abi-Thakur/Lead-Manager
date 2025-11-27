import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectDB();

    return Response.json({
      success: true,
      message: "MongoDB connected successfully!",
      host: db.connection.host,
      db: db.connection.name,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "MongoDB connection failed",
      error: String(error),
    });
  }
}
