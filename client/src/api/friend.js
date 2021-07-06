import { request } from "../utils/request";

export function friend(base) {
  return {
    getAll: async () => await request(`${base}/friends`),
    getFriendsEvents: async () => await request(`${base}/friend_events`),
  };
}
