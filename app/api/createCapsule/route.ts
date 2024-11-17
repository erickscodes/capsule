import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { capsuleName, capsuleDescription, email } = body;
    // const uniqueNumber = uuidv4();
    // const group = await pinata.groups.create({
    //   name: uniqueNumber,
    // });

    const upload = await pinata.upload
      .json({
        name: capsuleName,
        description: capsuleDescription,
      })
      .addMetadata({
        keyvalues: {
          name: capsuleName,
          description: capsuleDescription,
          capsuleOwner: email,
          type: "capsule",
        },
      });

    // push the capsuleCID into new route ->
    return NextResponse.json({ upload }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
