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
      capsuleCid: capsuleCid,
    });

    let idsToDelete = [];

    // get ids of corresponding documents
    for (let i = 0; i < documents.files.length; i++) {
      idsToDelete.push(documents.files[i].id);
    }
    // delete them
    const deleteFiles = await pinata.files.delete(idsToDelete);

    // after deleting files, want to delete JSON
    const json = await pinata.files.list().cid(capsuleCid);
    const jsonId = json.files[0].id;
    const deleteJson = await pinata.files.delete([jsonId]);
    return NextResponse.json({ jsonId }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
