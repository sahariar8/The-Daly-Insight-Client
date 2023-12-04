import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://daily-insight-server-lyart.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;