import { NextResponse } from "next/server";
import Emails from "@/utils/models/emails.models";

// GET all emails
export async function GET(req: Request) {
  try {
    const emails = await Emails.find();

    if (emails.length === 0) {
      return NextResponse.json({ message: "No emails found" }, { status: 404 });
    }

    return NextResponse.json(emails, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to retrieve emails", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to retrieve emails", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// POST new email
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingEmail = await Emails.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const newEmail = await Emails.create({ email });

    return NextResponse.json(newEmail, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to create email", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to create email", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// DELETE by ID
export async function DELETE(req: Request) {
  try {
    const { emailId } = await req.json();

    const deletedEmail = await Emails.findByIdAndDelete(emailId);

    if (!deletedEmail) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Email deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to delete email", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to delete email", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}
