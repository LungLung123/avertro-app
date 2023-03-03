import './Form.css';

import React from 'react';
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
    const [FormInputs, setFormInputs] = React.useState({});
    const [ObjectiveValue, setObjectiveValue] = React.useState("")
    const [dateStartValue, setStartValue] = React.useState(dayjs());
    const [dateEndValue, setEndValue] = React.useState(dayjs());
    const [KmList, setKmList] = React.useState([{ keyMeasure: "" }]);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const handleFormDelete = () => props.handleFormDelete(props.objectiveId);


    const ObjectiveValueHandler = (e) => {
        setObjectiveValue(e.target.value);
    };

    const kmTextHandler = (e, index) => {
        const data = [...KmList];
        const { name, value } = e.target;
        data[index][name] = value;
        setKmList(data);
    };

    const startDateHandler = (e) => {
        setStartValue(e);
    };

    const endDateHandler = (e) => {
        setEndValue(e);
    };



    const deleteHandler = (index) => {
        let data = [...KmList];
        data.splice(index, 1)
        setKmList(data);
        setIsButtonDisabled(false);
    };

    const updateHandler = (e) => {
        e.preventDefault();
        setFormInputs({
            ObjectiveId: props.objectiveId,
            Objective: ObjectiveValue,
            StartDate: dateStartValue.toString(),
            EndDate: dateEndValue.toString(),
            KeyMeasure: KmList
        });
        console.log(FormInputs)
    }

    const kmAddHandler = () => {
        if (KmList.length < 2) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        let newKm = { keyMeasure: "" };
        setKmList([...KmList, newKm]);

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
                            <TextField id="ObjectiveText" variant="outlined" display="flex" onChange={ObjectiveValueHandler} value={ObjectiveValue} />
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
                                value={dateStartValue}
                                onChange={(e) => startDateHandler(e)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid display="grid" item xs={6} >
                            <h2>End Date</h2>
                            <DesktopDatePicker
                                disablePast={true}
                                InputAdornmentProps={{ position: 'start' }}
                                inputFormat="DD/MM/YYYY"
                                value={dateEndValue}
                                onChange={(e) => endDateHandler(e)}
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
                        {KmList.map((singleKm, index) => {
                            return (
                                <Grid key={index} container alignItems="center" sx={{ marginBottom: "15px" }} spacing={2.5}>
                                    <Grid display="grid" item sm={11}>
                                        <TextField name="keyMeasure" onChange={(e) => kmTextHandler(e, index)} value={singleKm.keyMeasure} />
                                    </Grid>
                                    <Grid item sm={1}>
                                        {KmList.length > 1 && (
                                            <IconButton onClick={() => deleteHandler(index)}><RemoveCircleIcon style={{ fill: "red" }} /></IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </FormControl>
                </Grid>
                <Grid sx={{ alignSelf: 'flex-end' }} item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className="obj-button" variant="outlined" color="error" onClick={handleFormDelete.bind(this)}>Delete</Button>
                        <Button sx={{ marginLeft: "2%" }} onClick={updateHandler} variant="contained">Update</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Form

