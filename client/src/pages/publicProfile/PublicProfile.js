import React from "react";
import api from "../../api";
import ProfileIcon from "../../components/icons/profile";
import VerticalDotsIcon from "../../components/icons/dots-vertical";
import CheckIcon from "../../components/icons/check";
import { Link } from "react-router-dom";
import { DEFAULT_GIFT_THUMB_URL } from "../../data/static";
import { useAsync } from "../../hooks/useAsync";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function PublicProfile() {
  const { user_id } = useParams();
  const { run, data } = useAsync();

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        await run(api.profile.getOne(user_id));
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getProfile();
  }, [user_id, run]);

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="max-w-full overflow-hidden rounded-xl">
        <img
          className="h-72 object-cover w-full"
          src={data?.user.cover.url || DEFAULT_GIFT_THUMB_URL}
          alt="profile cover"
        />
      </div>
      <div className="flex flex-col px-4">
        <div className="flex justify-between items-center -mt-16">
          <div className="w-32 min-w-min rounded-full overflow-hidden border-4 border-purple-600">
            <img
              className="h-32 min-w-min object-cover w-full"
              src={data?.user.avatar.thumb.url}
              alt="friend thumb"
            />
          </div>
          <div className="flex space-x-2 mt-20">
            <button className="btn-outlined py-2 px-4">Send message</button>
            <button className="btn-outlined py-2 px-4 flex">
              <ProfileIcon size="w-5 h-5" color="text-purple-600" />
              {data?.user.is_friend ? <CheckIcon size="w-5 h-5" color="text-purple-600" /> : null}
            </button>
            <button className="btn-outlined py-2 px-4">
              <VerticalDotsIcon size="w-5 h-5" color="text-purple-600" />
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <h3 className="font-bold text-gray-900">
            {data?.user.first_name} {data?.user.last_name}
          </h3>
          <span className="text-gray-500 text-sm">{data?.user.bio}</span>
          <div className="flex space-x-5">
            <div className="flex space-x-1 items-center mt-2">
              <Link className="font-bold text-gray-900">{data?.user.friends_count}</Link>
              <span className="text-gray-500">friends</span>
            </div>
            <div className="flex space-x-1 items-center mt-2">
              <Link className="font-bold text-gray-900">{data?.user.events_count}</Link>
              <span className="text-gray-500">events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
