import React from 'react';

function Posts({posts, loading}) {
    
    if(loading){
        return <h2>Loading...</h2>;
    }
  return <ul className='list-group mb-4'>
        {posts
        .sort((a,b)=>a.title >  b.title ? 1 : -1)
        .map(post =>(
          //  const result = JSON.sort((a.b)=>a.name.localCompare(b.name))
            <li key={post.id} className="list-group-item">
                {post.title}
                {/* {a.post.title.localCompare(b.post.title)} */}
            </li>
        ))}
        
       
  </ul>;
};


export default Posts
