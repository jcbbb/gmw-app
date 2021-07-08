import React from "react";
import { Link } from "react-router-dom";

function FriendsList({ friends, suggested }) {
  return (
    <React.Fragment>
      {friends?.map((user, index) => (
        <div className="flex py-4 rounded-lg overflow-hidden items-center" key={index}>
          <div className="w-14 overflow-hidden rounded-full">
            <img
              className="h-18 object-contain w-full"
              src={suggested ? user.avatar.thumb.url : user.user.avatar.thumb.url}
              alt="friend thumb"
            />
          </div>
          <div className="ml-2">
            <Link to={`/users/${user.id}`}>
              <h3 className="font-bold text-gray-900 text-sm">
                {suggested
                  ? `${user.first_name} ${user.last_name}`
                  : `${user.user.first_name} ${user.user.last_name}`}
              </h3>
            </Link>
          </div>
          <button className="btn-outlined py-2 px-4 ml-auto">Follow</button>
        </div>
      ))}
    </React.Fragment>
  );
}

export default FriendsList;
