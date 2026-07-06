import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const [name, setName] = useState(user?.name || "");
  const [description, setDescription] = useState(user?.description || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.photoUrl || "");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photo) formData.append("photoUrl", photo);

      const result = await axios.put(serverUrl + "api/user/update", formData, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data.user));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] bg-gray-100 px-4 py-8 flex items-center justify-center">
      <div className="w-[100%] md:w-[600px] bg-white rounded-2xl shadow-lg p-8">
        {/* header */}
        <div className="flex items-center justify-center relative mb-6">
          <FaArrowLeft
            className="absolute left-0 text-xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>

        {/* profile photo preview */}
        <div className="flex justify-center mb-6">
          {preview ? (
            <img
              src={preview}
              alt="profile"
              className="w-[100px] h-[100px] rounded-full object-cover border-4 border-black"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border-4 border-black bg-black flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* select avatar */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-[15px] font-medium">Select Avatar</label>
          <input
            type="file"
            accept="image/*"
            name="photoUrl"
            placeholder="photoUrl"
            onChange={handlePhotoChange}
            className="w-[100%] border border-gray-300 rounded-[8px] px-3 py-2 text-[15px] cursor-pointer"
          />
        </div>

        {/* full name */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-[15px] font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[100%] border-2 border-black rounded-[8px] px-4 py-2 text-[15px] outline-none"
          />
        </div>

        {/* email - read only */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-[15px] font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-[100%] border border-gray-200 bg-gray-100 rounded-[8px] px-4 py-2 text-[15px] outline-none cursor-not-allowed text-gray-500"
          />
        </div>

        {/* description */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="text-[15px] font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            className="w-[100%] border border-gray-300 rounded-[8px] px-4 py-2 text-[15px] outline-none resize-none"
          />
        </div>

        {/* save button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-[100%] bg-black text-white py-[14px] rounded-[10px] text-[16px] cursor-pointer flex items-center justify-center"
        >
          {loading ? <ClipLoader size={25} color="white" /> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
