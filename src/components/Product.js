import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
function Product({ id, title, price, description, category, image }) {
  const max = 5;
  const min = 1;
  const [rating] = useState(Math.floor(Math.random() * (max - min + 1) + min));
  const [hasprime] = useState(Math.random() > 0.5);
  const dispatch = useDispatch();

  const addingitems = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasprime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div class="relative flex flex-col m-5 md:m-3  bg-white p-10 md:p-5 z-30">
      <p className="absolute right-2 top-1 italic text-xs text-gray-400">
        {category}
      </p>

      <Image src={image} width={200} height={200} objectFit="contain" />

      <h4 className="my-3 md:text-base">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price * 100} currency="INR" />
      </div>

      {hasprime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addingitems} className=" mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
