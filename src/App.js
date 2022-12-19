import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import './App.css';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const info = [
  {
    id:1,
    kind:"A"
  },
  {
    id:2,
    kind:"B"
  },
  {
    id:3,
    kind:"C"
  }
      
]

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] =useState(10);

  const [state, setStste] = useState(info);

  useEffect(()=>{
      const fetchPosts = async ()=>{
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts'); 
        
        setPosts(res.data);
        
        setLoading(false);
        
      }
      fetchPosts();
  }, []);

  // console.log(posts);
  // Get current Post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPot = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPot, indexOfLastPost);

  // Change Page
  const paginate = pageNumber => setCurrentPage(pageNumber); 
  return (
    <div className='container mt-5'>
      <h3 className='text-primary mb-3'>My App Pegn..</h3>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
