import Homepage from "../pages/home/Home";
import MyEvents from "../pages/myEvents/MyEvents";
import EventDetails from "../pages/eventDetails/EventDetails";
import FriendsEvents from "../pages/friendsEvents/FriendsEvents";

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
    {
      path: "/friends-events",
      component: FriendsEvents,
    },
    {
      path: "/my-events/:event_id",
      component: EventDetails,
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
