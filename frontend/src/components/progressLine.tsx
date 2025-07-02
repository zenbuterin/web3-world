import React, { useEffect, useState } from "react";
import { ProgressLineProps } from "@/types/progressLineTypes";

function ProgressLine({backgroundColor = "#e5e5e5", visualParts = [{ percentage: "0%", color: "white" }]}: ProgressLineProps) {
  const [widths, setWidths] = useState<string[]>(visualParts.map(() => "0%"));

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(visualParts.map((item) => item.percentage));
    });
  }, [visualParts]);

  return (
    <>
      <div
        className="w-full h-6 rounded overflow-hidden mt-4" style={{ backgroundColor }}>
        {visualParts.map((item, index) => (
          <div key={index} className="h-full float-left transition-width duration-1000 ease-in-out" style={{width: widths[index], backgroundColor: item.color}}/>
        ))}
      </div>
    </>
  );
}

export default ProgressLine;


