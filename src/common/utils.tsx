type dimensions = "width" | "original";

export default function createImageURL(
  path: string,
  width: number,
  type: dimensions = "width"
) {
  return type === "width"
    ? `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`
    : `${import.meta.env.VITE_BASE_IMAGE_URI}/${type}/${path}`;
}
