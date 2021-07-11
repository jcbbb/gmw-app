import { request } from "../utils/request";

export function card(base) {
  return {
    getAll: async () => await request(`${base}/customer_cards_list`),
  };
}
