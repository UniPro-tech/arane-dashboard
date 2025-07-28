import { signIn } from "@/auth";
import { Button, Stack } from "@mui/material";

export default function Page() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <form
        action={async () => {
          "use server";
          await signIn("discord");
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Button type="submit" variant="contained">
            Discordでログイン
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
