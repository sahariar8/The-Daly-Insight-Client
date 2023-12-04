import useAxiosPublic from "../../assets/hook/useAxiosPublic";





const axiosPublic =useAxiosPublic();
export  const createPaymentIntent = async(price)=>{
    const {data} = await axiosPublic.post('/create-payment-intent',price)
    return data;
  }

export  const savePaymentIntent = async(paymentInfo)=>{
    const {data} = await axiosPublic.post('/payment',paymentInfo)
    return data;
  }

export  const updateUser = async(id,status)=>{
    const {data} = await axiosPublic.patch(`/users/${id}`,{ status });
    return data;
  }