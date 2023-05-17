import Mongoose from 'mongoose';

const PostSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
    },
    tags: {
        type: [String],
        trim:true
    },
    likes: {
        type: [String],
        default: [],
    },
    selectedFile:{
        type:String
    },

}, {
    timestamps: true,
});

const Post = Mongoose.model('Post', PostSchema);
export default Post;