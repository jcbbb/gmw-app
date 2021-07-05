import { request } from "../utils/request";

export function friend(base) {
  return {
    getAll: async () => await request(`${base}/friends`),
    getFriendEvents: async (id) => await request(`${base}/friend_events/${id}`),
  };
}
