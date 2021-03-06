import { user } from "./user";
import { event } from "./event";
import { gift } from "./gift";
import { friend } from "./friend";
import { profile } from "./profile";
import { social } from "./social";
import { wallet } from "./wallet";
import { card } from "./card";
import { donation } from "./donation";

const apiUrl = process.env.REACT_APP_API_URL;

export default (function api() {
  return {
    user: user(`${apiUrl}/users`),
    event: event(`${apiUrl}/events`),
    gift: gift(`${apiUrl}/gifts`),
    friend: friend(apiUrl),
    profile: profile(`${apiUrl}/profiles`),
    social: social(`${apiUrl}/providers`),
    wallet: wallet(apiUrl),
    card: card(`${apiUrl}/stripe_cards`),
    donation: donation(`${apiUrl}/donations`),
  };
})();
