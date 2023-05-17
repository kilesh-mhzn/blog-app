import { Button } from '@material-ui/core';
import { TagsControl, TextEllipsis } from '../../Utils/textControl';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <>
            <div className="col-span-1 card overflow-hidden flex flex-col justify-between bg-slate-100">
                <div>
                    <div className="h-[9rem] overflow-hidden bg-gradient-to-r from-sky-500 to-indigo-500">
                        <img src={post.selectedFile} alt="" />
                    </div>
                    <div className="p-4 space-y-2">
                        <Link to={`/post/${post._id}`}>
                            <p className="text-bold text-slate-500 text-lg">
                                {post.title}
                            </p>
                        </Link>
                        <p>
                            <TagsControl>{post?.tags}</TagsControl>
                        </p>
                        <TextEllipsis>{post.content}</TextEllipsis>
                    </div>
                </div>
                {/* <div className="flex justify-between p-4">
                    <Button>Like</Button>
                    <Button>Delete</Button>
                </div> */}
            </div>
        </>
    );
};

export default Post;
