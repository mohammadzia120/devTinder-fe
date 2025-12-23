import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Loader from "./Loader";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      setError(err.response.data.error || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0) {
    return <h2 className="flex justify-center my-10">No new user found!</h2>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    !isLoading &&
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
