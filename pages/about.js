import Layout from "../src/components/Layout"
import Head from 'next/head'

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About</title>
                <meta name="description" content="About page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 style={{textAlign: "center"}}>About</h1>
            <p style={{textAlign: "center"}}>This is the about page</p>
        </Layout>
    )
}