"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#0d2a4f",
    primaryTextColor: "#fffdf7",
    primaryBorderColor: "#1e3f6e",
    lineColor: "#2ca58d",
    secondaryColor: "#122d52",
    tertiaryColor: "#163660",
    background: "#0a2342",
    mainBkg: "#0d2a4f",
    nodeBorder: "#1e3f6e",
    clusterBkg: "#122d52",
    titleColor: "#fffdf7",
    edgeLabelBackground: "#0d2a4f",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 60,
  },
  securityLevel: "loose",
});

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [minHeight, setMinHeight] = useState(200);

  useEffect(() => {
    if (!containerRef.current) return;

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    mermaid
      .render(id, chart.trim())
      .then(({ svg }) => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svg;

        const svgEl = containerRef.current.querySelector("svg");
        if (svgEl) {
          const viewBox = svgEl.getAttribute("viewBox");
          if (viewBox) {
            const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
            const containerWidth = containerRef.current.clientWidth || 700;
            const ratio = vbHeight / vbWidth;
            const computed = Math.round(containerWidth * ratio);
            const finalHeight = Math.min(Math.max(computed, 200), 900);
            setMinHeight(finalHeight);
            // SVG에 직접 높이 지정해서 비율 유지
            svgEl.style.width = "auto";
            svgEl.style.height = `${finalHeight}px`;
            svgEl.style.display = "block";
            svgEl.style.margin = "0 auto";
          } else {
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";
          }
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
        }

        setIsRendered(true);
      })
      .catch((err) => {
        console.error("Mermaid render error:", err);
        setError("다이어그램 렌더링에 실패했습니다.");
      });
  }, [chart]);

  if (error) {
    return (
      <pre className="p-4 text-sm overflow-x-auto text-muted-foreground">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      className="w-full flex justify-center p-4"
      style={{
        height: `${minHeight}px`,
        opacity: isRendered ? 1 : 0,
        transition: "opacity 0.2s",
      }}
      aria-label="아키텍처 다이어그램"
    >
      <div ref={containerRef} className="h-full" />
    </div>
  );
}
