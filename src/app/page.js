import Banner from "./components/Banner";
import Chatbot from "./components/ChatBot";
import CoursesPage from "./components/courses/CoursesPage";
import HomeCourse from "./components/HomeCourse";

export default function Home() {
  return (
    <div>

      <Banner/>
      <Chatbot/>
      <HomeCourse/>
      <CoursesPage/>
    </div>
  );
}
