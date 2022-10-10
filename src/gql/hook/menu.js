import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MENU, DELETE_MENU } from "../mutations/menu";
import { GET_ALL_MENU } from "../query/menu";

export const GetAllMenu = () => {
    const { data, loading, error, refetch } = useQuery(GET_ALL_MENU);

    return { data, loading, error, refetch };
};

export const CreateMenu = () => {
    const [addMenu, { data, loading, error }] = useMutation(CREATE_MENU);

    return {
        addMenu,
        data, loading, error
    };
};

export const DeleteMenu = () => {
    const [deleteMenu, { data, loading, error }] = useMutation(DELETE_MENU);

    return {
        deleteMenu,
        data, loading, error
    };
};