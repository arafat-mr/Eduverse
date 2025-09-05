export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-200 text-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Eduverse
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Learn from the best courses, track your progress, and achieve your goals.
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="/courses" 
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition"
          >
            Explore Courses
          </a>
          <a 
            href="/register" 
            className="px-6 py-3 bg-white text-black rounded-lg transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
