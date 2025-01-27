import { NextResponse } from "next/server";
import Home from "@/utils/models/home.models";
import DBInstance from "@/utils/db/server";

DBInstance();

export async function GET(req: Request) {
  try {
    const home = await Home.findOne();

    if (!home) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    return NextResponse.json(home, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to fetch home data", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to fetch home data", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitors = 0 } = body;

    if (!visitors) {
      return NextResponse.json(
        { message: "Visitors count is required" },
        { status: 400 }
      );
    }

    const updatedHome = await Home.findOneAndUpdate(
      {},
      { $set: { visitors } },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedHome, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to create home data", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to create home data", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}
