import { request } from "../utils/request";

export function event(base) {
  return {
    getUserEvents: async () => await request(`${base}/events`),
    deleteEvent: async (id) => await request(`${base}/events/${id}`, { method: "DELETE" }),
  };
}
