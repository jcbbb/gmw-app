import { request } from "../utils/request";

export function event(base) {
  return {
    getUserEvents: async () => await request(base),
    deleteOne: async (id) => await request(`${base}/${id}`, { method: "DELETE" }),
    updateOne: async (id, update) => {
      return await request(`${base}/${id}`, { method: "PUT", body: { event: update } });
    },
    getOne: async (id) => await request(`${base}/${id}`),
  };
}
