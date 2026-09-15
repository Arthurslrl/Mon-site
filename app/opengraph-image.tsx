import { ImageResponse } from "next/og";

export const alt = "Pizzeria Loulou — Pizza artisanale au four à bois à Valras-Plage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px",
          backgroundColor: "#12060100",
          backgroundImage:
            "linear-gradient(135deg, #1C0A00 0%, #2A0F02 55%, #1C0A00 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 4, background: "#C8960C", display: "flex" }} />
          <span
            style={{
              color: "#C8960C",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Valras-Plage · Hérault · Depuis 1985
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#FDF6EC", fontSize: 132, fontWeight: 700, lineHeight: 0.95 }}>
            Pizzeria
          </span>
          <span style={{ color: "#D3401D", fontSize: 132, fontWeight: 700, fontStyle: "italic", lineHeight: 0.95 }}>
            Loulou
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ color: "rgba(253,246,236,0.75)", fontSize: 28, fontFamily: "Arial, sans-serif" }}>
            Four à bois · Pâtes maison · Ingrédients frais
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
