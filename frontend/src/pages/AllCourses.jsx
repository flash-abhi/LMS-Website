import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import aiImg from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import { publishedCourseSelector } from "../redux/courseSlice";
import PublishedCard from "../components/PublishedCard";

const AllCourses = () => {
  const navigate = useNavigate();
  const courseData = useSelector(publishedCourseSelector);
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [isSidebarVisible,setIsSidebarVisible] = useState(false)

  
// step 1: Initially: category = []
// step 2: Click "AI/ML" → category = ["AI/ML"]
// step 3: Click "Web Development" → category = ["AI/ML", "Web Development"]
// step 4: Click "AI/ML" again → category = ["Web Development"]

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // If category is already selected → remove it
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      // If not selected → add it
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

// step 1: courseData = all published courses from Redux store.
// step 2: If no category is selected → show all courses.
// step 3: If categories exist → filter courses where c.category matches any of the selected categories.
// step 4: Then save the filtered list in filterCourses.

  const applyFilter = () => {
    let courseCopy = courseData?.slice(); // make a copy of all courses
    if (category.length > 0) {
      // If some categories are selected → keep only those courses
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);
  useEffect(() => {
    applyFilter();
  }, [category]);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <button onClick={() => setIsSidebarVisible(!isSidebarVisible)} className="fixed  top-22 left-2 z-50 bg-white text-sm text-black px-3 py-1 rounded md:hidden border-2 border-black">
        {isSidebarVisible? "Hide":"Show"} Filters
      </button>
      {/* sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible? 'translate-x-0': '-translate-x-full'} md:block md:translate-x-0`}>
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
          {" "}
          <FaArrowAltCircleLeft
            onClick={() => navigate("/")}
            className="text-white"
          />
          Filter by category
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl"
        >
          <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2" onClick={() => navigate("/search")}>
            Search with AI{" "}
            <img
              src={aiImg}
              alt="ai-img"
              className="h-[30px] w-[30px] rounded-full"
            />
          </button>
          <label
            htmlFor="App-Development"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="App-Development"
              value={"App Development"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            App Development
          </label>
          <label
            htmlFor="AI/ML"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="AI/ML"
              value={"AI/ML"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            AI/ML
          </label>
          <label
            htmlFor="AI-Tools"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="AI-Tools"
              value={"AI Tools"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            AI Tools
          </label>
          <label
            htmlFor="Data-Science"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="Data-Science"
              value={"Data Science"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Data Science
          </label>
          <label
            htmlFor="Data-Analysis"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="Data-Analysis"
              value={"Data Analysis"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Data Analysis
          </label>
          <label
            htmlFor="Ethical-Hacking"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="Ethical-Hacking"
              value={"Ethical Hacking"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Ethical Hacking
          </label>
          <label
            htmlFor="UI/UX"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="UI/UX"
              value={"UI/UX Designing"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            UI/UX Designing
          </label>
          <label
            htmlFor="Web-Development"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="Web-Development"
              value={"Web Development"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Web Development
          </label>
          <label
            htmlFor="Others"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              name=""
              id="Others"
              value={"Others"}
              onChange={toggleCategory}
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Others
          </label>
        </form>
      </aside>
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {filterCourses?.map((course, index) => (
          <PublishedCard
            key={index}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
            thumbnail={course.thumbnail}
            reviews = {course.reviews}
          />
        ))}
      </main>
    </div>
  );
};

export default AllCourses;
