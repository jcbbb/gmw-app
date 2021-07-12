import React from "react";
import api from "../../api";
import Search from "../../components/search/Search";
import FriendsList from "../../components/friendsList/FriendsList";
import FriendRequests from "../../components/friendRequests/FriendRequests";
import { useAsync } from "../../hooks/useAsync";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../hooks/useModal";

function Friends() {
  const [query, setQuery] = React.useState("");
  const { openModal, closeModal } = useModal();
  const { run } = useAsync();
  const {
    setUserFriends,
    deleteUserFriend,
    friends,
    setSuggestedFriends,
    suggestedFriends,
    setOutgoingRequests,
    deleteSuggested,
  } = useUser();

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
        deleteSuggested(user.id);
        await run(api.friend.createFriendRequest(user.id));
        const { friend_requests } = await run(api.friend.getOutgoingRequests());
        setOutgoingRequests(friend_requests);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [run, setOutgoingRequests, deleteSuggested]
  );

  const onFriendDelete = React.useCallback(
    async (id) => {
      try {
        await run(api.friend.deleteFriend(id));
        closeModal();
        deleteUserFriend(id);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }
    },
    [run, deleteUserFriend, closeModal]
  );

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-baseline space-x-4 p-4 mt-12">
      <div className="max-w-sm shadow-md flex-1 rounded-lg p-4">
        <h2 className="text-lg font-bold text-gray-900 ">Suggested friends</h2>
        <FriendsList friends={suggestedFriends} suggested onClick={createFriendRequest} />
      </div>
      <div className="max-w-lg flex-1 space-y-4">
        <Search onChange={onChange} placeholder="Search friends" />
        <div className="shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-900">Friends</h2>
          <FriendsList
            friends={results}
            onClick={(user) =>
              openModal("confirmation", {
                heading: "Unfollow friend",
                text: "Do you really want to unfollow this user?",
                onConfirm: () => onFriendDelete(user.id),
                onCancel: closeModal,
              })
            }
          />
        </div>
      </div>
      <div className="max-w-sm shadow-md flex-1 rounded-lg p-4">
        <FriendRequests />
      </div>
    </div>
  );
}

export default withRouter(Friends);
