import { NextResponse } from "next/server";
import Analytics from "@/utils/models/analytics.models";

// GET analytics data for a specific blog
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const analytics = await Analytics.findOne({ blogId });

    if (!analytics) {
      return NextResponse.json(
        { message: "Analytics not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analytics, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to retrieve analytics", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to retrieve analytics", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// POST new analytics data
export async function POST(req: Request) {
  try {
    const { blogId, views, shares, likes, comments, engagementRate } =
      await req.json();

    const newAnalytics = await Analytics.create({
      blogId,
      views: views || 0,
      shares: shares || 0,
      likes: likes || 0,
      comments: comments || 0,
      engagementRate: engagementRate || 0,
    });

    return NextResponse.json(newAnalytics, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to create analytics", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to create analytics", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// PUT/Update existing analytics data
export async function PUT(req: Request) {
  try {
    const { blogId, views, shares, likes, comments, engagementRate } =
      await req.json();

    const analytics = await Analytics.findOneAndUpdate(
      { blogId },
      { views, shares, likes, comments, engagementRate },
      { new: true }
    );

    if (!analytics) {
      return NextResponse.json(
        { message: "Analytics not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analytics, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to update analytics", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to update analytics", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// PATCH/Increment specific analytics data
export async function PATCH(req: Request) {
  try {
    const { blogId, views, shares, likes, comments, engagementRate } =
      await req.json();

    const analytics = await Analytics.findOneAndUpdate(
      { blogId },
      {
        $inc: {
          views: views || 0,
          shares: shares || 0,
          likes: likes || 0,
          comments: comments || 0,
          engagementRate: engagementRate || 0,
        },
      },
      { new: true }
    );

    if (!analytics) {
      return NextResponse.json(
        { message: "Analytics not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analytics, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to patch analytics", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to patch analytics", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}

// DELETE analytics data
export async function DELETE(req: Request) {
  try {
    const { blogId } = await req.json();

    const analytics = await Analytics.findOneAndDelete({ blogId });

    if (!analytics) {
      return NextResponse.json(
        { message: "Analytics not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Analytics deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json(
        { message: "Failed to delete analytics", error: err.message },
        { status: 400 }
      );
    } else {
      console.error("Unknown error", err);
      return NextResponse.json(
        { message: "Failed to delete analytics", error: "Unknown error" },
        { status: 400 }
      );
    }
  }
}
