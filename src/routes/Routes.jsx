import { createBrowserRouter } from "react-router-dom";
import LayOut from "../pages/lauout/LayOut";
import Error from "../pages/home/error/Error";
import Home from "../pages/home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllUsers from "../pages/Dashboard/allUsers/AllUsers";
import Statistics from "../pages/Dashboard/statistics/Statistics";
import AdminRoutes from "./AdminRoutes";
import AddPublisher from "../pages/Dashboard/addpublisher/AddPublisher";
import AddArticle from "../pages/add-article/AddArticle";
import AddNews from "../pages/add-article/Article";
import MyArticle from "../pages/my-article/MyArticle";
import UpdateMyNews from "../pages/update my news/UpdateMyNews";
import AllArticle from "../pages/Dashboard/all-article/AllArticle";
import UpdateProfile from "../pages/profile/UpdateProfile";
import Subscription from "../pages/subscription/Subscription";
import AllArticles from "../pages/home/all-articles/AllArticles";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/home/all-articles/Details";
import PremiumArticle from "../pages/home/premium-article/PremiumArticle";
import Payment from "../pages/home/payment/payment";



export const router = createBrowserRouter([
    {
        path:'/',
        element:<LayOut></LayOut>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'all-articles',
                element:<AllArticles></AllArticles>
            },
            {
                path:'/details/:id',
                element:<PrivateRoute><Details></Details></PrivateRoute>,
                loader:({params})=>fetch(`https://daily-insight-server-lyart.vercel.app/allnews/${params.id}`)
            },
            {
                path:'add-article',
                element:<PrivateRoute><AddArticle></AddArticle></PrivateRoute>
            },
            {
                path:'my-article',
                element:<PrivateRoute><MyArticle></MyArticle></PrivateRoute>
            },
            {
                path:'subscription',
                element:<PrivateRoute><Subscription></Subscription></PrivateRoute>
            },
            {
                path:'update-mynews/:id',
                element:<PrivateRoute><UpdateMyNews></UpdateMyNews></PrivateRoute>,
                loader:({params})=>fetch(`https://daily-insight-server-lyart.vercel.app/mynews/${params.id}`)
            },
            {
                path:'premium-article',
                element:<PrivateRoute><PremiumArticle></PremiumArticle></PrivateRoute>
            },
            {
                path:'payment',
                element:<PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path:'profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path:'/update-profile',
                element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'register',
                element:<Register></Register>
            },
        ]
    },
    {
        path:'dashboard',
        element:<AdminRoutes><Dashboard></Dashboard></AdminRoutes>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'',
                element:<AdminRoutes><Statistics></Statistics></AdminRoutes>
            },
            {
                path:'allusers',
                element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path:'allarticle',
                element:<AdminRoutes><AllArticle></AllArticle></AdminRoutes>,
                loader:()=>fetch('https://daily-insight-server-lyart.vercel.app/newscount')
            },
            {
                path:'addpublisher',
                element:<AdminRoutes><AddPublisher></AddPublisher></AdminRoutes>
            }
        ]
    }
])

