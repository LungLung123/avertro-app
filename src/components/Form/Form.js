import './Form.css';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Form = (props) => {
    const [dateValue, setValue] = React.useState(dayjs());
    const [KmList, setKmList] = React.useState([]);
    const [kmText, setKmText] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const handleDelete = () => props.handleDelete(props.num);

    const deleteHandler = (index) => {
        const newKmList = KmList.filter(el => el.id !== index);
        setKmList(newKmList);
    };

    const kmTextHandler = (e) => {
        console.log(e.target.key);
        console.log(e.target.value)
    };

    const kmAddHandler = (e) => {
        console.log("I pressed Objective")
        if (KmList.length === 2) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
        setKmList(KmList.concat(
            <Grid key={KmList.length} container alignItems="center" sx={{ marginBottom: "15px" }} spacing={2.5}>
                <Grid display="grid" item sm={11}>
                    <TextField variant="outlined" onChange={kmTextHandler} />
                </Grid>
                <Grid item sm={1}>
                    <IconButton onClick={deleteHandler}><RemoveCircleIcon style={{ fill: "red" }} /></IconButton>
                </Grid>
            </Grid>
        ));

    };

    const startDateHandler = (newStartDateValue) => {
        setValue(newStartDateValue);
    };

    const endDateHandler = (newEndDateValue) => {
        setValue(newEndDateValue);
    };
    return (
        <Box sx={{
            border: 1,
            borderColor: "grey",
            borderRadius: 5,
            p: 3,
            marginBottom: "24px"
        }}>
            <Grid container spacing={3}>
                <Grid container item sm={6}>
                    <Grid display="grid" item sm={11}>
                        <FormControl fullWidth sx={{}} variant="standard">
                            <h2>Objective {props.num}</h2>
                            <TextField id="obj" variant="outlined" display="flex" />
                        </FormControl>
                    </Grid>
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container item xs={6} spacing={2}>
                        <Grid display="grid" item xs={6}>
                            <h2>Start Date</h2>
                            <DesktopDatePicker
                                InputAdornmentProps={{ position: 'start' }}
                                inputFormat="DD/MM/YYYY"
                                value={dateValue}
                                onChange={startDateHandler}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid display="grid" item xs={6} >
                            <h2>End Date</h2>
                            <DesktopDatePicker
                                InputAdornmentProps={{ position: 'start' }}
                                inputFormat="DD/MM/YYYY"
                                value={dateValue}
                                onChange={endDateHandler}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <Grid container item xs={6}>
                    <Grid display="grid" item sm={11}>
                        <Box display="flex" justifyContent="space-between">
                            <h2>Key Measures</h2>
                            <Box display="flex" justifyContent='flex-end' alignItems="center">
                                <p>Add additional key Measures</p>
                                <IconButton disabled={isButtonDisabled} onClick={kmAddHandler}><AddCircleIcon style={{ fill: "#253a7d" }} /></IconButton>
                            </Box>
                        </Box>
                    </Grid>
                    <FormControl fullWidth variant="standard">
                        {KmList}
                    </FormControl>
                </Grid>
                <Grid sx={{ alignSelf: 'flex-end' }} item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className="obj-button" variant="outlined" color="error" onClick={handleDelete.bind(this)}>Delete</Button>
                        <Button sx={{ marginLeft: "2%" }} variant="contained">Update</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Form

