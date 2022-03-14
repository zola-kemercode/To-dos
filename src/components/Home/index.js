import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

export default function Post() { 
    let router = useRouter();
    let limit = router.query.limit;
    let page = 1;
    if(router.query.page) page = router.query.page;
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(1); 
    const [isLoaded, setisLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [query, setQuery] = useState('startups'); 
    useEffect(() => {
        const getPosts = () => {
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
                    setCurrentPage(page);
                })
                .catch(err => console.log(err));
        }
        getPosts();
    }, [page]);
    const handlePageChange = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 10);
        router.push(`/posts?page=${offset}&limit=${limit}`);
    }
    const add = (title) => {
        const data = {
            title,
            completed: false,
            userId: 10
        }
        axios.post('https://jsonplaceholder.typicode.com/todos', data)
            .then(res => {
                console.log(res.data);
            }
        )
            .catch(err => console.log(err));
    };
    const remove = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };
    const unDone = (id) => {
        axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
           completed: false
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };
    const done = (id) => {
        axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: true
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    return (
       <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div className="mb-4">
                    <h1 className="text-grey-darkest">Todo List</h1>
                    <div>
                        <div className="flex mt-4">
                            <input name="title" className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                            <button type='submit' className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" onClick={
                                ()=>add(document.getElementsByName('title')[0].value)
                            }>Add</button>
                        </div>
                    </div>
                </div>
                <div>
                    {isLoaded ? (
                        posts.map(post => (

                        <div className="flex mb-4 items-center" key= {post.id}>
                            <p className="w-full text-grey-darkest">{post.title}</p>
                                {post.completed ? (
                                    <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" id={post.id} onClick={
                                        ()=>unDone(post.id)
                                    }>Undone</button>
                                ) : (
                                        <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" id={post.id} onClick={
                                            ()=>done(post.id)
                                        }>Done</button>
                                )}
                                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" id={post.id} onClick={
                                    ()=>remove(post.id)
                                }>Remove</button>
                        </div>
                        ))
                    ) : (
                            <div className="flex mb-4 items-center">
                                <p className="w-full text-grey-darkest">Loading...</p>
                            </div>
                    )}
                    <div>
                        <button type='submit' className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" onClick={
                            () => {
                                if (currentPage < 2) { 
                                    console.log('No more pages');
                                    router.push(`/?page=${currentPage}`);
                                } else {
                                    setCurrentPage(currentPage--);
                                    router.push(`/?page=${currentPage}`);    
                                }
                                
                            }
                        }>Previous</button>
                        <button type='submit' className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" onClick={
                            () => {
                                setCurrentPage(currentPage++);
                                router.push(`/?page=${currentPage}`);
                            }
                        }>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}