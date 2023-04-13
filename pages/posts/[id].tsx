import {GetStaticPaths} from "next";
import {getAllPostIds, getPostData, MdContent} from "@/lib/posts";
import Head from 'next/head'
import Date from "@/lib/date";

export default function Post({postData}: { postData: MdContent }) {
    return <div>
        <Head><title>{postData.title}</title></Head>

        <br/>
        {postData.id}
        <br/>
        <Date dateString={postData.date}></Date>
        <div dangerouslySetInnerHTML={{__html: postData.content ?? ""}}/>
    </div>;
}

export const getStaticPaths: GetStaticPaths = async context => {
    // Return a list of possible value for id
    return {
        paths: getAllPostIds(),
        fallback: false,

    }
}

export async function getStaticProps({params}: { params: { id: string } }) {
    // Fetch necessary data for the blog post using params.id
    let postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}