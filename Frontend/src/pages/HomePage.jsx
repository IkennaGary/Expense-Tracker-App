import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT_USER } from "../../graphql/mutations/user.mutation.js";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query.js";

import toast from "react-hot-toast";
import { GET_CATEGORY_STAISTICS } from "../../graphql/queries/transaction.query.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  // const chartData = {
  //   labels: ["Saving", "Expense", "Investment"],
  //   datasets: [
  //     {
  //       label: "%",
  //       data: [13, 8, 3],
  //       backgroundColor: [
  //         "rgba(75, 192, 192)",
  //         "rgba(255, 99, 132)",
  //         "rgba(54, 162, 235)",
  //       ],
  //       borderColor: [
  //         "rgba(75, 192, 192)",
  //         "rgba(255, 99, 132)",
  //         "rgba(54, 162, 235, 1)",
  //       ],
  //       borderWidth: 1,
  //       borderRadius: 30,
  //       spacing: 10,
  //       cutout: 130,
  //     },
  //   ],
  // };

  const [logout, { loading, client }] = useMutation(LOGOUT_USER, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const { data } = useQuery(GET_CATEGORY_STAISTICS, {
    refetchQueries: ["GET_TRANSACTIONS"],
  });

  const { data: userData } = useQuery(GET_AUTHENTICATED_USER);

  const [chartData, setChatData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data?.categoryStatistics.map(
        (category) => category.category
      );
      const totalAmount = data?.categoryStatistics.map(
        (amount) => amount.totalAmount
      );
      let backgroundColor = [];

      data?.categoryStatistics.forEach((category) => {
        if (category.category === "expense") {
          backgroundColor.push("rgba(255, 99, 132)");
        } else if (category.category === "saving") {
          backgroundColor.push("rgba(75, 192, 192)");
        } else {
          backgroundColor.push("rgba(54, 162, 235)");
        }
      });

      setChatData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmount,
            backgroundColor,
            borderColor: backgroundColor,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      await logout();
      client.resetStore();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const loading = false;

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={
              userData?.authUser?.profilePicture ||
              "https://tecdn.b-cdn.net/img/new/avatars/2.webp"
            }
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatistics.length > 0 && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          )}
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
