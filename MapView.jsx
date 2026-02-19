import { STATUSES, STATUS_META } from "./constants.js";
import { MapDot } from "./MapDot.jsx";
import { StatusPipeline } from "./StatusPipeline.jsx";
import { timeAgo } from "./utils.js";

export function MapView({ issues, selected, onSelect, onAdvance }) {
  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      {/* Grid background simulating a street map */}
      <div style={{
        position: "absolute", inset: 0, background: "#0a0a0a",
        backgroundImage: `
          linear-gradient(#111 1px, transparent 1px),
          linear-gradient(90deg, #111 1px, transparent 1px),
          linear-gradient(#0d0d0d 1px, transparent 1px),
          linear-gradient(90deg, #0d0d0d 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
      }}>
        {/* Horizontal roads */}
        <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: 18, background: "#131313", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }} />
        <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: 28, background: "#131313", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }} />
        {/* Vertical roads */}
        <div style={{ position: "absolute", left: "20%", top: 0, bottom: 0, width: 18, background: "#131313", borderLeft: "1px solid #1a1a1a", borderRight: "1px solid #1a1a1a" }} />
        <div style={{ position: "absolute", left: "55%", top: 0, bottom: 0, width: 28, background: "#131313", borderLeft: "1px solid #1a1a1a", borderRight: "1px solid #1a1a1a" }} />
        <div style={{ position: "absolute", left: "80%", top: 0, bottom: 0, width: 12, background: "#131313", borderLeft: "1px solid #1a1a1a", borderRight: "1px solid #1a1a1a" }} />

        {/* Issue dots */}
        {issues.map(issue => (
          <MapDot key={issue.id} issue={issue} onClick={onSelect} selected={selected?.id === issue.id} />
        ))}

        {/* Legend */}
        <div style={{ position: "absolute", bottom: 16, left: 16, background: "#111", border: "1px solid #1e1e1e", borderRadius: 6, padding: "10px 14px" }}>
          <div style={{ color: "#444", fontSize: 9, letterSpacing: "0.12em", marginBottom: 8 }}>STATUS LEGEND</div>
          {STATUSES.map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: STATUS_META[s].color, boxShadow: `0 0 6px ${STATUS_META[s].color}` }} />
              <span style={{ color: "#666", fontSize: 10, fontFamily: "monospace" }}>{STATUS_META[s].label}</span>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", top: 16, right: 16, color: "#222", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em" }}>
          LIVE MAP VIEW
        </div>
      </div>

      {/* Selected issue detail overlay */}
      {selected && (
        <div style={{
          position: "absolute", bottom: 16, right: 16, width: 300,
          background: "#0e0e0e", border: `1px solid ${STATUS_META[selected.status].color}40`,
          borderLeft: `3px solid ${STATUS_META[selected.status].color}`,
          borderRadius: 8, padding: 18,
          boxShadow: `0 8px 40px #000, 0 0 30px ${STATUS_META[selected.status].color}15`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ color: "#555", fontSize: 10, marginBottom: 2, fontFamily: "monospace" }}>
                #{String(selected.id).padStart(4, "0")} · {timeAgo(selected.created)}
              </div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{selected.type}</div>
              <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{selected.address}</div>
            </div>
            <button onClick={() => onSelect(null)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>

          {selected.description && (
            <div style={{ color: "#666", fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>{selected.description}</div>
          )}
          {selected.image && (
            <img src={selected.image} style={{ width: "100%", borderRadius: 4, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />
          )}

          <StatusPipeline status={selected.status} />

          {selected.status !== "fixed" && (
            <button
              onClick={() => onAdvance(selected.id)}
              style={{
                marginTop: 12, width: "100%",
                background: `${STATUS_META[selected.status].color}20`,
                color: STATUS_META[selected.status].color,
                border: `1px solid ${STATUS_META[selected.status].color}40`,
                borderRadius: 5, padding: "8px", fontSize: 11, cursor: "pointer",
                fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em",
              }}
            >
              ADVANCE STATUS →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
