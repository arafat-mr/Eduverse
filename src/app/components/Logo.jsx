import Link from "next/link";

export default function Logo({ place }) {
  return (
    <Link href={"/"} className=" font-bold hover:cursor-pointer">
      <div className="flex gap-6 items-center justify-center">
        <div className="">
          <img
            className="rounded-full h-11 w-13 bg-white "
            src="/EduLogo.png"
            alt="logo"
          />
        </div>
        <p
          className={`italianno-regular -ml-4 lg:text-4xl md:text-3xl font-extrabold  ${
            place === "nav" ? "md:text-white text-white" : "text-white"
          } `}
        >
          Eduverse
        </p>
      </div>
    </Link>
  );
}
