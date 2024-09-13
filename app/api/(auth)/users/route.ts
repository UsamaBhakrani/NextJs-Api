import { connectDb } from "@/lib/db";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.objectId;

const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDb();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json("Error while fetching users", { status: 500 });
  }
};

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDb();
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDb();
    const body = await req.json();
    const { userId, newUserName } = body;

    if (!userId || !newUserName) {
      return NextResponse.json({ error: "Provide UserId" }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Provide Valid UserId" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { userName: newUserName },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

const DELETE = (req: NextRequest, res: NextResponse) => {};

export { GET, POST, PATCH, DELETE };
