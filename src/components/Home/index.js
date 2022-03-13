import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

export default function Post() { 
    let router = useRouter();
    let limit = router.query.limit;
    let page = router.query.page;
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(1); 
    const [isLoaded, setisLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); 
    const [query, setQuery] = useState('startups'); 
    
        axios.get('https://jsonplaceholder.typicode.com/todos', {
            params: {
                _limit: 10,
                _page: page
            }
        })
            .then(res => {
                setPosts(res.data);
                setPageCount(page);
                setisLoaded(true);
            })
            .catch(err => console.log(err));
    
    const handlePageChange = (selectedObject) => {
		setCurrentPage(selectedObject.selected);
    };
    const add = (event) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title: router.query.title,
        })
            .then(res => {
                console.log(res.data);
            }
        )
            .catch(err => console.log(err));
    };
    const remove = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => {
                console.log('Successfully deleted');
            })
            .catch(err => console.log(err));
    };
    const unDone = (id) => {
        axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
           completed: true
        })
            .then(res => {
                console.log('successfully updated');
            })
            .catch(err => console.log(err));
    };
    const done = (id) => {
        axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: false
        })
            .then(res => {
                console.log('Successfully updated');
            })
            .catch(err => console.log(err));
    };
    return (
       <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="mb-4">
                    <h1 className="text-grey-darkest">Todo List</h1>
                    <form onSubmit={add}>
                        <div className="flex mt-4">
                            <input name="title" className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                            <button type='submit' className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" >Add</button>
                        </div>
                    </form>
                </div>
                <div>
                    {isLoaded ? (
                        posts.map(post => (

                        <div className="flex mb-4 items-center" key= {post.id}>
                            <p className="w-full text-grey-darkest">{post.title}</p>
                                {
                                    post.completed ? (
                                        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={unDone(post.id)}>UnDone</button>) :
                                        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-red border-red hover:bg-red"onClick={done(post.id)}>Done</button>
                                }
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={remove(post.id)}>Remove</button>
                        </div>
                        ))
                    ) : (
                            <div className="flex mb-4 items-center">
                                <p className="w-full text-grey-darkest">Loading...</p>
                            </div>
                    )}
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}