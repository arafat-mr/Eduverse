"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center">
      <h2 className="text-4xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-4 text-gray-700">
        {error?.message || "Unexpected error occurred."}
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
