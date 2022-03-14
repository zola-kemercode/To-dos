import Layout from "../src/components/Layout"
import Head from 'next/head'

export default function Blog() {
    return (
        <Layout>
            <Head>
                <title>Blog</title>
                <meta name="description" content="About page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 style={{textAlign: "center"}}>Blog</h1>
            <p style={{textAlign: "center"}}>This is the Blog page</p>
        </Layout>
    )
}