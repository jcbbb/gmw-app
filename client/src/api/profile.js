import { request } from "../utils/request";

export function profile(base) {
  return {
    getOne: async (id) => await request(`${base}/${id}`),
    uploadAvatar: async (id, formData) =>
      await request(`${base}/${id}/avatar`, {
        body: formData,
        stringify: false,
      }),
    updateOne: async (id, update) =>
      await request(`${base}/${id}`, {
        body: { profile: update },
        method: "PATCH",
      }),
  };
}
