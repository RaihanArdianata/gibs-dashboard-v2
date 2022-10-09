import { gql, useQuery } from "@apollo/client";

export const GET_ALL_MENU = gql`
    query {
        menuList {
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