import BlogNav from '../../components/BlogNav';
import Prism from 'prismjs';
import PrismJsx from 'prismjs/components/prism-jsx';
import { useEffect } from 'react';
import { getAllPostIds, getPostData } from '../../../lib/posts';

const Post = ({ postData }) => {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <>
            <BlogNav />
            <div className='my-16 p-10 max-w-4xl mx-auto text-gray-800 bg-gray-200 rounded-md'>
                <article>
                    <div className='flex justify-between items-end border-b border-indigo-200'>
                        <h3 className='text-4xl text-teal-700 inline'>{postData.title}</h3>
                        <span className='text-gray-600'>
                            {new Date(postData.date).toLocaleDateString()}
                        </span>
                    </div>
                    <div
                        className='mt-8 prose max-w-none'
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </article>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData
        }
    }
}

export default Post;
