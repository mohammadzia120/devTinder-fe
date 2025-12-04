import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/connectionRequest/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(id));
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const connections = await axios.get(
        BASE_URL + "/users/request/recieved",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(connections?.data?.requests));
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) {
    return <h2 className="flex justify-center my-10">No Requests found!</h2>;
  }
  return (
    <>
      <h1 className="text-xl font-bold m-auto text-center">Requests</h1>
      <div>
        {requests.map((request) => {
          const { _id, photoUrl, firstName, lastName, age, gender, about } =
            request.fromUserId;
          return (
            <div key={_id} className="flex justify-center px-3">
              <div className="card w-full max-w-lg bg-base-300 shadow-lg my-3">
                <div className="card-body p-5">
                  {/* Top Section */}

                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-300 ring-offset-2">
                        <img
                          src={photoUrl}
                          alt="Profile photo"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {/* User Info */}
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">
                        {firstName} {lastName}
                      </h2>

                      <p className="text-sm text-gray-400">
                        {age} • {gender}
                      </p>

                      <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                        {about}
                      </p>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end gap-3">
                    <button
                      className="btn btn-outline btn-error btn-sm mx-0.5 p-3 bg-[oklch(65%_.241_354.308)]"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-success btn-sm mx-2 p-3 bg-[oklch(76%_0.177_163.223)]"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Requests;
