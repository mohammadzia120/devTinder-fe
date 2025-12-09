import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeeds } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeRequests } from "../utils/requestSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeeds());
      dispatch(removeConnections());
      dispatch(removeRequests());
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-300 shadow-lg px-6 sticky top-0 z-50">
        <div className="flex-1">
          <Link
            to={user ? "/feed" : "/"}
            className="btn btn-ghost text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
  bg-clip-text text-transparent drop-shadow-lg"
          >
            DevTinder
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="flex items-center">
              <p>
                Welcome <span className="font-bold">{user.firstName}</span>
              </p>
              <div className="dropdown dropdown-end mx-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoUrl}
                    />
                  </div>
                </div>

                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
