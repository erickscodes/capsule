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

    const documents = await pinata.files.list().metadata({
      capsuleCid: String(capsuleCid),
      type: "capsuleDocument",
    });
    const documentNameAndCID = [];

    for (let i = 0; i < documents.files.length; i++) {
      documentNameAndCID.push({
        name: documents.files[i].name,
        cid: documents.files[i].cid,
      });
    }

    return NextResponse.json({ documentNameAndCID }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
