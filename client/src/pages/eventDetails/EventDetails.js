import React from "react";
import GiftList from "../../components/giftList/GiftList";
import GiftDetails from "../../components/giftDetails/GiftDetails";
import api from "../../api";
import { useAsync } from "../../hooks/useAsync";
import { useParams, withRouter, Route } from "react-router-dom";
import { toast } from "react-toastify";

function EventDetails({ match }) {
  const { run, data } = useAsync();
  const { event_id } = useParams();

  React.useEffect(() => {
    async function getOne() {
      try {
        await run(api.event.getOne(event_id));
      } catch (err) {
        toast(err.message);
      }
    }

    getOne();
  }, [event_id, run]);

  return (
    <div className="flex max-w-7xl mx-auto justify-between space-x-4 items-start">
      <GiftList event={data?.event} />
      <Route path={`${match.url}/gifts/:gift_id`}>
        <GiftDetails event={data?.event} />
      </Route>
    </div>
  );
}

export default withRouter(EventDetails);
