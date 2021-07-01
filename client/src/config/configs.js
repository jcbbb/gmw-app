import Homepage from "../pages/home/Home";

export const routes = {
  private: [
    {
      path: "/",
      component: Homepage,
      exact: true,
    },
  ],
  public: [
    {
      path: "/",
      component: Homepage,
      exact: true,
    },
  ],
};
