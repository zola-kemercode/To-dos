import {Component} from 'react'
import Layout from "../src/components/Layout"
import Head from "next/head"

class Blogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: []
        }
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault()

        const post = {
            title: this.state.title,
            body: this.state.body
        }
        
    }
    render() {
        {
        fetch('http://localhost:3000/api/blog')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    blogs: data
                })
            })
        }
                                            
        return (
            <Layout>
                <Head>
                    <title>Blogs</title>
                    <meta name="description" content="Blogs page" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div>
                    <h1 style={{ textAlign: "center" }}>Add Blogs</h1>
                    <div className="flex flex-wrap justify-center">
                        <form>
                            <label htmlFor="title">Title: </label>
                            <input type="text" name="title" style={{ backgroundColor: 'lightgrey' }} onChange={ this.onChange }/><br /><br />
                            <label htmlFor="body"> Body: </label>
                            <textarea name="body" style={{backgroundColor: 'lightgrey'}} onChange={ this.onChange }/><br /><br />
                            <button type="submit" style={{marginLeft: '5rem', backgroundColor: 'lightgrey', borderRadius: '.5rem', width: '100px'}}>Submit</button>
                        </form>
                        <div className="w-full">
                            <h1 style={{ textAlign: "center" }}>Blogs</h1>

                            <div className="flex flex-wrap justify-center">
                                <div className="w-full">
                                    <table className="table-auto" style={{margin: '5rem', marginLeft: '25rem' }}>
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">Title</th>
                                                <th className="px-4 py-2">Year</th>
                                                <th className="px-4 py-2">Genre</th>
                                                <th className="px-4 py-2">Rating</th>
                                                <th className="px-4 py-2">Votes</th>
                                                <th className="px-4 py-2">Runtime</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.blogs.map(blog => {
                                                    return (
                                                        <tr key={ blog.id }>
                                                            <td className="border px-4 py-2">{ blog.title }</td>
                                                            <td className="border px-4 py-2">{blog.year}</td>
                                                            <td className="border px-4 py-2">{blog.genre}</td>
                                                            <td className="border px-4 py-2">{blog.rating}</td>
                                                            <td className="border px-4 py-2">{blog.votes}</td>
                                                            <td className="border px-4 py-2">{blog.running_times}</td>
                                                        </tr>
                                                    )
                                                }
                                                )

                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Blogs