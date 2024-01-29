import React from 'react'
import { useParams } from 'react-router-dom';
import Blog from '../Api/Blog';
function BlogPage() {
    let { id } = useParams();
  return (
    <div>
        <Blog callApiBlog={id}/>
    </div>
  )
}

export default BlogPage