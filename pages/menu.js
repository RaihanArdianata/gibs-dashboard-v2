import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Backdrop, Button, Card, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import { Fade } from "../src/components/animation/fade";
import { CreateMenu, GetAllMenu } from '../src/gql/hook/menu';
import useDisclosure from '../src/hook/useDisclosure';
import { Formik, Field, Form, FastField } from "formik";
import LoadingButton from '@mui/lab/LoadingButton';

function createData(name, age, sex, country, salary) {
    return { name, age, sex, country, salary };
}
// add data
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
                <Button variant="contained" color="error">
                    Delete
                </Button>
            </Stack>
        )
    },
];

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

const CustomModal = ({ open, onClose, onSubmit, loading }) => {
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
                                        hasParent && <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Parent Menu</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={age}
                                                // onChange={handleChange}
                                                label="Age"
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox onClick={() => setHasParent(!hasParent)} value={hasParent} />}
                                            label="Has Parent"
                                        />
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
    const { data, error, loading } = GetAllMenu();
    const { addMenu, error: errorCreateMenu, loading: loadingCreateMenu } = CreateMenu();
    const { open, handleClose, handleOpen } = useDisclosure();

    const onSubmit = (values) => {
        addMenu({
            variables: {
                data: {
                    ...values,
                },
            },
        });
    };

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
            <CustomModal onClose={handleClose} open={open} onSubmit={onSubmit} loading={loadingCreateMenu} />
        </>
    );
}

export default Menu;