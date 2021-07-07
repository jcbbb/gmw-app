import React from "react";
import api from "../../api";
import Search from "../../components/search/Search";
import { Link } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

function Friends({ match }) {
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
    <div className="max-w-7xl mx-auto flex justify-between items-baseline space-x-4 p-4 mt-12">
      <div className="max-w-sm shadow-md flex-1 rounded-lg py-4">
        <h2 className="text-lg font-bold text-gray-900 text-center">Suggested friends</h2>
      </div>
      <div className="max-w-lg flex-1 space-y-4">
        <Search onChange={onChange} placeholder="Search friends" />
        <div className="shadow-md rounded-lg py-4">
          <h2 className="text-lg font-bold text-gray-900 text-center">Friends</h2>
          {results?.map(({ user }, index) => (
            <div className="flex p-4 rounded-lg overflow-hidden items-center" key={index}>
              <div className="w-14 overflow-hidden rounded-full">
                <img
                  className="h-18 object-contain w-full"
                  src={user.avatar.thumb.url}
                  alt="friend thumb"
                />
              </div>
              <div className="ml-2">
                <Link to={`${match.url}/${user.id}`}>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {user.first_name} {user.last_name}
                  </h3>
                </Link>
              </div>
              <button className="btn-primary py-2 px-4 ml-auto">Follow</button>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-sm shadow-md flex-1 rounded-lg py-4">
        <h2 className="text-lg font-bold text-gray-900 text-center">Requests</h2>
      </div>
    </div>
  );
}

export default withRouter(Friends);
