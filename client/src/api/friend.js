import { request } from "../utils/request";

export function friend(base) {
  return {
    getAll: async () => await request(`${base}/friends`),
    getFriendsEvents: async () => await request(`${base}/friend_events`),
    getFriendEvent: async (id) => await request(`${base}/friend_events/${id}`),
    getSuggestedFriends: async () => await request(`${base}/friends/suggested?per_page=10`),
    getIncomingRequests: async () => await request(`${base}/friend_requests?per_page=5`),
    getOutgoingRequests: async () => await request(`${base}/friend_requests/mine?per_page=5`),
  };
}
