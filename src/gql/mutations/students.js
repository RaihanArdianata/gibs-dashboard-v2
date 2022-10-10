import { gql, useQuery } from "@apollo/client";

export const CREATE_STUDENTS = gql`
mutation Mutation($data: TStudentInput!) {
    addStudent(data: $data) {
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

export const DELETE_STUDENTS = gql`
mutation DeleteStudent($deleteStudentId: String!) {
  deleteStudent(id: $deleteStudentId)
}
`;