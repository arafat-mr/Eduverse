import Link from "next/link";

export default async function Success() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-green-600 text-2xl font-bold">
        ✅ Payment Successful!
      </h1>
      <div>
        <Link href={"/dashboard"}>
          <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-semibold  hover:bg-blue-700 transition">
            Go To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
