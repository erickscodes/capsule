import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const body = await request.json();
    const { capsuleCid, email, type } = body;
    let capsuleUploadType;
    if (type === "icon") {
      capsuleUploadType = "capsuleIcon";
    } else {
      capsuleUploadType = "capsuleDocument";
    }
    const uploadData = await pinata.upload.file(file).addMetadata({
      keyvalues: {
        capsuleCid: String(capsuleCid),
        type: capsuleUploadType,
      },
    });
    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
