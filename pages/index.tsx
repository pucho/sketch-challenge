import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="container mb-2 flex mx-auto w-full items-center justify-center">
      <ul className="flex flex-col p-4">
        <li className="border-gray-400 flex flex-row">
          <Link href="/document/e981971c-ff57-46dc-a932-a60dc1804992">
            <a className="select-none flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:translate-y-1 rounded-2xl border-2 hover:shadow-2xl border-gray-300">
              Go to Document 1
            </a>
          </Link>
        </li>
        <li className="border-gray-400 flex flex-row">
          <Link href="/document/40432a93-5434-4059-87b9-545fd1ad6ee0">
            <a className="select-none flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:translate-y-1 rounded-2xl border-2 hover:shadow-2xl border-gray-300 mt-2">
              Go to Document 2
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
