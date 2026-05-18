import { useState, useEffect } from "react";
import { fetchNotifications } from "../services/notificationApi";
import { NotificationCard } from "../components/NotificationCard";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState(new Set());
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(null);

  useEffect(() => {
    setNotifications(fetchNotifications(limit, page, type));
  }, [limit, page, type]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>All Notifications</h2>
      
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }} style={{ padding: "8px" }}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        
        <div style={{ display: "flex", gap: "10px" }}>
          {["Event", "Result", "Placement"].map(t => (
            <button key={t} onClick={() => { setType(type === t ? null : t); setPage(1); }} style={{
              padding: "8px 16px",
              background: type === t ? "#2196F3" : "white",
              color: type === t ? "white" : "#333",
              border: "2px solid #2196F3",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        {notifications.map(notif => (
          <NotificationCard key={notif.ID} notification={notif} isRead={read.has(notif.ID)} onMarkAsRead={(id) => setRead(new Set([...read, id]))} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ padding: "8px 16px", cursor: page === 1 ? "not-allowed" : "pointer" }}>← Prev</button>
        <span style={{ padding: "8px 16px" }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)} style={{ padding: "8px 16px", cursor: "pointer" }}>Next →</button>
      </div>
    </div>
  );
}