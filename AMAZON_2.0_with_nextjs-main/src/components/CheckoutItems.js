import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectItems,
} from "../slices/basketSlice";

function CheckoutItems({
  id,
  title,
  rating,
  price,
  description,
  category,
  image,
  hasprime,
}) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const addingitems = () => {
    const product = {
      id,
      title,
      rating,
      price,
      description,
      category,
      image,
      hasprime,
    };
    dispatch(addToBasket(product));
  };

  const removingitems = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5 ">
      <Image src={image} height={200} width={200} objectfit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <div className="text-xs my-2 line-clamp-3">{description}</div>

        <Currency quantity={price * 100} currency="INR" />

        {hasprime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex space-y-2 my-auto flex-col  justify-self-end">
        <button onClick={addingitems} className="button text-xs ">
          Add to Basket
        </button>
        <button onClick={removingitems} className="button text-xs">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutItems;
