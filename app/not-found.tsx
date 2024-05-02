import Link from "next/link";
import "./not-found.css";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="404 flex-1 h-screen flex flex-col justify-center items-center">
      <Image
        src="/404.jpg"
        alt="404"
        width={600}
        height={400}
        className="max-w-full"
      />
      <Link
        href="/"
        className="rounded-md px-4 py-2 font-medium hover:bg-[#92E2A9] hover:text-white"
        style={{ border: "1px solid #92E2A9" }}
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
