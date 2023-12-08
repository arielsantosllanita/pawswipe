import connection from "@/db/connection";
import likeModel from "@/db/models/like.model";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
  if (!_.isEmpty(params?.slug)) {
    return NextResponse.json({ msg: "Not Found" }, { status: 404 });
  }

  await connection();
  const favorites = await likeModel.find({});

  return NextResponse.json({ favorites });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string[] } }) {
  if (!_.isEmpty(params?.slug)) {
    return NextResponse.json({ msg: "Not Found" }, { status: 404 });
  }

  const body = await req.json();

  if (!body?.userId || !body?.animalId) {
    return NextResponse.json({ msg: "Invalid values" }, { status: 400 });
  }

  await likeModel.create({ userId: body.userId, animalId: body.animalId });
  return NextResponse.json({msg: 'Created successfully!'});
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string[] } }) {
  if (_.isEmpty(params?.slug) || params.slug.length > 1) {
    return NextResponse.json({ msg: "Not Found" }, { status: 404 });
  }
  
  await likeModel.findByIdAndDelete(params.slug[0]);
  return NextResponse.json({msg: 'Delete successfully!'});
}
