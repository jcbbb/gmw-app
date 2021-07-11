import { request } from "../utils/request";

export function wallet(base) {
  return {
    getWallet: async () => await request(`${base}/wallets`),
  };
}
