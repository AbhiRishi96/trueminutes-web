import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import { readFile, writeFile } from "node:fs/promises";

const icon = `data:image/png;base64,${(await readFile("public/brand/app-icon.png")).toString("base64")}`;
const response = new ImageResponse(
  h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "64px 80px",
        background: "#101017",
        color: "#fafafa",
        fontFamily: "sans-serif",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 48,
        },
      },
      h("img", {
        src: icon,
        width: 58,
        height: 58,
        style: { borderRadius: 14 },
      }),
      h(
        "span",
        { style: { fontSize: 32, fontWeight: 700, letterSpacing: -1 } },
        "TrueMinutes",
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 65,
          fontWeight: 700,
          letterSpacing: -3,
          lineHeight: 1.15,
        },
      },
      "Be in the meeting.",
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 65,
          fontWeight: 700,
          letterSpacing: -3,
          lineHeight: 1.15,
          color: "#c5b0f8",
        },
      },
      "Keep every next step.",
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 24,
          color: "#bfb3ce",
          marginTop: 28,
        },
      },
      "Meeting notes, decisions, and memory. On your Mac.",
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: 18,
          color: "#a9dbca",
          marginTop: 40,
        },
      },
      "Free for Mac   ·   Local-first   ·   No meeting bot",
    ),
  ),
  { width: 1200, height: 630 },
);
await writeFile(
  "public/brand/social-card.png",
  Buffer.from(await response.arrayBuffer()),
);
console.log("Generated 1200 × 630 social card with the official app icon.");
