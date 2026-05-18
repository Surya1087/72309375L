const API_BASE = "http://4.224.186.213/evaluation-service";

export async function logEvent(stack, level, pkg, message) {
  try {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
  } catch (e) {
    console.log("Log:", message);
  }
}