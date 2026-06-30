import { NextResponse } from "next/server";

const ADMIN_ID = process.env.ADMIN_ID || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "spice123";

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();

    if (!id || !password) {
      return NextResponse.json(
        { success: false, message: "Both admin ID and password are required." },
        { status: 400 }
      );
    }

    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid admin ID or password." },
      { status: 401 }
    );
  } catch (error) {
    console.error("[Admin Auth] Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to verify credentials." },
      { status: 500 }
    );
  }
}
