import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import PreivewListSlider from './Sliders/PreviewListSlider';
import FinalListSlider from './Sliders/FinalListSlider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        
    },
    buttons: {
        marginTop: "12px",
        
    }, 
    heading: {
        fontSize: "75%",
        fontWeight: "bold",
        flexGrow: 1,
    },
    summary: {
        //backgroundColor: "#f4eded",
    },
    details: {
        fontSize: "80%",
    },
}));

export default function Grid1(props) {
    const classes = useStyles();
    const { expanded, handleChange, filters, getTracks } = props;

    
    

    return (
        <div className={classes.root}>
            <h2>Filter List:</h2>
            
            <Accordion 
                name="Activities"
                expanded={expanded.panel1} 
                onChange={handleChange('panel1')} 
                //onClick={handleChange('panel1')}
                >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
                    <Typography
                        className={classes.heading}
                        // onClick={(event) => {
                        //     event.stopPropagation();
                        //     alert("Hello");
                        // }}
                        // onFocus={(event) => event.stopPropagation()}
                    >
                        Choose Activity {filters.panel1 && <p>{" - " + filters.panel1}</p>}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.details}>
                        {"Choose 1"}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                name="genres"
                // expanded={expanded === 'panel2'} 
                // onChange={handleChange('panel2')}
                //onClick={handleChange('panel2')}
                >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
                    <Typography
                        className={classes.heading}
                        //onClick={(event) => { event.stopPropagation() }}
                    >
                        Choose Genre
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.details}>
                        Choose upto 3
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
                    <Typography
                        className={classes.heading}
                        //onClick={(event) => { event.stopPropagation() }}
                    >
                        Choose Era
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.details}>
                        Choose upto 3
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <PreivewListSlider></PreivewListSlider>
            <FinalListSlider></FinalListSlider>

            <ButtonGroup variant="contained" color="primary"  orientation="vertical" size="medium" className={classes.buttons}>
                <Button variant="outlined">Clear</Button>
                <Button disabled={filters ? false : true} onClick={(event) => getTracks(filters.panel1)}>Generate Preview</Button>
            </ButtonGroup>
        </div>
    );
}
