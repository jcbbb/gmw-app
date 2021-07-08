import React from "react";
import { Link } from "react-router-dom";
import { diffInDays } from "../../utils/date-fns";
import { withRouter } from "react-router-dom";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";

function FriendEventCard({ event, match }) {
  const daysLeft = React.useMemo(() => {
    const days = diffInDays(event?.start_date, event?.end_date);
    if (days < 0) return "Expired";
    return `${days} days left`;
  }, [event]);

  const firstGiftId = React.useMemo(() => {
    if (event.gifts.length) return event.gifts[0].id;
    return "";
  }, [event]);

  return (
    <Link
      className="p-4 shadow-md rounded-lg"
      to={`${match.url}/${event?.id}/gifts/${firstGiftId}`}
    >
      <div className="max-w-full h-40 overflow-hidden rounded-xl">
        <img
          className="w-full max-h-full object-cover"
          src={event?.photo.url || DEFAULT_GIFT_THUMB_URL}
          alt="event thumb"
        />
      </div>
      <div className="flex mt-2 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            {event?.user.first_name} {event?.user.last_name}
          </span>
          <span className="text-gray-400 text-sm">{daysLeft}</span>
        </div>
        <h3 className="text-purple-600 font-bold text-lg">{event?.title}</h3>
      </div>
    </Link>
  );
}

export default withRouter(FriendEventCard);
