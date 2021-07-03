import React from "react";
import Login from "../components/login/Login";
import EventEdit from "../components/eventEdit/EventEdit";
import Confirmation from "../components/confirmation/Confirmation";
import NewEvent from "../components/newEvent/NewEvent";

const componentMapping = {
  login: () => <Login />,
  eventEdit: (props) => <EventEdit {...props} />,
  confirmation: (props) => <Confirmation {...props} />,
  newEvent: () => <NewEvent />,
};

export default componentMapping;
