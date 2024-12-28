import { NextResponse } from "next/server";
import Users from "@/utils/models/users.models";
import { URL } from "url";

// GET user by userId, googleId, or email
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const { userId, googleId, email } = Object.fromEntries(
      url.searchParams.entries()
    );

    let user;

    if (userId) {
      user = await Users.findById(userId);
    } else if (googleId) {
      user = await Users.findOne({ googleId });
    } else if (email) {
      user = await Users.findOne({ email });
    } else {
      return NextResponse.json(
        { message: "User ID, Google ID, or Email is required" },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to get user", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to get user", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// POST new user
export async function POST(req: Request) {
  try {
    const { googleId, name, email, profileImage } = await req.json();

    const newUser = await Users.create({
      googleId,
      name,
      email,
      profileImage,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to create user", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to create user", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// PUT/Update existing user
export async function PUT(req: Request) {
  try {
    const { userId, name, email, profileImage } = await req.json();

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to update user", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to update user", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// DELETE user by ID
export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to delete user", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to delete user", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}
