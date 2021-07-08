import React from "react";
import api from "../../api";
import Search from "../../components/search/Search";
import FriendsList from "../../components/friendsList/FriendsList";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import FriendRequests from "../../components/friendRequests/FriendRequests";

function Friends() {
  const [query, setQuery] = React.useState("");
  const { run, data: friends } = useAsync();
  const { run: run2, data: suggestedFriends } = useAsync();

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

    const getSuggestedFriends = async () => {
      try {
        await run2(api.friend.getSuggestedFriends());
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    Promise.all([getFriends(), getSuggestedFriends()]);
  }, [run2, run]);

  const results = React.useMemo(() => {
    return friends?.users.filter(({ user }) => {
      const lastname = user.last_name.toLowerCase();
      const firstname = user.first_name.toLowerCase();
      return lastname.includes(query.toLowerCase()) || firstname.includes(query.toLowerCase());
    });
  }, [query, friends]);

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-baseline space-x-4 p-4 mt-12">
      <div className="max-w-sm shadow-md flex-1 rounded-lg p-4">
        <h2 className="text-lg font-bold text-gray-900 ">Suggested friends</h2>
        <FriendsList friends={suggestedFriends?.suggestedFriends} suggested />
      </div>
      <div className="max-w-lg flex-1 space-y-4">
        <Search onChange={onChange} placeholder="Search friends" />
        <div className="shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-900">Friends</h2>
          <FriendsList friends={results} />
        </div>
      </div>
      <div className="max-w-sm shadow-md flex-1 rounded-lg p-4">
        <FriendRequests />
      </div>
    </div>
  );
}

export default withRouter(Friends);
