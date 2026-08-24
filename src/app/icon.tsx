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
          backgroundColor: content.theme.lightOakWood,
          borderRadius: "50%",
          border: `2px solid ${content.theme.oatMilk}`,
        }}
      >
        {/* Zen Singing Bowl Resonance Dot Icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={content.theme.oatMilk}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill={content.theme.oatMilk} />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
