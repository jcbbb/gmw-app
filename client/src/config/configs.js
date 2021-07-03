import Homepage from "../pages/home/Home";
import MyEvents from "../pages/myEvents/MyEvents";

export const routes = {
  private: [
    {
      path: "/",
      component: Homepage,
      exact: true,
    },
    {
      path: "/my-events",
      component: MyEvents,
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
