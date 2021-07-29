import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width: "auto"
  },
  input: {
    width: 42,
  },
  slider: {
    marginBottom: 5
  },
  heading: {
    fontSize: "75%",
    fontWeight: "bold",
    flexGrow: 1,
  },
});


export default function PreiviewListSlider(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(250);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.handlePreviewListSize(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.handlePreviewListSize(event.target.value);
  };

  const handleBlur = () => {
    if (value < 50) {
      setValue(50);
    } else if (value > 500) {
      setValue(500);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom className={classes.heading}>
        Preview List Size
      </Typography>
      <Grid container spacing={2} alignItems="center" className={classes.slider}>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 250}
            min={50}
            max={500}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: 50,
              max: 500,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      
      
    </div>
  );
}