import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { capsuleCid } = body;

    const icon = await pinata.files.list().metadata({
      capsuleCid: String(capsuleCid),
      type: "capsuleIcon",
    });

    // const deleteFiles = await pinata.files.delete(idsToDelete);
    return NextResponse.json(
      { iconCID: icon.files[icon.files.length - 1].cid },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
