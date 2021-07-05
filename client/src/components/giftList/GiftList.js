import React from "react";
import Search from "../search/Search";
import LinkIcon from "../icons/link";
import DollarIcon from "../icons/dollar";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

function GiftList({ match, event }) {
  const [query, setQuery] = React.useState("");

  const onChange = React.useCallback(
    (value) => {
      setQuery(value);
    },
    [setQuery]
  );

  const results = React.useMemo(() => {
    return event?.gifts.filter((gift) => {
      return gift.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, event]);

  return (
    <div className="max-w-sm w-full rounde-lg shadow-md overflow-hidden p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-900 text-center">Gift list</h2>
      <Search onChange={onChange} placeholder="Search gifts" />
      {results?.map((gift, index) => (
        <NavLink
          className="flex p-4 rounded-lg overflow-hidden shadow-md"
          key={index}
          to={`${match.url}/gifts/${gift.id}`}
          activeClassName="bg-gray-50"
        >
          <div className="w-2/5 h-24 overflow-hidden rounded-xl mr-2">
            <img
              className="w-full max-h-full object-cover"
              src={gift.photo.url}
              alt="event thumb"
            />
          </div>
          <div className="w-3/5 flex flex-col space-y-1">
            <h3 className="font-bold text-purple-600 text-xl">{gift.name}</h3>
            <div className="flex space-x-2 items-center">
              <LinkIcon size="w-5 h-5" color="text-purple-600" />
              <span className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {gift.link}
              </span>
            </div>
            <div className="flex space-x-2 items-center">
              <DollarIcon color="text-purple-600" size="w-5 h-5" />
              <span className="text-gray-500 overflow-ellipsis overflow-hidden whitespace-nowrap">
                {gift.price}
              </span>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default withRouter(GiftList);
