import Homepage from "../pages/home/Home";
import MyEvents from "../pages/myEvents/MyEvents";
import EventDetails from "../pages/eventDetails/EventDetails";
import FriendsEvents from "../pages/friendsEvents/FriendsEvents";
import GiftDetails from "../components/giftDetails/GiftDetails";
import Friends from "../pages/friends/Friends";
import PublicProfile from "../pages/publicProfile/PublicProfile";

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
      exact: true,
    },
    {
      path: "/my-events/:event_id",
      component: () => (
        <EventDetails isFriend={false}>
          <GiftDetails />
        </EventDetails>
      ),
    },
    {
      path: "/friends-events/:event_id",
      component: () => (
        <EventDetails isFriend={true}>
          <GiftDetails />
        </EventDetails>
      ),
    },
    {
      path: "/friends",
      component: Friends,
    },
    {
      path: "/users/:user_id",
      component: PublicProfile,
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
