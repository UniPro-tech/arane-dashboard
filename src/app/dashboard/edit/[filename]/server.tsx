"use server";
import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string;
  const mode = (formData.get("mode") as string) || "arane";
  if (file && file.size > 0 && filename) {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const dirPath = resolve(process.cwd(), "./public/files", mode);
    await fs.mkdir(dirPath, { recursive: true });
    const filePath = resolve(dirPath, filename);
    await fs.writeFile(filePath, buffer);
  }
  // revalidate the dashboard list that shows files
  revalidatePath("/dashboard");
}
