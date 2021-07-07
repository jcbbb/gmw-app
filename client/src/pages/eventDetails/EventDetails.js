import React from "react";
import GiftList from "../../components/giftList/GiftList";
import api from "../../api";
import NotFound from "../../components/404/404";
import PartyIcon from "../../components/icons/party";
import CommentIcon from "../../components/icons/comment";
import { useAsync } from "../../hooks/useAsync";
import { useParams, withRouter, Route } from "react-router-dom";
import { toast } from "react-toastify";

function EventDetails({ match, children, isFriend }) {
  const { run, isLoading, isIdle, data } = useAsync();
  const { event_id } = useParams();

  React.useEffect(() => {
    async function getOne() {
      try {
        await run(api.event.getOne(event_id));
      } catch (err) {
        toast(err.message, { type: "error" });
      }
    }

    getOne();
  }, [event_id, run]);

  const totalGifted = React.useMemo(() => {
    return data?.event.gifts?.reduce((acc, curr) => curr.total_fund + acc, 0);
  }, [data]);

  if (isLoading || isIdle) return null;

  if (data) {
    return (
      <div className="flex flex-col max-w-7xl mx-auto space-y-6 mt-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl text-purple-600">{data.event.title}</h1>
          <div className="flex space-x-4">
            {!isFriend ? (
              <div className="flex rounded-lg max-w-min bg-purple-50 overflow-hidden">
                <span className="py-3 px-7 whitespace-nowrap text-purple-600 font-bold">
                  Total gifted
                </span>
                <span className="block py-3 px-4 bg-purple-600 w-14 text-white font-bold">
                  ${totalGifted}
                </span>
              </div>
            ) : null}
            <div className="flex rounded-lg max-w-min border border-gray-100">
              <span className="py-3 px-7">{data.event?.total_likes_count}</span>
              <button className="py-3 px-4 bg-gray-100">
                <PartyIcon color="text-gray-500" />
              </button>
            </div>
            <div className="flex rounded-lg max-w-min border border-gray-100">
              <span className="py-3 px-7">{data.event?.total_comments_count}</span>
              <button className="py-3 px-4 bg-gray-100">
                <CommentIcon color="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-4 items-start">
          <GiftList event={data.event} />
          <Route path={`${match.url}/gifts/:gift_id`}>
            {React.cloneElement(children, { event: data.event, isFriend })}
          </Route>
        </div>
      </div>
    );
  }

  return <NotFound />;
}

export default withRouter(EventDetails);
