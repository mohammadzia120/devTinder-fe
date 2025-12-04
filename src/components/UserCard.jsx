import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const [error, setError] = useState("");
  const handleSendRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/connectionRequest/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="card w-96 bg-base-300 shadow-xl rounded-1xl overflow-hidden">
      <figure className="h-80 overflow-hidden">
        <img
          src={photoUrl}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body gap-3">
        <h2 className="card-title text-xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-400">
          {age} • {gender}
        </p>
        <p className="text-sm text-gray-300` line-clamp-3">{about}</p>
        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-primary bg-[oklch(65%_.241_354.308)]  flex-1 mx-1"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-success bg-[oklch(76%_0.177_163.223)] flex-1 mx-1"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
