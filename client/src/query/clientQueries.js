import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
    query GetClients {
        clients {
            id
            name
            phone
            email
        }
    }
`;

export { GET_CLIENTS };
