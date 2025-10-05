"use client";
import * as React from "react";
import FullFeaturedCrudGrid from "../app/dashboard/datagrid";
import { useMode } from "./ModeProvider";

type FileRow = {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
};

export default function FilesLoader() {
  const { mode } = useMode();
  const [rows, setRows] = React.useState<FileRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`/api/files?mode=${encodeURIComponent(mode)}`)
      .then((r) => r.json())
      .then((data: FileRow[]) => {
        if (mounted) setRows(data || []);
      })
      .catch((e) => {
        console.error("fetch files failed", e);
        if (mounted) setRows([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [mode]);

  if (loading) return <div>Loading files...</div>;

  return <FullFeaturedCrudGrid row={rows} />;
}
