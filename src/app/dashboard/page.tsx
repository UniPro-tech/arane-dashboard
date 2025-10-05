import { Stack, Typography } from "@mui/material";
import FilesLoader from "@/components/FilesLoader";

export default function Page() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">ファイル管理</Typography>
      <FilesLoader />
    </Stack>
  );
}
