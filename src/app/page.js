import Banner from "./components/Banner";
import Chatbot from "./components/ChatBot";
import Instructors from "./components/instructor-section/Instructors";
import CoursesHome from "./coursesHome/page";
import Faq from "./quiz/faq/Faq";

export default function Home() {
  return (
    <div className="">

      <Banner/>
      <Chatbot/>
      <CoursesHome/>
      <Instructors/>
      <Faq></Faq>

    </div>
  );
}
