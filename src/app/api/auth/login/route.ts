import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { prisma } from "@/../src/lib/prismaClient";

const secret = process.env.JWT_SECRET;

export async function POST(req: Response) {
  const { userName, password } = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      UserName: userName
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "User/Password invalid",
    });
  }

  const isMatch = await compare(password, user.Password);

  if (!isMatch) {
    return NextResponse.json({
      message: "User/Password invalid",
    });
  }

  try {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        Id: user.Id,
        UserName: user.UserName,
      },
      `${secret}`
    );
    cookies().set({
      name: "Access_Token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
    });
    return NextResponse.json({ 
      Id: user.Id,
      UserName: user.UserName,
      FirstName: user.FirstName,
      LastName: user.LastName,
     });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export async function GET() {
  const cookie = cookies().get("Access_Token");
  if (!cookie) {
    return NextResponse.json({ Status: "No session longer" });
  }

  cookies().set({
    name: "Access_Token",
    value: "",
    expires: 0,
    path: "/",
  });
  return NextResponse.json({ status: "Now you are logout" });
}
