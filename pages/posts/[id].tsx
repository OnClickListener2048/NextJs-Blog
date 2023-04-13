import {GetStaticPaths} from "next";
import {getAllPostIds, getPostData, MdContent} from "@/lib/posts";

export default function Post({postData}:{postData:MdContent}) {
    return <div>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
    </div>
}

export const getStaticPaths: GetStaticPaths = async context => {
    // Return a list of possible value for id
    return {
        paths:getAllPostIds(),
        fallback: false,

    }
}

export async function getStaticProps({params}: { params: {id:string} }) {
    // Fetch necessary data for the blog post using params.id
    let postData = getPostData(params.id);
    return {
        props:{
            postData
        }
    }
}