
import SectionTitle from "../shared/SectionTitle";
import useAxiosPublic from "../../assets/hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";


const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateMyNews = () => {
    const navigate = useNavigate();
    const {_id,title,tags,publisher,description} = useLoaderData();
    const axiosPublic = useAxiosPublic();

   const handleSubmit = async (e)=>{
    e.preventDefault();
  
    const form = new FormData(e.currentTarget);
    const title = form.get('title');
    const tags = form.get('tags');
    const publisher = form.get('publisher');
    const description = form.get('description');
    const photo = form.get('image');
    // const authorImage = user.photoURL;
    // const email = user.email;

    const data = new FormData();
    data.append('image',photo)

    const res = await axiosPublic.post(image_hosting_api,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
   
   const image = res.data.data.url;
   const article = { title,tags,publisher,description,image };
    console.log(article);  

    const news = await axiosPublic.put(`/news/${_id}`,article)
    .then(res=>{
      if(res.data.modifiedCount > 0){
        Swal.fire({
          title: "Good job!",
          text: "News updated SuccessFully",
          icon: "success"
        });
        navigate('/my-article')
    
      }
    });

}
    

    return (
      <div className="py-10">
        <SectionTitle title="Update My News"></SectionTitle>
        <div className="py-10">
          <div>
            <form
              className="card-body shadow-lg md:w-2/3 mx-auto"
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-center text-cyan-600">
                Articles Update Form
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
               defaultValue={title}
                  required
                />
              </div>
              <div className="form-control">
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <label className="label">
                      <span className="label-text">Tags</span>
                    </label>
                    <select
                      name="tags"
                      className="input input-bordered w-full"
                    defaultValue={tags}
                    >
                      <option value="default" disabled>
                        select
                      </option>
                      <option value="News">News</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Sports">Sports</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Job">Job</option>
                      <option value="Politics">Politics</option>
                      <option value="Crime">Crime</option>
                      <option value="Features">Features</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Publisher</span>
                    </label>
                   <input type="text" name="publisher" defaultValue={publisher} className="input input-bordered w-full"/>
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  cols="8"
                  rows="10"
                  type="email"
                  placeholder="write articles"
                  className="textarea textarea-bordered textarea-lg w-full"
                  name="description"
                    defaultValue={description}
                  required
                />
              </div>

              <input
                type="file"
                className="file-input w-full max-w-xs"
                name="image"
               required
              />
              <div className="form-control mt-6">
                <button
                  className="btn bg-cyan-600 hover:bg-cyan-700 text-white"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default UpdateMyNews;