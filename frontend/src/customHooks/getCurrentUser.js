import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData, setLoading } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));

      try {
        const result = await axios.get(
          serverUrl + "api/user/getcurrentuser",
          {
            withCredentials: true,
          }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;