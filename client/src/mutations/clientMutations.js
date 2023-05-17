import { gql } from '@apollo/client';

const DELETE_CLIENT = gql`
    mutation DeleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            phone
            email
        }
    }
`;

const ADD_CLIENT = gql`
    mutation AddClient($name: String!, $phone: String!, $email: String!) {
        addClient(name: $name, phone: $phone, email: $email) {
            id
            name
            phone
            email
        }
    }
`;

export { DELETE_CLIENT, ADD_CLIENT };
