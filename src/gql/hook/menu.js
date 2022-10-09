import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MENU } from "../mutations/menu";
import { GET_ALL_MENU } from "../query/menu";

export const GetAllMenu = () => {
    const { data, loading, error } = useQuery(GET_ALL_MENU);

    return { data, loading, error };
};

export const CreateMenu = () => {
    const [addMenu, { data, loading, error }] = useMutation(CREATE_MENU);

    return {
        addMenu,
        data, loading, error
    };
};