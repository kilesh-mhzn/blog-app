import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} from 'graphql';
//mongoose models
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

//status enum
const statusEnum = new GraphQLEnumType({
    name: 'statusEnum',
    values: {
        NotStarted: { value: 'Not Started' },
        InProgress: { value: 'In Progress' },
        Completed: { value: 'Completed' },
    },
});

//client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        status: { type: GraphQLString },
        summary: { type: GraphQLString },
        projectId: { type: GraphQLID },
    }),
});

//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({ projectId: parent.id });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve() {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return Client.findById(args.id);
            },
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return Project.findById(args.id);
            },
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve() {
                return Task.find();
            },
        },
    },
});

//mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add Task
        addTask: {
            type: TaskType,
            args: {
                title: { type: GraphQLString },
                // status: { type: statusEnum },
                status: {
                    type: new GraphQLEnumType({
                        name: 'TaskStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                summary: { type: GraphQLString },
                projectId: { type: GraphQLID },
            },
            resolve(parentValue, args) {
                const task = new Task({
                    title: args.title,
                    status: args.status,
                    summary: args.summary,
                    projectId: args.projectId,
                });
                return task.save();
            },
        },

        //deleteTask
        deleteTask: {
            type: TaskType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parentValue, args) {
                return Task.findByIdAndRemove(args.id);
            },
        },

        //add client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { name, email, phone }) {
                const client = new Client({
                    name,
                    email,
                    phone,
                });
                return client.save();
            },
        },
        //delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue, { id }) {
                return Client.findByIdAndRemove(id);
            },
        },
        //add project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue, { name, description, status, clientId }) {
                const project = new Project({
                    name,
                    description,
                    status,
                    clientId,
                });
                return project.save();
            },
        },
        //delete project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue, { id }) {
                return Project.findByIdAndRemove(id);
            },
        },
        //update project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parentValue, { id, name, description, status }) {
                return Project.findByIdAndUpdate(
                    id,
                    { $set: { name, description, status } },
                    { new: true }
                );
            },
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation,
});
