import { Stack, Typography } from "@mui/material";
import FullFeaturedCrudGrid from "./datagrid";
import fs from "fs";

export default async function Page() {
  const files = await fs.promises.readdir("./public/files");
  const rows = files.map((file) => ({
    id: file,
    name: file,
    size: fs.statSync(`./public/files/${file}`).size,
    createdAt: new Date(
      fs.statSync(`./public/files/${file}`).birthtime
    ).toLocaleString("ja-JP"),
    updatedAt: new Date(
      fs.statSync(`./public/files/${file}`).mtime
    ).toLocaleString("ja-JP"),
  }));
  return (
    <Stack spacing={2}>
      <Typography variant="h4">ファイル管理</Typography>
      <FullFeaturedCrudGrid row={rows} />
    </Stack>
  );
}
