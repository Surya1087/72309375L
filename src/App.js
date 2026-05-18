import { useState } from "react";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityPage } from "./pages/PriorityPage";

function App() {
  const [page, setPage] = useState("all");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0 0 20px 0" }}>📚 Campus Notifications</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={() => setPage("all")} style={{
            padding: "10px 20px",
            background: page === "all" ? "white" : "rgba(255,255,255,0.2)",
            color: page === "all" ? "#667eea" : "white",
            border: "2px solid white",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>All Notifications</button>
          <button onClick={() => setPage("priority")} style={{
            padding: "10px 20px",
            background: page === "priority" ? "white" : "rgba(255,255,255,0.2)",
            color: page === "priority" ? "#667eea" : "white",
            border: "2px solid white",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>Priority Inbox</button>
        </div>
      </header>
      <main style={{ flex: 1, background: "#f5f5f5" }}>
        {page === "all" ? <NotificationsPage /> : <PriorityPage />}
      </main>
    </div>
  );
}

export default App;