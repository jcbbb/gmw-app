import React from "react";
import api from "../../api";
import Search from "../../components/search/Search";
import FriendsList from "../../components/friendsList/FriendsList";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import FriendRequests from "../../components/friendRequests/FriendRequests";
import { useUser } from "../../hooks/useUser";

function Friends() {
  const [query, setQuery] = React.useState("");
  const { run } = useAsync();
  const { setUserFriends, friends, setSuggestedFriends, suggestedFriends, setOutgoingRequests } =
    useUser();

  const onChange = React.useCallback(
    (value) => {
      setQuery(value);
    },
    [setQuery]
  );

  React.useEffect(() => {
    const getFriends = async () => {
      try {
        const { users } = await run(api.friend.getAll());
        setUserFriends(users);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    const getSuggestedFriends = async () => {
      try {
        const { suggestedFriends } = await run(api.friend.getSuggestedFriends());
        setSuggestedFriends(suggestedFriends);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    };

    Promise.all([getFriends(), getSuggestedFriends()]);
  }, [run, setUserFriends, setSuggestedFriends]);

  const results = React.useMemo(() => {
    return friends?.filter(({ user }) => {
      const lastname = user.last_name.toLowerCase();
      const firstname = user.first_name.toLowerCase();
      return lastname.includes(query.toLowerCase()) || firstname.includes(query.toLowerCase());
    });
  }, [query, friends]);

  const createFriendRequest = React.useCallback(
    async (user) => {
      try {
        await run(api.friend.createFriendRequest(user.id));
        const { friend_requests } = await run(api.friend.getOutgoingRequests());
        setOutgoingRequests(friend_requests);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [run, setOutgoingRequests]
  );

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-baseline space-x-4 p-4 mt-12">
      <div className="max-w-sm shadow-md flex-1 rounded-lg p-4">
        <h2 className="text-lg font-bold text-gray-900 ">Suggested friends</h2>
        <FriendsList friends={suggestedFriends} suggested onFollow={createFriendRequest} />
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
