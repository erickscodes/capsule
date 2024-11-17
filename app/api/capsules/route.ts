import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // get capsule owned by user
    const capsules = await pinata.files.list().metadata({
      capsuleOwner: email,
    });
    return NextResponse.json({ capsules }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
