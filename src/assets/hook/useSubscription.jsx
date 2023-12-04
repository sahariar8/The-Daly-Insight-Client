import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useSubscription = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
   const { data : subscriber = [] } = useQuery({
    queryKey:['subscriber',axiosSecure],
    queryFn:async()=>{
        const res = await axiosSecure.get('/users');
        return res.data;
        // const check = res.data;
        // const checkSubscriber = await check.find(item=>item.email === user.email && item.subscription === 'yes');
        // console.log(checkSubscriber);
        // return checkSubscriber;
    }
   })
   return [subscriber];
};

export default useSubscription;