import { NextResponse } from "next/server";
import { hash, genSalt } from "bcrypt";
import { prisma } from "@/../src/lib/prismaClient";

export async function POST(req: Request) {
  const { firstName, lastName, email, userName, password } = await req.json();

  const userExist = await prisma.user.findFirst({
    where: {
      UserName: userName,
    },
  });

  if (userExist) {
    return NextResponse.json({
      message: "User already added",
    });
  }

  const saltRounds: number = 10;
  const salt: string = await genSalt(saltRounds);
  const hashedPassword: string = await hash(password, salt);

  try {
    await prisma.user.create({
      data: {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        UserName: userName,
        Password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    return NextResponse.json({
      message: "There was an unexpected error creating the user",
    });
  }
}
