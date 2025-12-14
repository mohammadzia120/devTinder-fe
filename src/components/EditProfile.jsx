import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Loader from "./Loader";

const EditProfile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    setError("");
    setIsLoading(true);
    try {
      const user = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(user?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      //   navigate("/feed");
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center text-xl">Edit Profile</h2>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-1">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-1">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Second Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-1">Photo</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Photo"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-1">Gender</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-1">Age</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-1">About</legend>
                <textarea
                  className="textarea h-24"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>

            <p className="text-red-200">{error}</p>
            {/* <p className="text-red-500">{error}</p> */}
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary bg-blue-500 p-5"
                onClick={handleEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profle saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
