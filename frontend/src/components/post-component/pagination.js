import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './post.css'


function Pagination ({postsPerPage, totalPosts, paginate}){
    const Pages = []
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        Pages.push(i);
    }
    return (
        <nav>
            <ul className = "pagination">
                {
                    Pages.map(page =>(
                    <li key = {page} className ="page-item">
                        <a onClick = {(e)=> {
                            e.preventDefault()
                            paginate(page)
                        }}
                            href="/!#" className = "page-link">{page}</a> 
                    </li>

                    ))}
            </ul>
        </nav>
    )
}

export default Pagination;