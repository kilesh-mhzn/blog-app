import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Not Started', 'In Progress', 'Completed'],
            default: 'Not Started',
        },

        summary: {
            type: String,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Task', TaskSchema);
