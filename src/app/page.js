import Banner from "./components/Banner";
import CoursesPage from "./components/courses/CoursesPage";
import HomeCourse from "./components/HomeCourse";

export default function Home() {
  return (
    <div>
      <Banner/>
      <HomeCourse/>
      <CoursesPage/>
    </div>
  );
}
