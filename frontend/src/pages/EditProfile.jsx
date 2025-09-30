import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions, userSelector } from "../redux/userSlice";
import axios from "axios";
import { serverURL } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const navigate = useNavigate();
  const userData = useSelector(userSelector);
  const [name, setName] = useState(userData.name || "");
  const [bio, setBio] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleEditProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", bio);
    if (photoUrl) formData.append("photoUrl", photoUrl);
    try {
      const result = await axios.post(
        serverURL + "/api/user/profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(userActions.setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Profile updated successfully");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response?.data?.message || "Profile update failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowAltCircleLeft
          className="w-[30px] h-[30px] fill-[#3d3b3b] cursor-pointer absolute top-5 left-5"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
          Edit Profile
        </h2>
        <form
          action=""
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                alt="profile"
                className="w-30 h-30 rounded-full object-cover border-4 border-black"
              />
            ) : (
              <div className="w-[70px] h-[70px] rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-[#3d3d3d] border-white cursor-pointer flex-shrink-0">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Select Avatar
            </label>
            <input
              type="file"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
              name="photoUrl"
              placeholder="photoUrl"
              id="image"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              UserName
            </label>
            <input
              type="text"
              placeholder={userData.name}
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              placeholder={userData.email}
              readOnly
              value={userData.email}
              id="name"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bio">
              Bio
            </label>
            <textarea
              type="text"
              rows={3}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              placeholder="edit your bio"
              id="bio"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            className="w-full bg-[#3d3d3d] text-white px-4 py-2 rounded-md hover:bg-[#4b4b4b] transition active:bg-[#2e2e2e]"
            disabled={loading}
            onClick={handleEditProfile}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
