import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const fetchConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections?.data?.data));
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return <h2 className="flex justify-center my-10">No Connection Found!</h2>;

  return (
    <>
      <h1 className="text-xl font-bold m-auto text-center">Connections</h1>
      {connections.map((connection) => {
        const { _id, photoUrl, firstName, lastName, about, age, gender } =
          connection;
        return (
          <div key={_id} className="flex justify-center">
            <div className="card w-full max-w-md bg-base-300 shadow-md my-3">
              <div className="card-body flex flex-row items-center gap-4">
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
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">
                    {firstName} {lastName}
                  </h2>
                  <h4>
                    {age} • {gender}
                  </h4>
                  <p className="text-sm text-gray-400 line-clamp-2">{about}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
