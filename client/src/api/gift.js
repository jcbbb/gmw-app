import { request } from "../utils/request";

export function gift(base) {
  return {
    deleteOne: async (id) => await request(`${base}/${id}`, { method: "DELETE" }),
  };
}
