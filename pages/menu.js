import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Backdrop, Button, Card, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import ProductPerfomance from "components/dashboard/ProductPerfomance";
import { CreateMenu, DeleteMenu, GetAllMenu } from '../src/gql/hook/menu';
import useDisclosure from '../src/hook/useDisclosure';
import { Formik, Field, Form, FastField } from "formik";
import LoadingButton from '@mui/lab/LoadingButton';
import { Fade } from "components/animation/fade";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const CustomModal = ({ open, onClose, onSubmit, loading, listMenu }) => {
    const [hasParent, setHasParent] = useState(false);
    const [uploadManual, setUploadManual] = useState(false);
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Card sx={style}>
                    <Typography id="spring-modal-title" variant="h6" component="h1" fontSize={20} pb={5}>
                        Create Menu
                    </Typography>
                    <Formik
                        initialValues={{
                            name: "",
                            url: "",
                            menuImage: "",
                            parentId: null,
                            sort_number: 0,
                        }}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}
                    >
                        {({ handleSubmit, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <FastField name="name">
                                        {({ field, form }) => (
                                            <TextField
                                                id="menu-name-basic"
                                                label="Menu Name"
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    </FastField>
                                    <FastField name="url">
                                        {({ field, form }) => (
                                            <TextField
                                                id="path-basic"
                                                label="URL Path"
                                                type="text"
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    </FastField>
                                    <FastField name="menuImage">
                                        {({ field, form }) => (
                                            <TextField
                                                id="image-basic"
                                                label="Image URL"
                                                type="text"
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    </FastField>
                                    <FastField name="sort_number">
                                        {({ field, form }) => (
                                            <TextField
                                                id="sort-number-basic"
                                                label="Sort Number"
                                                type="number"
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    </FastField>
                                    {
                                        hasParent && <FastField name="parentId">
                                            {({ field, form }) => (
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Parent Menu</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Age"
                                                        {...field}
                                                    >
                                                        {
                                                            listMenu.map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </FastField>
                                    }
                                    <FormGroup>
                                        <Field name="parentId">
                                            {({ field, form }) => (
                                                <FormControlLabel
                                                    control={<Checkbox onClick={() => {
                                                        setHasParent(!hasParent);
                                                        form.setFieldValue('parentId', null);
                                                    }} value={hasParent} />}
                                                    label="Has Parent"
                                                />
                                            )}
                                        </Field>
                                        <FormControlLabel
                                            disabled
                                            control={<Checkbox onClick={() => setUploadManual(!uploadManual)} value={uploadManual} />}
                                            label="Upload Image Manual"
                                        />
                                    </FormGroup>
                                </Stack>
                                <br />
                                <LoadingButton variant="contained" mt={2} type="submit" loading={loading}>
                                    Submit
                                </LoadingButton>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Fade>
        </Modal>
    );
};

function Menu() {
    const { data, error, loading, refetch } = GetAllMenu();
    const { addMenu, error: errorCreateMenu, loading: loadingCreateMenu } = CreateMenu();
    const { deleteMenu, error: errorDeleteMenu, loading: loadingDeleteMenu } = DeleteMenu();
    const { open, handleClose, handleOpen } = useDisclosure();

    const onSubmit = async (values) => {
        await addMenu({
            variables: {
                data: {
                    ...values,
                },
            },
        });
        refetch();
    };

    const onDelete = async (values) => {
        await deleteMenu({
            variables: {
                deleteMenuId: values
            },
        });
        refetch();
    };

    const headerTable = [
        {
            Header: 'Menu Name',
            accessor: 'name',
        },
        {
            Header: 'URL',
            accessor: 'url',
        },
        {
            Header: 'Image',
            accessor: 'menuImage',
            Cell: ({ row }) => (
                row.original.menuImage && <Chip label="Preview" color="primary" variant="outlined" sx={{ cursor: 'pointer' }} />
            )
        },
        {
            Header: 'Level',
            accessor: 'level',
        },
        {
            Header: 'Action',
            accessor: null,
            Cell: ({ row }) => (
                <Stack direction='row' justifyContent='space-between' spacing={5}>
                    <Button variant="contained" color="warning">
                        Edit
                    </Button>
                    <LoadingButton variant="contained" color="error" onClick={() => onDelete(row.original.id)} loading={loadingDeleteMenu}>
                        Delete
                    </LoadingButton>
                </Stack>
            )
        },
    ];

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={12}>
                    <ProductPerfomance tableData={data?.menuList ?? []} header={headerTable} tableTitle={<>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" display="flex" width="100%">
                            <Typography variant="h4">Menu Table</Typography>
                            <Button variant="contained" color="success" onClick={handleOpen}>
                                Add
                            </Button>
                        </Stack>
                    </>} />
                </Grid>
            </Grid>
            <CustomModal onClose={handleClose} open={open} onSubmit={onSubmit} loading={loadingCreateMenu} listMenu={data?.menuList ?? []} />
        </>
    );
}

export default Menu;