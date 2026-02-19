import { STATUSES, STATUS_META } from "./constants.js";

export function StatusPipeline({ status }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 12 }}>
      {STATUSES.map((s, i) => {
        const active = STATUSES.indexOf(status) >= i;
        const m = STATUS_META[s];
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: active ? m.color : "#1a1a1a",
                border: `2px solid ${active ? m.color : "#333"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, transition: "all 0.3s",
                boxShadow: active ? `0 0 12px ${m.color}60` : "none",
              }}>
                {active ? m.icon : ""}
              </div>
              <span style={{
                fontSize: 9, color: active ? m.color : "#555", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "monospace",
              }}>
                {m.label}
              </span>
            </div>
            {i < 2 && (
              <div style={{
                flex: 1, height: 2,
                background: STATUSES.indexOf(status) > i ? m.color : "#222",
                margin: "0 4px", marginBottom: 20, transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
