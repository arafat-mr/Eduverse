import ReviewsPage from "@/reviews/page";
import Banner from "./components/Banner";
import Chatbot from "./components/ChatBot";
import FAQ from "./components/Faq";
import Instructors from "./components/instructor-section/Instructors";
import CoursesHome from "./coursesHome/page";


export default function Home() {
  return (
    <div className="">

        <Banner/>
      <Chatbot/>
      <CoursesHome/>
      <Instructors/>
      <FAQ/>
      <ReviewsPage/>
    </div>
  );
}
