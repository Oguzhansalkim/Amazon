import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amount_shipping, items, timestamp, images }) {
  return (
    <div className="relative border rounded-md">
      <div className="flex  items-center bg-gray-100 p-5 text-sm text-gray-600 space-x-10">
        <div>
          <p className="text-xs font-bold">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold"> TOTAl</p>
          <p>
            <Currency quantity={amount} currency="INR" />
            -Next Day Delivery{" "}
            <Currency quantity={amount_shipping} currency="INR" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:72 truncate text-xs whitespace-nowrap">
          ORDER# {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div class="flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <img src={image} alt="" className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
