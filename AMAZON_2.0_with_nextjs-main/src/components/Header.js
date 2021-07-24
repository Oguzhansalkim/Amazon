import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

function Header() {
  const [session] = useSession();
  const router = useRouter();

  const items = useSelector(selectItems);

  return (
    <header>
      <div className="bg-amazon_blue flex p-1 py-2 items-center flex-grow  ">
        <div className=" mt-2 flex flex-grow sm:flex-grow-0 items-center">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className=" hidden sm:flex items-center h-10 flex-grow bg-yellow-400 hover:bg-yellow-500 rounded-md  ">
          <input
            type="text"
            className=" p-2 h-full flex-shrink flex-grow rounded-l-md focus:outline-none px-2"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="flex items-center text-white text-xs space-x-6 ml-2">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm whitespace-nowrap">
              Account & Lists
            </p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm whitespace-nowrap">
              &orders
            </p>
          </div>

          <div className="link relative flex items-center">
            <span className="absolute top-0 right-0 h-4 text-center rounded-full text-black font-bold w-4 bg-yellow-400 md:right-11">
              {items.length}
            </span>
            <ShoppingCartIcon
              onClick={() => router.push("/checkout")}
              className="h-10"
            />
            <p className="font-extrabold hidden md:text-sm md:inline whitespace-nowrap">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-amazon_blue-light text-sm text-white">
        <p className="flex link items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy again</p>
        <p className="link hidden lg:inline-flex">Shopper ToolKit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
