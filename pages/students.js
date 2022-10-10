import { LoadingButton } from '@mui/lab';
import { Backdrop, Button, Card, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import ProductPerfomance from 'components/dashboard/ProductPerfomance';
import { DeleteStudents, GetAllStudents } from 'gql/hook/students';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import React, { useState } from 'react';
import FeatherIcon from "feather-icons-react";
import moment from 'moment/moment';

import { Fade } from "../src/components/animation/fade";
import { FastField, Field, Form, Formik } from 'formik';
import useDisclosure from 'hook/useDisclosure';

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


function Students() {
    const { data, error, loading, refetch } = GetAllStudents();
    const { deleteStudent, error: errorDeleteStudents, loading: loadingDeleteStudents } = DeleteStudents();
    const { open, handleClose, handleOpen } = useDisclosure();

    const onDelete = async (values) => {
        await deleteStudent({
            variables: {
                deleteStudentId: values
            },
        });
        refetch();
    };


    const headerTable = [
        {
            Header: 'NIS',
            accessor: 'nis',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Birth Date/Places',
            accessor: null,
            Cell: ({ row }) => (
                <>
                    {`${row.original.birth_place} / ${moment(row.original.birth_date).format("ll")}`}
                </>
            )
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Gender',
            accessor: 'gender',
            Cell: ({ row, value }) => (
                <>
                    {value ? <Chip label="Male" color="info" variant="outlined" sx={{ cursor: 'pointer' }} /> : <Chip label="Female" color="error" variant="outlined" sx={{ cursor: 'pointer' }} />}
                </>
            )
        },
        {
            Header: 'Action',
            accessor: null,
            Cell: ({ row }) => (
                <Stack direction='row' justifyContent='space-between' spacing={5}>
                    <Button variant="contained" color="warning">
                        Edit
                    </Button>
                    <LoadingButton variant="contained" color="error" onClick={() => onDelete(row.original.id)} loading={loadingDeleteStudents}>
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
                    <ProductPerfomance tableData={data?.students ?? []} header={headerTable} tableTitle={<>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" display="flex" width="100%">
                            <Typography variant="h4">Students Table</Typography>
                            <Button variant="contained" color="success" onClick={handleOpen}>
                                Add
                            </Button>
                        </Stack>
                    </>} />
                </Grid>
            </Grid>
            <CustomModal onClose={handleClose} open={open} onSubmit={() => { }} loading={false} listMenu={[]} />
        </>
    );
}

export default Students;