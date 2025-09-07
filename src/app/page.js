import Banner from "./components/Banner";
import CoursesPage from "./components/courses/CoursesPage";
import HomeCourse from "./components/HomeCourse";
import QuizPage from "./quiz/page";

export default function Home() {
  return (
    <div>
      <Banner/>
      <CoursesPage/>
      <QuizPage/>
    </div>
  );
}
