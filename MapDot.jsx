import { useState } from "react";
import { STATUS_META } from "./constants.js";

const MIN_LAT = 40.704, MAX_LAT = 40.720;
const MIN_LNG = -74.013, MAX_LNG = -73.999;

export function MapDot({ issue, onClick, selected }) {
  const [hov, setHov] = useState(false);
  const m = STATUS_META[issue.status];

  const x = ((issue.lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100;
  const y = (1 - (issue.lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;

  return (
    <div
      onClick={() => onClick(issue)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        transform: "translate(-50%,-50%)", cursor: "pointer",
        zIndex: selected || hov ? 10 : 1,
      }}
    >
      <div style={{
        width: selected ? 22 : 16, height: selected ? 22 : 16,
        borderRadius: "50%", background: m.color,
        border: `2px solid ${selected ? "#fff" : m.color}`,
        boxShadow: `0 0 ${selected ? 20 : 8}px ${m.color}`,
        transition: "all 0.2s", position: "relative",
      }}>
        {issue.severity === "high" && (
          <div style={{
            position: "absolute", top: -2, right: -2,
            width: 7, height: 7, borderRadius: "50%",
            background: "#FF4D00", border: "1px solid #000",
          }} />
        )}
      </div>

      {(hov || selected) && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
          transform: "translateX(-50%)", background: "#111",
          border: `1px solid ${m.color}40`, borderRadius: 5,
          padding: "6px 10px", whiteSpace: "nowrap", color: "#fff",
          fontSize: 11, pointerEvents: "none", boxShadow: "0 4px 20px #000",
        }}>
          <div style={{ fontWeight: 700, color: m.color }}>{issue.type}</div>
          <div style={{ color: "#aaa", fontSize: 10 }}>{issue.address}</div>
        </div>
      )}
    </div>
  );
}
