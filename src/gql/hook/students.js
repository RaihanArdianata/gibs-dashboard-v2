import { useMutation, useQuery } from "@apollo/client";
import { CREATE_STUDENTS, DELETE_STUDENTS } from "gql/mutations/students";
import { GET_ALL_STUDENTS } from "gql/query/students";

export const GetAllStudents = () => {
    const { data, loading, error, refetch } = useQuery(GET_ALL_STUDENTS);

    return { data, loading, error, refetch };
};

export const CreateStudents = () => {
    const [addStudent, { data, loading, error }] = useMutation(CREATE_STUDENTS);

    return {
        addStudent,
        data, loading, error
    };
};

export const DeleteStudents = () => {
    const [deleteStudent, { data, loading, error }] = useMutation(DELETE_STUDENTS);

    return {
        deleteStudent,
        data, loading, error
    };
};


