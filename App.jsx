import { useState } from "react";
import { STATUSES, STATUS_META, SEED_ISSUES } from "./constants.js";
import { IssueCard } from "./IssueCard.jsx";
import { MapView } from "./MapView.jsx";
import { ReportModal } from "./ReportModal.jsx";

export default function App() {
  const [issues, setIssues]     = useState(SEED_ISSUES);
  const [selected, setSelected] = useState(null);
  const [view, setView]         = useState("split"); // "split" | "map" | "list"
  const [filter, setFilter]     = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [nextId, setNextId]     = useState(6);

  const filtered = filter === "all" ? issues : issues.filter(i => i.status === filter);

  const advance = (id) => {
    setIssues(prev => prev.map(i => {
      if (i.id !== id) return i;
      const idx = STATUSES.indexOf(i.status);
      return { ...i, status: STATUSES[Math.min(idx + 1, 2)] };
    }));
  };

  const addIssue = (data) => {
    const newIssue = { ...data, id: nextId, status: "reported", created: Date.now() };
    setIssues(prev => [newIssue, ...prev]);
    setNextId(n => n + 1);
    setShowModal(false);
    setSelected(newIssue);
  };

  const stats = {
    reported: issues.filter(i => i.status === "reported").length,
    assigned: issues.filter(i => i.status === "assigned").length,
    fixed:    issues.filter(i => i.status === "fixed").length,
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Mono', monospace", color: "#fff" }}>
      {/* ── Top bar ── */}
      <div style={{
        borderBottom: "1px solid #1a1a1a", padding: "0 24px", background: "#070707",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 56,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#FF4D00", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚠</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", color: "#fff" }}>ROADWATCH</div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.12em" }}>LIVE ISSUE TRACKER</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 0, marginLeft: 20, borderLeft: "1px solid #1a1a1a", paddingLeft: 20 }}>
            {Object.entries(stats).map(([s, n]) => (
              <div key={s} style={{ padding: "0 14px", borderRight: "1px solid #1a1a1a", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: STATUS_META[s].color }}>{n}</div>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* View toggle */}
          <div style={{ display: "flex", background: "#111", border: "1px solid #1e1e1e", borderRadius: 5, overflow: "hidden" }}>
            {["split", "map", "list"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? "#1e1e1e" : "transparent",
                color: view === v ? "#fff" : "#555",
                border: "none", padding: "6px 12px", cursor: "pointer",
                fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em",
                fontWeight: 700, textTransform: "uppercase",
              }}>{v}</button>
            ))}
          </div>

          <button onClick={() => setShowModal(true)} style={{
            background: "#FF4D00", color: "#fff", border: "none", borderRadius: 5,
            padding: "8px 16px", cursor: "pointer", fontWeight: 800, fontSize: 12,
            letterSpacing: "0.06em", fontFamily: "monospace",
          }}>
            + REPORT ISSUE
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div style={{ borderBottom: "1px solid #111", padding: "10px 24px", display: "flex", gap: 6 }}>
        {["all", "reported", "assigned", "fixed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? (f === "all" ? "#1e1e1e" : STATUS_META[f]?.bg) : "transparent",
            color:      filter === f ? (f === "all" ? "#fff"    : STATUS_META[f]?.color) : "#444",
            border: `1px solid ${filter === f ? (f === "all" ? "#333" : STATUS_META[f]?.color + "40") : "transparent"}`,
            borderRadius: 4, padding: "4px 12px", cursor: "pointer",
            fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
            fontWeight: 700, textTransform: "uppercase",
          }}>
            {f === "all" ? `ALL (${issues.length})` : `${f} (${stats[f] ?? 0})`}
          </button>
        ))}
      </div>

      {/* ── Main content ── */}
      <div style={{ display: "flex", height: "calc(100vh - 105px)" }}>
        {/* List panel */}
        {(view === "list" || view === "split") && (
          <div style={{ width: view === "split" ? 400 : "100%", borderRight: "1px solid #111", overflowY: "auto", padding: 16 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", color: "#333", padding: 40, fontFamily: "monospace" }}>No issues found</div>
            )}
            {filtered.map(issue => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onSelect={setSelected}
                onAdvance={advance}
                selected={selected?.id === issue.id}
              />
            ))}
          </div>
        )}

        {/* Map panel */}
        {(view === "map" || view === "split") && (
          <MapView
            issues={filter === "all" ? issues : filtered}
            selected={selected}
            onSelect={setSelected}
            onAdvance={advance}
          />
        )}
      </div>

      {showModal && <ReportModal onClose={() => setShowModal(false)} onSubmit={addIssue} />}
    </div>
  );
}
