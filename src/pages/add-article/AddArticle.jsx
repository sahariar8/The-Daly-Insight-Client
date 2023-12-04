
import SectionTitle from "../shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../assets/hook/useAxiosSecure";
import useAxiosPublic from "../../assets/hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAuth from "../../assets/hook/useAuth";
import { useNavigate } from "react-router-dom";

const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddArticle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data : publishers = [] } = useQuery({
      queryKey:['publishers'],
      queryFn :async()=>{
        const res = await axiosSecure.get('/publishers');
        console.log(res.data);
        return res.data;

      }
  })
  
  const handleSubmit =async (e)=>{
        e.preventDefault();
      
        const form = new FormData(e.currentTarget);
        const title = form.get('title');
        const tags = form.get('tags');
        const publisher = form.get('publisher');
        const description = form.get('description');
        const photo = form.get('image');
        const authorImage = user.photoURL;
        const email = user.email;
        const authorName = user.displayName;
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        console.log(date);

        const data = new FormData();
        data.append('image',photo)

        const res = await axiosPublic.post(image_hosting_api,data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
       
       const image = res.data.data.url;
       const article = { title,tags,publisher,description,authorImage,email,authorName,image,date,viewCount:0,premium:'No'};
        console.log(article);  

        const news = await axiosPublic.post('/news',article)
        .then(res=>{
          console.log(res.data);
          if(res.data.insertedId){
            Swal.fire({
              title: "Good job!",
              text: "News Added SuccessFully",
              icon: "success"
            });
            // navigate('/my-article');
            e.target.reset();
           
          }
        });

  }



  return (
    <div className="py-10">
      <SectionTitle title="Add Article"></SectionTitle>
      <div>
        <form className="card-body shadow-lg md:w-2/3 mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-3xl md:text-5xl font-bold text-center text-cyan-600">
            Articles Add Form
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="title"
              className="input input-bordered"
             name="title"
              required
            />
          </div>
          <div className="form-control">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label className="label">
                  <span className="label-text">Tags</span>
                </label>
              <select name="tags" className="input input-bordered w-full" defaultValue='default'>
                  <option value='default' disabled>select</option>
                  <option value='Business'>Business</option>
                  <option value='Bangladesh'>Bangladesh</option>
                  <option value='Entertainment'>Entertainment</option>
                  <option value='International'>International</option>
                  <option value='Sports'>Sports</option>
                  <option value='Health'>Health</option>
                  <option value='Education'>Education</option>
                  <option value='Job'>Job</option>
                  <option value='Politics'>Politics</option>
                  <option value='Crime'>Crime</option>
                  <option value='Features'>Features</option>
                  
              </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Publisher</span>
                </label>
                <select name="publisher" className="input input-bordered w-full" defaultValue='default'>
                <option value='default' disabled>select</option>
                    {
                      publishers.map(item=><option value={item.name} key={item._id}>{item.name}</option>)
                    }
                </select>
               
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
            cols='8'
            rows='10'
              type="email"
              placeholder="write articles"
              className="textarea textarea-bordered textarea-lg w-full"
             name="description"
              required
            />
          </div>

          <input
            type="file"
            className="file-input w-full max-w-xs"
            name="image"
          />
          <div className="form-control mt-6">
            <button
              className="btn bg-cyan-600 hover:bg-cyan-700 text-white"
              type="submit"
            >
             Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
