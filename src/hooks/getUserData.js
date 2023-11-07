import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";

const GetUserData = () => {
  const { user } = useContext(AuthContext);

  const {
    data: backedUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios(
        `https://guvi-profile-auth-server.vercel.app/users?email=${user?.email}`
      );
      return res.data;
    },
  });

  return [backedUser, refetch, isLoading];
};

export default GetUserData;
