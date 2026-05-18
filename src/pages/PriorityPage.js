import { useState, useEffect } from "react";
import { fetchNotifications, getPriorityNotifications } from "../services/notificationApi";
import { NotificationCard } from "../components/NotificationCard";

export function PriorityPage() {
  const [priority, setPriority] = useState([]);
  const [read, setRead] = useState(new Set());
  const [type, setType] = useState(null);

  useEffect(() => {
    const data = fetchNotifications(100, 1, null);
    setPriority(getPriorityNotifications(data));
  }, []);

  const displayed = type ? priority.filter(n => n.Type === type) : priority;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>⭐ Priority Inbox (Top 10)</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>Sorted by: Placement → Result → Event</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        {["Event", "Result", "Placement"].map(t => (
          <button key={t} onClick={() => setType(type === t ? null : t)} style={{
            padding: "8px 16px",
            background: type === t ? "#FF9800" : "white",
            color: type === t ? "white" : "#333",
            border: "2px solid #FF9800",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
            {t}
          </button>
        ))}
      </div>

      <div>
        {displayed.map((notif, idx) => (
          <div key={notif.ID} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", color: "#FF9800", minWidth: "30px" }}>#{idx + 1}</span>
            <NotificationCard notification={notif} isRead={read.has(notif.ID)} onMarkAsRead={(id) => setRead(new Set([...read, id]))} />
          </div>
        ))}
      </div>
    </div>
  );
}