import { LoadingButton } from '@mui/lab';
import { Backdrop, Button, Paper, Card, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography, TextareaAutosize } from '@mui/material';
import ProductPerfomance from 'components/dashboard/ProductPerfomance';
import { CreateStudents, DeleteStudents, GetAllStudents } from 'gql/hook/students';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import React, { useState } from 'react';
import FeatherIcon from "feather-icons-react";
import moment from 'moment/moment';

import { Fade } from "../src/components/animation/fade";
import { FastField, Field, Form, Formik } from 'formik';
import useDisclosure from 'hook/useDisclosure';
import { styled } from '@mui/material/styles';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { sm: 500, md: 800, xs: 400 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
                        Add Students
                    </Typography>
                    <Formik
                        initialValues={{
                            name: null,
                            nis: null,
                            country_code: null,
                            phone: null,
                            photo: null,
                            email: null,
                            password: null,
                            gender: null,
                            religion: null,
                            join_date: null,
                            birth_place: null,
                            birth_date: null,
                            address: null,
                        }}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}
                    >
                        {({ handleSubmit, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <FastField name="nis">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="nis-basic"
                                                        label="NIS"
                                                        type="number"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FastField name="name">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="name-basic"
                                                        label="Name"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FastField name="country_code">
                                                {({ field, form }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel id="phone-simple-select-label">Country Code</InputLabel>
                                                        <Select
                                                            labelId="country-code-simple-select-label"
                                                            id="country-code-simple-select"
                                                            label="country_code"
                                                            {...field}
                                                        >
                                                            <MenuItem value="+62">+62</MenuItem>
                                                        </Select>
                                                    </FormControl>)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FastField name="phone">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="phone-basic"
                                                        label="Phone"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FastField name="join_date">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="join-date-basic"
                                                        label="Join Date"
                                                        type="date"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FastField name="email">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="email-basic"
                                                        label="Email"
                                                        type="email"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FastField name="birth_date">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="birth-date-basic"
                                                        label="Birth Date"
                                                        type="date"
                                                        variant="outlined"
                                                        value={new Date()}
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FastField name="birth_place">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="birth-place-basic"
                                                        label="Birth Place"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField name="password">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="password-basic"
                                                        label="Password"
                                                        type="password"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FastField name="gender">
                                                {({ field, form }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel id="gender-simple-select-label">Gender</InputLabel>
                                                        <Select
                                                            labelId="gender-simple-select-label"
                                                            id="gender-simple-select"
                                                            label="gender"
                                                            {...field}
                                                        >
                                                            <MenuItem value={0}>Female</MenuItem>
                                                            <MenuItem value={1}>Male</MenuItem>
                                                        </Select>
                                                    </FormControl>)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FastField name="religion">
                                                {({ field, form }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel id="religion-simple-select-label">Religion</InputLabel>
                                                        <Select
                                                            labelId="religion-simple-select-label"
                                                            id="religion-simple-select"
                                                            label="religion"
                                                            {...field}
                                                        >
                                                            <MenuItem value="Islam">Islam</MenuItem>
                                                            <MenuItem value="Kristen">Kristen</MenuItem>
                                                            <MenuItem value="Hindu">Hindu</MenuItem>
                                                            <MenuItem value="Buddha">Buddha</MenuItem>
                                                        </Select>
                                                    </FormControl>)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField name="photo">
                                                {({ field, form }) => (
                                                    <TextField
                                                        id="image-url-basic"
                                                        label="Image URL"
                                                        type="text"
                                                        variant="outlined"
                                                        fullWidth
                                                        {...field}
                                                    />)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField name="address">
                                                {({ field, form }) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="address-basic"
                                                            label="Address"
                                                            variant="outlined"
                                                            multiline
                                                            rows={4}
                                                            {...field}
                                                        />
                                                    </FormControl>)}
                                            </FastField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                disabled
                                                control={<Checkbox />}
                                                label="Upload Image Manual"
                                            />
                                        </Grid>
                                    </Grid>
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
    const { addStudent, error: errorCreateStudent, loading: loadingCreateStudent } = CreateStudents();
    const { deleteStudent, error: errorDeleteStudents, loading: loadingDeleteStudents } = DeleteStudents();
    const { open, handleClose, handleOpen } = useDisclosure();

    const onSubmit = async (values) => {
        await addStudent({
            variables: {
                data: {
                    ...values,
                },
            },
        });
        refetch();
        handleClose();
    };

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
            <CustomModal onClose={handleClose} open={open} onSubmit={onSubmit} loading={loadingCreateStudent} listMenu={[]} />
        </>
    );
}

export default Students;