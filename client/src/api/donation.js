import { request } from "../utils/request";

export function donation(base) {
  return {
    getAll: async () => await request(base),
  };
}
