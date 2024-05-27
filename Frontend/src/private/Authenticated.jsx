import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Authenticated = () => {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data?.authUser) {
    console.log("USER NOT LOGGED IN");
    navigate("/login");
  } else {
    console.log("USER LOGGED IN");
    return <Outlet />;
  }
};

export default Authenticated;
