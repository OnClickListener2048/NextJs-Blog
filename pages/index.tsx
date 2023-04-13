import Image from 'next/image'
import {Inter} from 'next/font/google'
import {getSortedPostsData, MdContent} from '@/lib/posts'
import {GetStaticProps, GetStaticPaths, GetServerSideProps} from 'next'
import Link from "next/link";

export const getStaticProps: GetServerSideProps = async context => {
    console.log(context)
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}


const inter = Inter({subsets: ['latin']})


export default function Home({allPostsData}: { allPostsData: MdContent[] }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ul>
                {allPostsData.map(({id, date, title}) => (
                    <li key={id}>
                        <Link href={`/posts/${id}`}>{title}</Link>
                        <br/>
                        <small>
                            <div>{date}</div>
                        </small>
                    </li>
                ))}
            </ul>
        </main>
    )
}

