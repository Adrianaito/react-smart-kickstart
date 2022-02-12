import React from "react";
import Link from "next/link";

import { PlusCircleIcon, SearchIcon } from "@heroicons/react/solid";
import ButtonIcon from "../Button/ButtonIcon";

const Navbar = () => (
  <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500 mb-3">
    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a
          className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          href="/"
        >
          Smart Funding
        </a>
      </div>
      <div className="lg:flex flex-grow items-center">
        <ul className="flex flex-col lg:flex-row list-none mr-auto" />
        <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
          <div className="flex">
            <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-teal-600 rounded-full text-sm bg-teal-100 items-center rounded-r-none pl-2 py-1 text-teal-800 border-r-0 placeholder-teal-300">
              <SearchIcon className="h-5 w-5 pr-1 text-sky-400" />
            </span>
          </div>
          <input
            type="text"
            className="px-2 py-1 h-8 border border-solid  border-teal-600 rounded-full text-sm leading-snug text-teal-700 bg-teal-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-teal-300"
            placeholder="Search teal"
          />
        </div>
      </div>
      <Link href="/" passHref>
        <ButtonIcon label="Home" />
      </Link>
      <Link href="/campaign/new" passHref>
        <ButtonIcon
          icon={<PlusCircleIcon className="h-5 w-5 pr-1 text-sky-400" />}
          label="Start a Campaign"
        />
      </Link>
    </div>
  </nav>
);

export default Navbar;
