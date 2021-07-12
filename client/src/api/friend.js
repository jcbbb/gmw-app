import { request } from "../utils/request";

export function friend(base) {
  return {
    getAll: async () => await request(`${base}/friends`),
    getFriendsEvents: async () => await request(`${base}/friend_events`),
    getFriendEvent: async (id) => await request(`${base}/friend_events/${id}`),
    getSuggestedFriends: async () => await request(`${base}/friends/suggested?per_page=10`),
    getIncomingRequests: async () => await request(`${base}/friend_requests?per_page=5`),
    getOutgoingRequests: async () => await request(`${base}/friend_requests/mine?per_page=5`),
    acceptFriendRequest: async (id) =>
      await request(`${base}/friend_requests/${id}`, { method: "PUT" }),
    createFriendRequest: async (id) =>
      await request(`${base}/friend_requests`, {
        body: {
          friend_request: {
            friend_id: id,
          },
        },
      }),
    deleteFriendRequest: async (id) =>
      await request(`${base}/friend_requests/${id}/destroy_mine`, {
        method: "DELETE",
      }),
    declineFriendRequest: async (id) =>
      await request(`${base}/friend_requests/${id}`, { method: "DELETE" }),
    deleteFriend: async (id) => await request(`${base}/friends/${id}`, { method: "DELETE" }),
  };
}
