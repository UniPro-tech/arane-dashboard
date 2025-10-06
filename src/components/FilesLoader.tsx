"use client";
import * as React from "react";
import FullFeaturedCrudGrid from "../app/datagrid";
import { useMode } from "./ModeProvider";
import { InputLabel } from "@mui/material";

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
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const fetchFiles = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/files?mode=${encodeURIComponent(mode)}`);
      const data: FileRow[] = await res.json();
      setRows(data || []);
    } catch (e) {
      console.error("fetch files failed", e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) fetchFiles();
    return () => {
      mounted = false;
    };
  }, [fetchFiles]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const formData = new FormData();
    for (const f of Array.from(files)) {
      formData.append("files", f, f.name);
    }

    try {
      const res = await fetch(`/api/files?mode=${encodeURIComponent(mode)}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("upload failed");
      await fetchFiles();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      console.error("upload error", e);
      // TODO: show user feedback
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`${id} を削除してもよろしいですか？`)) return;
    try {
      const res = await fetch(
        `/api/file?mode=${encodeURIComponent(
          mode
        )}&filename=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("delete failed");
      await fetchFiles();
    } catch (e) {
      console.error("delete error", e);
    }
  };

  if (loading) return <div>Loading files...</div>;

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <InputLabel htmlFor="file-upload" style={{ marginRight: 8 }}>
          Upload files:
        </InputLabel>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          className="underline border p-3"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>
      <FullFeaturedCrudGrid row={rows} onDelete={handleDelete} />
    </div>
  );
}
