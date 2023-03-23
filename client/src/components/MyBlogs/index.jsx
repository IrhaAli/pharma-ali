import { useEffect, useState } from 'react';
import MyBlogsItem from '../MyBlogsItem/index';
import "../../styles/BlogPosts.css";
import axios from "axios";
import SelectSmall from '../Category/index.jsx';
import Button from '../Button';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import "../../styles/MyBlogs.css"

const MyBlogs = (props) => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  const deletePost = (id) => {
    axios.post("/blogs/delete", id)
      .then(() => {
        const newBlogPost = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogPost);
      });
  };

  useEffect(() => {
    if (props.user) {
      Promise.all([
        axios.get(`/blogs/${props.user}`),
        axios.get('/categories')
      ]).then((data) => {
        setBlogs(data[0].data);
        setCategories(data[1].data);
      });
    }
  }, [props.user]);

  return (
    <>
      <section className='section'>
        <div className='myBlogPosts'>
          <span className="blogPostsTitle">
            <div className='bloggg'>
               <h1>MY BLOGS</h1>
            </div>
            <div className='category-dropdown'>
              <SelectSmall categories={categories} />  
            </div> 
          </span>
          {blogs.map((blog) => (
            <MyBlogsItem
              key={blog.id}
              user_id={props.user}
              blog={blog}
              deletePost={deletePost} />
          ))}
          <div>
          <PostAddIcon onClick={() => navigate('/myblogs/add')} fontSize='large' color='error'/>
          <button onClick={() => navigate('/myblogs/add')} children={"Add a Blog"} className="blog-button"></button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyBlogs;