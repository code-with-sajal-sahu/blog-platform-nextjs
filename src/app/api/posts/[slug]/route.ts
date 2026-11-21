import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  try {
    const data = await prisma.post.findUnique({
      where: { slug: slug! },
      include: { user: true, category: true },
    });
    return NextResponse.json({ post: data }, { status: 200 });
  } catch (error) {
    console.error("Get Single Post Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
