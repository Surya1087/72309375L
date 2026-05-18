export function NotificationCard({ notification, isRead, onMarkAsRead }) {
  const colors = { "Placement": "#4CAF50", "Result": "#FF9800", "Event": "#2196F3" };
  return (
    <div style={{
      display: "flex",
      gap: "12px",
      padding: "12px",
      margin: "8px 0",
      background: isRead ? "white" : "#f0f8ff",
      border: isRead ? "1px solid #ddd" : "2px solid #2196F3",
      borderRadius: "6px",
      cursor: "pointer"
    }} onClick={() => onMarkAsRead(notification.ID)}>
      <div style={{ background: colors[notification.Type], color: "white", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", whiteSpace: "nowrap" }}>
        {notification.Type}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 4px 0", color: "#333" }}>{notification.Message}</h4>
        <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>{notification.Timestamp}</p>
      </div>
      {!isRead && <span style={{ fontSize: "20px", color: "#2196F3" }}>●</span>}
    </div>
  );
}