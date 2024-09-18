import { connectDb } from "@/lib/db";
import Note from "@/lib/models/notes";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, context: { params: string | any }) => {
  const noteId = context.params.note;
  console.log(context);
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

    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

export { GET };
