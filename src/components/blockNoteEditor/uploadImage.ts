/**
 * Upload adapter for BlockNote image and file blocks.
 * Implement POST /api/uploads to store files (for example, in S3) and return
 * { url: string }. File bytes are sent as multipart form data, never as base64.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Image upload failed (${response.status}).`);
  }

  const result: unknown = await response.json();
  if (
    typeof result !== "object" ||
    result === null ||
    !("url" in result) ||
    typeof result.url !== "string" ||
    result.url.length === 0
  ) {
    throw new Error("Image upload endpoint must return a non-empty url.");
  }

  return result.url;
}
