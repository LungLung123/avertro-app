import Form from "../Form/Form";
import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ContainterPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 2, }}>
                    {children}
                </Box>
            )}
        </div>
    )
};

ContainterPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};


function SecTabs() {
    const [value, setValue] = React.useState(0);
    const [FormList, setFormList] = React.useState([<Form />]);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);


    const objectiveHandler = (e) => {
        if (FormList.length < 2) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        let newForm = <Form handleFormDelete={handleFormDelete} />

        setFormList([...FormList, newForm])
    }

    const handleFormDelete = (index) => {
        let data = [...FormList];
        data.splice(index, 1)
        setFormList(data)
        setIsButtonDisabled(false);

    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Security Tabs">
                    <Tab label="Mission & Vision" {...a11yProps(0)} />
                    <Tab label="Strategic Business Objectives" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <ContainterPanel value={value} index={0}>
                <p>Lorem Ipsum</p>
            </ContainterPanel>
            <ContainterPanel value={value} index={1}>
                <Box sx={{ marginBottom: "20px" }}>
                    {FormList.map((singleForm, index) => {
                        return (
                            <Form key={index} num={index + 1} handleFormDelete={() => handleFormDelete(index)} value={singleForm} />
                        )
                    })}
                </Box>
                <Box sx={{ paddingTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button disabled={isButtonDisabled} onClick={objectiveHandler} variant="contained">Add Objectives</Button>
                </Box>
            </ContainterPanel >
        </Box >
    );
}


export default SecTabs;