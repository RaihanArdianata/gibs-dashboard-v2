import { gql, useQuery } from "@apollo/client";

export const CREATE_MENU = gql`
    mutation Mutation($data: TMenuInput!) {
            addMenu(data: $data) {
                id
                parentId
                name
                url
                level
                menuImage
                sort_number
                row_status
                created_at
                created_by
                children {
                name      
            }
        }
    }
`;
export const DELETE_MENU = gql`
    mutation Mutation($data: TMenuInput!) {
            addMenu(data: $data) {
                id
                parentId
                name
                url
                level
                menuImage
                sort_number
                row_status
                created_at
                created_by
                children {
                name      
            }
        }
    }
`;