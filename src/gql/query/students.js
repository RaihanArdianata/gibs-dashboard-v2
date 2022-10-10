import { gql, useQuery } from "@apollo/client";

export const GET_ALL_STUDENTS = gql`
query Students {
    students {
      id
      nis
      name
      address
      gender
      email
      religion
      join_date
      photo
      phone
      country_code
      birth_place
      birth_date
      row_status
      created_at
      created_by
    }
  }
`;