import mongoose from "mongoose";
import { NextResponse } from "next/server";
import DBInstance from "@/utils/db/server";

DBInstance();

export async function GET() {
  try {
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      return NextResponse.json(
        {
          success: true,
          message: "ruchi-writes API is healthy and working!",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          database: "Connected",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "ruchi-writes API is healthy, but MongoDB connection failed",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          database: "Disconnected",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: "Error",
      },
      { status: 500 }
    );
  }
}
