import ReviewsPage from "@/reviews/page";
import Banner from "./components/Banner";
import Chatbot from "./components/ChatBot";
import Instructors from "./components/instructor-section/Instructors";
import CoursesHome from "./coursesHome/page";
import FAQ from "./components/Faq";



export default function Home() {
 
  return (
    <div>

      <Banner/>


   
      <Chatbot/>
      <CoursesHome/>
      <Instructors/>
      {/* <Faq></Faq> */}
      <FAQ></FAQ>

    {/* <div className=""> */}
      <Banner />
      <Chatbot />
      <CoursesHome />
      <Instructors />
      <FAQ></FAQ>
      <ReviewsPage />
    </div>
  );
}
