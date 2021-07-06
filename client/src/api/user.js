import { request } from "../utils/request";

export function user(base) {
  return {
    login: async (username, password) =>
      await request(`${base}/username_login`, {
        body: { username, password },
      }),
    checkAuth: async () => await request(`${base}/session_user`),
  };
}
