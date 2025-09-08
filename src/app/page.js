import Banner from "./components/Banner";
import Chatbot from "./components/ChatBot";
import CoursesPage from "./components/courses/CoursesPage";
import Instructors from "./components/instructor-section/Instructors";
import Faq from "./quiz/faq/Faq";
import CoursesHome from "./coursesHome/page";

export default function Home() {
  return (
    <div>

      <Banner/>
      <Chatbot/>
      <CoursesHome/>
      <Instructors/>
      <Faq></Faq>

    </div>
  );
}
