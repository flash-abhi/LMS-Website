import Navbar from '../components/Navbar'
import home from "../assets/home1.jpg"
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from '../components/Logos';
import ExploreCourses from '../components/ExploreCourses';
import PublishedCardPage from '../components/PublishedCardPage';
import { useNavigate } from 'react-router-dom';
import About from '../components/About';
import Footer from '../components/Footer';
import ReviewPage from '../components/ReviewPage';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[100%] overflow-hidden' >
        <div className='w-[100%] lg:h-[140vh] h-[70vh] relative sm:flex sm:flex-row gap-y-2'>
          <Navbar/>
          <img src={home} alt="" className='object-cover md:object-fill w-[100%] sm:h-[64vh] md:h-[65vh] lg:h-[100%] h-[52vh] '/>
          <span className='lg:text-[50px] absolute md:text-[28px] lg:top-[12%] sm:top-[20%] top-[18%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Grow Your Skill To Advance</span>
          <span className='lg:text-[50px] absolute md:text-[28px] lg:top-[20%] sm:top-[25%] md:top-[27%] top-[23%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Your Career Path</span>
          <div className='absolute sm:top-[93%] lg:top-[30%] top-[75%] md:top-[92%] w-[100%] p-4 flex items-center justify-center gap-3 flex-wrap'>
            <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={() => navigate('/allcourses')}>All Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black'/></button>
            <button className='px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={() => navigate("/search")}>Search With Ai <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt="" /> <img src={ai1} alt="" className='w-[35px] h-[35px] rounded-full lg:hidden block'/></button>
          </div>
        </div>
          <Logos />
          <ExploreCourses/>
          <PublishedCardPage/>
          <About/>
          <ReviewPage/>
          <Footer/>
    </div>
  )
}

export default Home