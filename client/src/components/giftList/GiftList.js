import React from "react";
import Search from "../search/Search";
import LinkIcon from "../icons/link";
import DollarIcon from "../icons/dollar";
import { Link } from "react-router-dom";

function GiftList({ gifts }) {
  return (
    <div className="max-w-sm rounde-lg shadow-md overflow-hidden p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Gift list</h2>
      <Search />
      <Link className="flex p-4 rounded-lg overflow-hidden shadow-md" to="/gifts/id">
        <div className="w-2/5 h-24 overflow-hidden rounded-xl mr-2">
          <img
            className="w-full max-h-full object-cover"
            src="https://i.pravatar.cc/400"
            alt="event thumb"
          />
        </div>
        <div className="w-3/5 flex flex-col space-y-1">
          <h3 className="font-bold text-purple-600 text-xl">Nike</h3>
          <div className="flex space-x-2 items-center">
            <LinkIcon size="w-5 h-5" color="text-purple-600" />
            <span className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              https://amazon.com/asdadasdasdas/dasdadsad/asda
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <DollarIcon color="text-purple-600" size="w-5 h-5" />
            <span className="text-gray-500 overflow-ellipsis overflow-hidden whitespace-nowrap">
              600
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GiftList;
