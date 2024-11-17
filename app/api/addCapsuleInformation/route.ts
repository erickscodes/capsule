import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      dateOfBirth,
      phoneNumber,
      address,
      bio,
      emergencyName,
      emergencyPhone,
      emergencyEmail,
      capsuleCid,
    } = body;

    const upload = await pinata.upload
      .json({
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        address: address,
        bio: bio,
        emergencyName: emergencyName,
        emergencyPhone: emergencyPhone,
        emergencyEmail: emergencyEmail,
      })
      .addMetadata({
        keyvalues: {
          capsuleCid: capsuleCid,
          type: "capsuleInformation",
        },
      });

    return NextResponse.json({ upload }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
