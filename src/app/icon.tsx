import { ImageResponse } from "next/og";
import { content } from "@/data/content";

export const size = {
  width: 48,
  height: 48,
};
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
          backgroundColor: content.theme.oak,
          borderRadius: "50%",
          border: `2px solid ${content.theme.background}`,
        }}
      >
        {/* 4-Pointed Sparkle Star Motif */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={content.theme.background}
        >
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
