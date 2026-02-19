import { STATUS_META } from "./constants.js";

export function StatusBadge({ status }) {
  const m = STATUS_META[status];
  return (
    <span style={{
      background: m.bg, color: m.color,
      border: `1px solid ${m.color}40`, borderRadius: 4,
      padding: "3px 10px", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace",
    }}>
      {m.icon} {m.label}
    </span>
  );
}
