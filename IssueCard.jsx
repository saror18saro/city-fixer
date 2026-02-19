import { STATUS_META } from "./constants.js";
import { StatusBadge } from "./StatusBadge.jsx";
import { timeAgo } from "./utils.js";

export function IssueCard({ issue, onSelect, onAdvance, selected }) {
  const m = STATUS_META[issue.status];
  return (
    <div
      onClick={() => onSelect(issue)}
      style={{
        background: selected ? "#161616" : "#0e0e0e",
        border: `1px solid ${selected ? m.color + "80" : "#1e1e1e"}`,
        borderLeft: `3px solid ${m.color}`,
        borderRadius: 6, padding: "14px 16px", cursor: "pointer",
        transition: "all 0.2s", marginBottom: 8,
        boxShadow: selected ? `0 0 20px ${m.color}20` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
              #{String(issue.id).padStart(4, "0")}
            </span>
            <span style={{ color: m.color, fontSize: 12, fontWeight: 600, background: m.bg, padding: "1px 8px", borderRadius: 3 }}>
              {issue.type}
            </span>
          </div>
          <div style={{ color: "#aaa", fontSize: 12, marginBottom: 3 }}>{issue.address}</div>
          <div style={{ color: "#555", fontSize: 11, fontFamily: "monospace" }}>{timeAgo(issue.created)}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <StatusBadge status={issue.status} />
          {issue.status !== "fixed" && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdvance(issue.id); }}
              style={{
                background: "transparent", border: `1px solid ${m.color}60`, color: m.color,
                borderRadius: 4, padding: "3px 10px", fontSize: 10, cursor: "pointer",
                fontFamily: "monospace", letterSpacing: "0.05em", fontWeight: 700, transition: "all 0.2s",
              }}
            >
              ADVANCE →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
