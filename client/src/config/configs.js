import Homepage from "../pages/home/Home";
import MyEvents from "../pages/myEvents/MyEvents";
import EventDetails from "../pages/eventDetails/EventDetails";
import FriendsEvents from "../pages/friendsEvents/FriendsEvents";
import GiftDetails from "../components/giftDetails/GiftDetails";

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
  ],
  public: [
    {
      path: "/",
      component: Homepage,
      exact: true,
    },
  ],
};
