import React from "react";
import Login from "../components/login/Login";
import EventEdit from "../components/eventEdit/EventEdit";
import Confirmation from "../components/confirmation/Confirmation";
import NewEvent from "../components/newEvent/NewEvent";
import GiftEdit from "../components/giftEdit/GiftEdit";
import Contribute from "../components/contribute/Contribute";

const componentMapping = {
  login: () => <Login />,
  eventEdit: (props) => <EventEdit {...props} />,
  confirmation: (props) => <Confirmation {...props} />,
  newEvent: () => <NewEvent />,
  giftEdit: (props) => <GiftEdit {...props} />,
  contribute: (props) => <Contribute {...props} />,
};

export default componentMapping;
