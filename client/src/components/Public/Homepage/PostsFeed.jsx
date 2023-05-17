import { useSelector } from 'react-redux';
import Post from './Post';
import { CircularProgress } from '@material-ui/core';

const PostsFeed = () => {
    const posts = useSelector((state) => state?.publicPost?.posts);
    return (
        <>
            {!posts && (
                <div className="w-full h-96  flex items-center justify-center">
                    <CircularProgress />
                </div>
            )}
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts?.map((post) => {
                    return <Post key={post._id} post={post} />;
                })}
            </div>
        </>
    );
};

export default PostsFeed;
