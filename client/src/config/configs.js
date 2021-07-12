import Homepage from "../pages/home/Home";
import MyEvents from "../pages/myEvents/MyEvents";
import EventDetails from "../pages/eventDetails/EventDetails";
import FriendsEvents from "../pages/friendsEvents/FriendsEvents";
import GiftDetails from "../components/giftDetails/GiftDetails";
import Friends from "../pages/friends/Friends";
import PublicProfile from "../pages/publicProfile/PublicProfile";
import Profile from "../pages/profile/Profile";
import ProfileGeneral from "../components/profileGeneral/ProfileGeneral";
import ProfileCards from "../components/profileCards/ProfileCards";
import ProfileShipping from "../components/shipping/Shipping";
import ProfileContributions from "../components/profileContributions/ProfileContributions";
import ProfilePayments from "../components/profilePayments/ProfilePayments";

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
    {
      path: "/profile",
      component: Profile,
      routes: [
        {
          path: "/profile/general",
          component: ProfileGeneral,
        },
        {
          path: "/profile/cards",
          component: ProfileCards,
        },
        {
          path: "/profile/shipping",
          component: ProfileShipping,
        },
        {
          path: "/profile/contributions",
          component: ProfileContributions,
        },
        {
          path: "/profile/payments",
          component: ProfilePayments,
        },
      ],
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
