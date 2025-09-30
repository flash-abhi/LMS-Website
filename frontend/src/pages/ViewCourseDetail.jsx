import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaLock, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  courseActions,
  courseSelector,
  publishedCourseSelector,
} from "../redux/courseSlice";
import empty from "../assets/empty.jpg";
import axios from "axios";
import { serverURL } from "../App";
import PublishedCard from "../components/PublishedCard";
import { FaPlayCircle } from "react-icons/fa";
import { userSelector } from "./../redux/userSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
const ViewCourseDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const userData = useSelector(userSelector);
  const courseData = useSelector(publishedCourseSelector);
  const { courses } = useSelector(courseSelector);
  // const selectedCourse = useSelector(selectedCourseSelector);
  const selectedCourse = courseData?.find(course => course._id === courseId);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating,setRating] = useState(0);
  const [comment,setComment]= useState("");

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );
    setIsEnrolled(!!verify); 
    // userData?.enrolledCourses
    // enrolledCourses is assumed to be an array that contains all the courses the user has enrolled in.
    // It can hold either:
    // Plain courseId strings (e.g. "66f1bdf1ab23...")
    // Or course objects (with _id property, like { _id: "66f1bdf1ab23...", title: "React" }).
    // .some(callback)
    // .some() checks whether at least one item in the array satisfies the condition.
    // typeof c === "string" ? c : c._id
    // If the course is stored as a string → just use it.
    // If it’s an object → use its _id.
    // .toString() === courseId?.toString()
    // Ensures both sides are compared as strings.
    // Useful because sometimes MongoDB ObjectIds are objects, not plain strings.
  };

  // ✅ Fetch course details with populated lectures
  const handleReview = async() => {
    setLoading1(true);
    try {
      const review = await axios.post(serverURL+ "/api/review/createreview",{comment,rating,courseId},{withCredentials:true});
      setLoading1(false);
      toast.success("Review Added !!");
      console.log(review);
      setRating(0);
      setComment("");
      
    } catch (error) {
      console.log(error);
      setLoading1(false);
      setRating(0);
      setComment("");
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `${serverURL}/api/course/courselecture/${courseId}`,
          { withCredentials: true }
        );
        dispatch(courseActions.setSelectedCourse(data.course));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, [courseId, dispatch]);

  // ✅ Fetch creator details once we have the selectedCourse
  useEffect(() => {
    const fetchCreator = async () => {
      if (!selectedCourse?.creator) return;
      try {
        const { data } = await axios.post(
          `${serverURL}/api/course/creator`,
          { userId: selectedCourse.creator },
          { withCredentials: true }
        );
        setCreatorData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreator();
  }, [selectedCourse]);
useEffect(() => {
  checkEnrollment();
}, [userData, courseId]);
  // ✅ Filter creator’s other courses (no need for state)
  const creatorCourses =
    courses?.filter(
      (c) => c.creator === creatorData?._id && c._id !== courseId
    ) || [];

  const handleEnroll = async (courseId, userId) => {
    try {
      const orderData = await axios.post(
        serverURL + `/api/order/razorpay-order`,
        { courseId, userId },
        { withCredentials: true }
      );
      console.log(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "VIRTUAL COURSES",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async (response) => {
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
          try {
            const verifyPayment = await axios.post(
              serverURL + `/api/order/verifypayment`,
              { ...response, courseId, userId },
              { withCredentials: true }
            );
            toast.success(verifyPayment.data.message);
            setIsEnrolled(true);
          } catch (err) {
            console.log(err);
            toast.error("Something went wrong while enrolling.");
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  const calculeAverageReview = (reviews) => {
    if(!reviews || reviews.length === 0){
      return 0;
    }
    const total = reviews.reduce((sum,review )=> sum + review.rating ,0);
    return (total/reviews.length).toFixed(1)
  }
  const avgRating = calculeAverageReview(selectedCourse?.reviews);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              onClick={() => navigate("/")}
              className="my-1 text-black w-[22px] h-[22px] cursor-pointer"
            />
            <img
              src={selectedCourse?.thumbnail || empty}
              className="md:min-w-[350px] md:min-h-[220px] lg:w-full rounded-xl w-full object-cover"
              alt="course thumbnail"
            />
          </div>

          {/* course info */}
          <div className="flex-1 space-y-2 my-6">
            <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 text-yellow-500 font-medium">
                <span className="flex items-center gap-1">
                  {avgRating} <FaStar />
                </span>
                <span className="text-gray-400">(1,200 Reviews)</span>
              </div>
              <div>
                <span className="text-xl font-semibold">
                  ₹{selectedCourse?.price}
                </span>
                <span className="line-through text-sm text-gray-400 ml-1">
                  ₹599
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>
              {!isEnrolled?<button
                disabled={loading}
                onClick={() => handleEnroll(courseId, userData._id)}
                
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3"
              >
                {loading ? (
                  <ClipLoader size={30} color="white" />
                ) : (
                  "Enroll Now"
                )}
              </button>:
              <button
                disabled={loading}
                onClick={() => navigate(`/viewlecture/${courseId}`)}
                className="bg-green-100 text-green-500 px-6 py-2 rounded hover:bg-green-200 mt-3"
              >
               Watch Now
              </button>
              }
            </div>
          </div>
        </div>

        {/* learning */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What you'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>

        {/* who this course is for */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills.
          </p>
        </div>

        {/* curriculum */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-bold mb-1">Course Curriculum</h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length} Lectures
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, i) => (
                <button
                  key={i}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                    selectedLecture?._id === lecture?._id
                      ? "bg-gray-100 border-gray-400"
                      : ""
                  } ${
                    lecture.isPreviewFree
                      ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                      : "cursor-not-allowed opacity-60 border-gray-200"
                  }`}
                >
                  <span className="text-lg text-gray-700">
                    {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {lecture.lectureTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* video preview */}
          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  controls
                  src={selectedLecture.videoUrl}
                />
              ) : (
                <span className="text-white text-sm">
                  Select a preview lecture to watch
                </span>
              )}
            </div>
          </div>
        </div>

        {/* reviews */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar onClick={() => setRating(star)} key={star} className={star <= rating ? "fill-amber-300": "fill-gray-300"} />
              ))}
            </div>
            <textarea
              rows={3}
              placeholder="Write your review here ..."
              className="w-full border border-gray-300 rounded-lg p-2"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              disabled={loading1}
              onClick={handleReview}
              className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
            >
              {loading1 ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>

        {/* creator info */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <img
            src={creatorData?.photoUrl || empty}
            className="w-16 h-16 rounded-full object-cover border"
            alt="creator"
          />
          <div>
            <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
            <p className="text-sm text-gray-600">{creatorData?.description}</p>
            <p className="text-sm text-gray-600">{creatorData?.email}</p>
          </div>
        </div>

        {/* other courses */}
        <div className="mt-6">
          <p className="text-xl font-semibold mb-2">
            Other Published Courses by the Educator
          </p>
          <div className="w-full flex flex-wrap gap-6">
            {creatorCourses.map((course, i) => (
              <PublishedCard
                key={i}
                thumbnail={course.thumbnail}
                category={course.category}
                title={course.title}
                price={course.price}
                id={course._id}
                reviews={course.reviews}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseDetail;
