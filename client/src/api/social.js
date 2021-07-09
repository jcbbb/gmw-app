import { request } from "../utils/request";

export function social(base) {
  return {
    login: async (variant, token) =>
      await request(`${base}/login`, {
        body: { variant, token, platform_name: "android" },
      }),
  };
}
