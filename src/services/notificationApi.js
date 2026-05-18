import { mockNotifications } from "../mockData";

export function fetchNotifications(limit = 10, page = 1, type = null) {
  let data = [...mockNotifications];
  if (type) data = data.filter(n => n.Type === type);
  const start = (page - 1) * limit;
  return data.slice(start, start + limit);
}

export function getPriorityNotifications(data) {
  const weight = { "Placement": 3, "Result": 2, "Event": 1 };
  return [...data].sort((a, b) => {
    const diff = (weight[b.Type] || 0) - (weight[a.Type] || 0);
    return diff !== 0 ? diff : new Date(b.Timestamp) - new Date(a.Timestamp);
  }).slice(0, 10);
}