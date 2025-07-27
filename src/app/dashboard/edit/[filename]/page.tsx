import {
  Button,
  Input,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import fs from "fs";
import { uploadFile } from "./server";

export default async function Page({
  params,
}: {
  params: Promise<{ filename: string }>;
}) {
  const { filename } = await params;
  const file = await fs.promises.stat(`./public/files/${filename}`);
  return (
    <Stack>
      <Typography variant="h4" gutterBottom>
        Editing: {filename}
      </Typography>
      <Typography variant="h5" gutterBottom>
        ファイル情報
      </Typography>
      <List>
        <ListItem>
          作成日時: {new Date(file.birthtime).toLocaleString("ja-JP")}
        </ListItem>
        <ListItem>
          更新日時: {new Date(file.mtime).toLocaleString("ja-JP")}
        </ListItem>
        <ListItem>サイズ: {file.size} bytes</ListItem>
      </List>
      <Typography variant="h5">アクション</Typography>
      <form action={uploadFile}>
        <Stack direction={"row"}>
          <Input hidden type="text" name="filename" value={filename} readOnly />
          <Input
            type="file"
            inputProps={{
              accept: `.${filename.split(".").pop()}`,
            }}
            name="file"
            placeholder="ファイルを選択"
          />
          <Button variant="contained" type="submit">
            ファイルを更新する
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
