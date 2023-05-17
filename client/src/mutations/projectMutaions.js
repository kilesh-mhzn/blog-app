import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
    mutation AddProject(
        $name: String!
        $description: String!
        $status: ProjectStatus!
        $clientId: ID!
    ) {
        addProject(
            name: $name
            description: $description
            status: $status
            clientId: $clientId
        ) {
            id
            name
            description
            status
            client {
                id
                name
                phone
                email
            }
        }
    }
`;

const DELETE_PROJECT = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

const ADD_TASK = gql`
    mutation AddTask(
        $title: String
        $status: TaskStatus
        $summary: String
        $projectId: ID
    ) {
        addTask(
            title: $title
            status: $status
            summary: $summary
            projectId: $projectId
        ) {
            id
            title
            status
            summary
            projectId
        }
    }
`;

// const UPDATE_PROJECT = gql`
//     mutation UpdateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatus!) {

//     }
// `;

export { ADD_PROJECT, DELETE_PROJECT, ADD_TASK };
