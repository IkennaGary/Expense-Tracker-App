import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import Card from "./Card";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTION,
} from "../../graphql/queries/user.query";

const Cards = () => {
  const { loading, data } = useQuery(GET_TRANSACTIONS);
  const { data: authenticatedUser } = useQuery(GET_AUTHENTICATED_USER);
  const { data: userData } = useQuery(GET_USER_AND_TRANSACTION, {
    variables: {
      userId: authenticatedUser?.authUser?._id,
    },
  });

  console.log("USER DATA AND TRANSACTION", userData);

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {loading && <p>Loading...</p>}
        {data?.transactions?.map((transaction) => {
          return <Card transaction={transaction} key={transaction._id} />;
        })}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="text-2xl font-bold text-center my-10 w-full">
          No Transactions history found.
        </p>
      )}
    </div>
  );
};
export default Cards;
