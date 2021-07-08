import { request } from "../utils/request";

export function profile(base) {
  return {
    getOne: async (id) => await request(`${base}/${id}`),
  };
}
