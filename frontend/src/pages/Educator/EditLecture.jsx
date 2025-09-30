import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { lectureSelector, setLectureData } from "../../redux/lectureSlice";
import { serverURL } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const EditLecture = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lectureData = useSelector(lectureSelector);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId
  );
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture?.lectureTitle || ""
  );

  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const formdata = new FormData();
  formdata.append("lectureTitle", lectureTitle);
  formdata.append("videoUrl", videoUrl);
  formdata.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.put(
        serverURL + `/api/course/editlecture/${lectureId}`,
        formdata,
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture Updated");
      navigate("/courses");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const removeLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.delete(
        serverURL + `/api/course/removelecture/${lectureId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      navigate(`/createlecture/${courseId}`);
      toast.success("Lecture Removed");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("failed to remove to lecture");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* header */}
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeftLong
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Update Course Lecture
          </h2>
        </div>
        <button
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm cursor-pointer"
          disabled={loading}
          onClick={removeLecture}
        >
          {loading ? <ClipLoader size={30} color="white" /> : "Remove Lecture"}
        </button>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              LectureTitle *
            </label>
            <input
              required
              type="text"
              id="title"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
              placeholder="Enter video title"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="video"
            >
              Video *
            </label>
            <input
              accept="video/*"
              required
              onChange={(e) => setVideoUrl(e.target.files[0])}
              type="file"
              id="video"
              className="w-full p-2 border file:p-2 file:rounded-md file:border-0 file:text-white file:bg-gray-500 hover:file:bg-gray-600 border-gray-300 rounded-md  text-sm "
              placeholder="Enter video title"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              onChange={() => setIsPreviewFree((prev) => !prev)}
              id="isfree"
              className="h-4 w-4 accent-black"
            />
            <label htmlFor="isfree">Is this Video FREE</label>
          </div>
          {loading ? <p>Uploading video... please wait.</p> : ""}
        </div>
        <div className="pt-4">
          <button
            onClick={handleEditLecture}
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Update Lecture"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
