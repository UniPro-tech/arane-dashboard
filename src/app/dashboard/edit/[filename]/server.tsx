"use server";
import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string;
  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const filePath = resolve(process.cwd(), "./public/files", `${filename}`);
    await fs.writeFile(filePath, buffer);
  }
  revalidatePath("/file");
}
