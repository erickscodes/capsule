import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { capsuleCid, email } = body;
    const newCapsuleCid = String(capsuleCid);
    // get capsule owned by user
    const capsules = await pinata.files.list().metadata({
      capsuleCid: newCapsuleCid,
      capsuleOwner: email,
    });
    const document = await pinata.files.list().metadata({
      capsuleCid: newCapsuleCid,
      type: "capsuleDocument",
    });
    const icon = await pinata.files.list().metadata({
      capsuleCid: newCapsuleCid,
      type: "capsuleIcon",
    });
    const information = await pinata.files.list().metadata({
      capsuleCid: newCapsuleCid,
      type: "capsuleInformation",
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
