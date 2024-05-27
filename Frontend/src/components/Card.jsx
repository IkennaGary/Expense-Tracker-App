import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatDate";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = (props) => {
  const cardClass = categoryColorMap[props.transaction.category];

  const description =
    props.transaction.description[0]?.toUpperCase() +
    props.transaction.description?.slice(1);
  const category =
    props.transaction.category[0]?.toUpperCase() +
    props.transaction.category?.slice(1);

  const newDate = formatDate(props.transaction.date);

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetAllTransactions"],
  });

  const handleDelete = async () => {
    console.log("Deleting transaction...");
    try {
      const response = await deleteTransaction({
        variables: {
          transactionId: props.transaction._id,
        },
      });
      toast.success(response.data.deleteTransaction.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const transactionId = props.transaction._id;

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {props.transaction.paymentType}
          </h2>
          <div className="flex items-center gap-2">
            <div onClick={handleDelete}>
              <FaTrash className={"cursor-pointer"} />
            </div>
            <Link to={`/transaction/${props.transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {props.transaction.paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: {`${props.transaction.amount}`}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {props.transaction.location || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{newDate}</p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
