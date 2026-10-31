import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c5c47",
          color: "#f7f4ef",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        KG
      </div>
    ),
    { ...size },
  );
}
