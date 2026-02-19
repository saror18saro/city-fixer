import { useState } from "react";
import { ISSUE_TYPES, lbl, inp } from "./constants.js";

export function ReportModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ type: "Pothole", address: "", description: "", severity: "medium" });
  const [imgPreview, setImgPreview] = useState(null);
  const [step, setStep] = useState(0); // 0: form, 1: success

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => setImgPreview(ev.target.result);
    r.readAsDataURL(f);
  };

  const handleSubmit = () => {
    if (!form.address.trim()) return;
    onSubmit({
      ...form,
      image: imgPreview,
      lat: 40.706 + Math.random() * 0.014,
      lng: -74.013 + Math.random() * 0.014,
    });
    setStep(1);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000cc", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }}>
      <div style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 10, width: 460, maxWidth: "95vw", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid #1a1a1a",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "repeating-linear-gradient(45deg, #111 0px, #111 10px, #0d0d0d 10px, #0d0d0d 20px)",
        }}>
          <div>
            <div style={{ color: "#FF4D00", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
              ROAD ISSUE REPORTING SYSTEM
            </div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
              FILE NEW REPORT
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "1px solid #333", color: "#666", width: 32, height: 32, borderRadius: 4, cursor: "pointer", fontSize: 16 }}
          >×</button>
        </div>

        {step === 0 ? (
          <div style={{ padding: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={lbl}>Issue Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inp}>
                  {ISSUE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Severity</label>
                <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} style={inp}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={lbl}>Location / Address *</label>
              <input
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Main St & Oak Ave"
                style={inp}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={lbl}>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue in detail..."
                rows={3}
                style={{ ...inp, resize: "none" }}
              />
            </div>

            {/* Image upload */}
            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>Photo Evidence</label>
              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: "2px dashed #2a2a2a", borderRadius: 6, padding: 20, cursor: "pointer",
                background: imgPreview ? "none" : "#050505", overflow: "hidden", minHeight: 100,
              }}>
                {imgPreview ? (
                  <img src={imgPreview} style={{ maxWidth: "100%", maxHeight: 160, borderRadius: 4, objectFit: "cover" }} />
                ) : (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
                    <div style={{ color: "#555", fontSize: 12, fontFamily: "monospace" }}>Click to upload image</div>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImg} style={{ display: "none" }} />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.address.trim()}
              style={{
                width: "100%", background: form.address.trim() ? "#FF4D00" : "#222",
                color: form.address.trim() ? "#fff" : "#444", border: "none",
                borderRadius: 6, padding: "13px", fontSize: 14, fontWeight: 800,
                cursor: form.address.trim() ? "pointer" : "not-allowed",
                letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace", transition: "all 0.2s",
              }}
            >
              SUBMIT REPORT
            </button>
          </div>
        ) : (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div style={{ color: "#00C48C", fontSize: 22, fontWeight: 800, fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
              REPORT SUBMITTED
            </div>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 24 }}>
              Your report has been filed and will be reviewed shortly.
            </div>
            <button
              onClick={onClose}
              style={{ background: "#00C48C20", color: "#00C48C", border: "1px solid #00C48C40", borderRadius: 6, padding: "10px 24px", cursor: "pointer", fontFamily: "monospace", fontWeight: 700 }}
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
