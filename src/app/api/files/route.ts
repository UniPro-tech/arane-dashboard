import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode") || "arane";
    const dir = `./public/files/${mode}`;

    if (!fs.existsSync(dir)) {
      return NextResponse.json([]);
    }

    const files = await fs.promises.readdir(dir);

    const rows = files.map((file) => ({
      id: file,
      name: file,
      size: fs.statSync(`${dir}/${file}`).size,
      createdAt: new Date(fs.statSync(`${dir}/${file}`).birthtime).toLocaleString("ja-JP"),
      updatedAt: new Date(fs.statSync(`${dir}/${file}`).mtime).toLocaleString("ja-JP"),
    }));

    return NextResponse.json(rows);
  } catch (err) {
    console.error("/api/files error", err);
    return NextResponse.json([], { status: 500 });
  }
}
