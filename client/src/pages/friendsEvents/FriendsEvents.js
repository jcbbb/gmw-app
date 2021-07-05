import React from "react";
import FriendsList from "../../components/friendsList/FriendsList";
import FriendsEventsList from "../../components/friendsEventsList/FriendsEventsList";
import { withRouter, Route } from "react-router-dom";

function FriendsEvents({ match }) {
  return (
    <div className="flex max-w-7xl mx-auto justify-between space-x-4 items-start">
      <FriendsList />
      <Route path={`${match.url}/:friend_id`}>
        <FriendsEventsList />
      </Route>
    </div>
  );
}

export default withRouter(FriendsEvents);
