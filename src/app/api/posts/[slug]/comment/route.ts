import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  try {
    const data = await prisma.comment.findMany({
      where: { postSlug: slug! },
      select: {desc: true, user: { select: {name: true, image: true}}, createdAt: true},
    });
    return NextResponse.json({ comments: data }, { status: 200 });
  } catch (error) {
    console.error("Get Single Post Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};