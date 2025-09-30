import axios from 'axios';
import { useEffect } from 'react';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userSlice';

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          serverURL + "/api/user/getcurrentuser",
          { withCredentials: true }
        );
        console.log("useCurrentUser: ", result.data.user);
        dispatch(userActions.setUserData(result.data.user));
      } catch (err) {
        console.log(err);
        dispatch(userActions.clearUserData());
      }
    };

    fetchUser(); 
  }, [dispatch]);
};

export default useCurrentUser;
