import { connectDb } from "@/lib/db";
import Note from "@/lib/models/notes";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notes = await Note.find({ user: userId });

    if (!notes) {
      return NextResponse.json(
        { error: "No notes found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const body = await req.json();
    const { title, description } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newNote = await Note.create({ title, description, user: userId });

    if (!newNote) {
      return NextResponse.json(
        { error: "Failed to create note" },
        { status: 400 }
      );
    }

    return NextResponse.json({ newNote }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

const PATCH = async (req: NextRequest, res: NextResponse) => {};
const DELETE = async (req: NextRequest, res: NextResponse) => {};

export { GET, POST, PATCH, DELETE };
