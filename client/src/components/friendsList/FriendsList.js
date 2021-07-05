import React from "react";
import Search from "../../components/search/Search";
import api from "../../api";
import { NavLink, withRouter } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";

function FriendsList({ match }) {
  const [query, setQuery] = React.useState("");
  const { run, data } = useAsync();

  const onChange = React.useCallback(
    (value) => {
      setQuery(value);
    },
    [setQuery]
  );

  React.useEffect(() => {
    const getFriends = async () => {
      try {
        await run(api.friend.getAll());
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    getFriends();
  }, [run]);

  const results = React.useMemo(() => {
    return data?.users.filter(({ user }) => {
      const lastname = user.last_name.toLowerCase();
      const firstname = user.first_name.toLowerCase();
      return lastname.includes(query.toLowerCase()) || firstname.includes(query.toLowerCase());
    });
  }, [query, data]);

  return (
    <div className="max-w-sm w-full rounde-lg shadow-md overflow-hidden p-4 space-y-4 max-h-screen overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 text-center">Friends</h2>
      <Search onChange={onChange} placeholder="Search friends" />
      {results?.map(({ user }, index) => (
        <NavLink
          key={index}
          className="flex p-4 rounded-lg overflow-hidden shadow-md items-center"
          to={`${match.url}/${user.id}`}
        >
          <div className="w-1/5 min-w-min overflow-hidden rounded-xl mr-2">
            <img
              className="w-full max-h-full object-cover"
              src={user.avatar.thumb.url}
              alt="friend thumb"
            />
          </div>
          <div className="w-4/5 flex flex-col">
            <h3 className="font-bold text-purple-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-gray-600 text-sm">{user.events_count} events</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default withRouter(FriendsList);
