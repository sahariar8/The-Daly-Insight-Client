import { FaHandPointRight } from "react-icons/fa";
import SectionTitle from "../../shared/SectionTitle";
import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <div>
      <SectionTitle title="Plans"></SectionTitle>
      <div className="grid md:grid-cols-3 gap-10 md:py-10 py-4">
        <div className="card bg-base-100 shadow-xl border-2 border-sky-600" data-aos="flip-left"data-aos-easing="ease-out-cubic"data-aos-duration="2000">
          <div className="card-body">
            <h2 className="card-title bg-sky-600 block w-1/2 p-1 text-white rounded-lg">free For 1 month</h2>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl font-bold">Premium Individual</h1>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Free</h1>
                    <h2 className="text-slate-600 text-sm -mt-1 font-semibold">For 1 month</h2>
                </div>
            </div>
            <div>
                    <ol>
                        <li className="flex items-center font-semibold"><FaHandPointRight className="mr-2"/>1 premium account</li>
                        <li className="flex items-center font-semibold"><FaHandPointRight className="mr-2"/>Cancel Anytime</li>
                        <li className="flex  font-semibold"><FaHandPointRight className="mr-2 text-4xl"/>After 1 month,then $10.99 per month after.offer only available if you havent tried premium before.Terms Apply</li>
                    </ol>
                </div>
            <div className="card-actions justify-end">
             <Link to={"/subscription"} className="w-full"> <button className="btn bg-sky-600 w-full text-white font-bold rounded-2xl">Buy Now</button></Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border-2 border-yellow-600" data-aos="flip-left"data-aos-easing="ease-out-cubic"data-aos-duration="2000">
          <div className="card-body flex-col justify-between">
            {/* <h2 className="card-title bg-yellow-600 block w-1/2 p-1 text-white rounded-lg">free For 1 month</h2> */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl font-bold">Premium Duo</h1>
                </div>
                <div>
                    <h1 className="text-xl font-bold">$14.99</h1>
                    <h2 className="text-slate-600 text-sm -mt-1 font-semibold">Per Month</h2>
                </div>
            </div>
            <div>
                    <ol>
                        <li className="flex items-center font-semibold"><FaHandPointRight className="mr-2"/>2 premium account</li>
                        <li className="flex items-center font-semibold"><FaHandPointRight className="mr-2"/>Cancel Anytime</li>
                        <li className="flex  font-semibold"><FaHandPointRight className="mr-2 text-4xl"/>After 1 month,then $10.99 per month after.offer only available if you havent tried premium before.Terms Apply</li>
                    </ol>
                </div>
            <div className="card-actions justify-end">
            <Link to={"/subscription"} className="w-full"> <button className="btn bg-yellow-600 w-full text-white font-bold rounded-2xl">Buy Now</button></Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border-2 border-green-600" data-aos="flip-left"data-aos-easing="ease-out-cubic"data-aos-duration="2000">
          <div className="card-body flex-col justify-between">
            {/* <h2 className="card-title bg-sky-600 block w-1/2 p-1 text-white rounded-lg">free For 1 month</h2> */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl font-bold">Premium Individual</h1>
                </div>
                <div>
                    <h1 className="text-xl font-bold">16.99</h1>
                    <h2 className="text-slate-600 text-sm -mt-1 font-semibold">Per Month</h2>
                </div>
            </div>
            <div>
                    <ol>
                        <li className="flex items-center font-semibold"><FaHandPointRight className="mr-2"/>Up To 6 premium account</li>
                        <li className="flex items-center font-semibold"><FaHandPointRight className="mr-2"/>Cancel Anytime</li>
                        <li className="flex  font-semibold"><FaHandPointRight className="mr-2 text-4xl"/>After 1 month,then $10.99 per month after.offer only available if you havent tried premium before.Terms Apply</li>
                    </ol>
                </div>
            <div className="card-actions justify-end">
            <Link to={"/subscription"} className="w-full"> <button className="btn bg-green-600 w-full text-white font-bold rounded-2xl">Buy Now</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
