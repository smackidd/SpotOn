import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: "100%",
        fontWeight: "bold",
        flexGrow: 1,
    },
    summary: {
        //backgroundColor: "#f4eded",
    },
    details: {
        fontSize: "90%",
    },
}));

export default function Grid1({onShowActivities, handleChange, expanded}) {
    const classes = useStyles();

    

    return (
        <div className={classes.root}>
            <Accordion 
                name="Activities"
                expanded={expanded} 
                onChange={() => handleChange()} 
                onClick={() => onShowActivities()}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
                    <Typography
                        className={classes.heading}
                        // onClick={(event) => {
                        //     event.stopPropagation();
                        //     alert("Hello");
                        // }}
                    >
                        Choose Activity
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.details}>
                        Choose 1
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
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
        </div>
    );
}
