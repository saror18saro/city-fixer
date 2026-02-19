export const STATUSES = ["reported", "assigned", "fixed"];

export const STATUS_META = {
  reported: { label: "Reported", color: "#FF4D00", bg: "#FF4D0020", icon: "⚠" },
  assigned: { label: "Assigned", color: "#FFB800", bg: "#FFB80020", icon: "🔧" },
  fixed:    { label: "Fixed",    color: "#00C48C", bg: "#00C48C20", icon: "✓" },
};

export const ISSUE_TYPES = [
  "Pothole", "Crack", "Flooding", "Debris",
  "Broken Light", "Damaged Sign", "Other",
];

export const SEED_ISSUES = [
  { id: 1, type: "Pothole",       address: "Main St & Oak Ave",      description: "Large pothole causing damage to vehicles",          status: "fixed",    lat: 40.712, lng: -74.006, created: Date.now() - 86400000 * 5, image: null, severity: "high"   },
  { id: 2, type: "Flooding",      address: "River Rd near Bridge",   description: "Water pooling after rain, dangerous conditions",    status: "assigned", lat: 40.715, lng: -74.009, created: Date.now() - 86400000 * 2, image: null, severity: "high"   },
  { id: 3, type: "Crack",         address: "Park Blvd 200 block",    description: "Multiple cracks spreading across lane",             status: "reported", lat: 40.709, lng: -74.003, created: Date.now() - 86400000,     image: null, severity: "medium" },
  { id: 4, type: "Broken Light",  address: "5th Ave & 12th St",      description: "Traffic light not functioning since Tuesday",       status: "assigned", lat: 40.718, lng: -74.011, created: Date.now() - 86400000 * 3, image: null, severity: "high"   },
  { id: 5, type: "Debris",        address: "Highway Ramp East",      description: "Large debris blocking right lane",                  status: "reported", lat: 40.706, lng: -74.001, created: Date.now() - 3600000 * 4,  image: null, severity: "low"    },
];

// Shared styles
export const lbl = {
  display: "block", color: "#555", fontSize: 10, fontFamily: "monospace",
  letterSpacing: "0.1em", fontWeight: 700, marginBottom: 5, textTransform: "uppercase",
};

export const inp = {
  width: "100%", background: "#111", border: "1px solid #222", borderRadius: 5,
  padding: "9px 12px", color: "#ddd", fontSize: 13, outline: "none",
  boxSizing: "border-box", fontFamily: "'DM Mono', monospace",
};
