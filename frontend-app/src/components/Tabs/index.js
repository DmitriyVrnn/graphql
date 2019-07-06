import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import CameraIcon from '@material-ui/icons/Camera';

import Movies from '../Movies';
import Directors from '../Directors';

import withHoc from './TabsHoc';

const TabContainer = ({children, dir}) => (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
);

const SimpleTabs = ({ classes, theme }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, value) => { setValue(value) };
  const handleChangeIndex = index => { setValue(index) };

  return (
      <div className={classes.root}>
        <AppBar position="static">
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
              <Tab label="Movies" icon={<CameraIcon/>}/>
              <Tab label="Directors" icon={<MovieCreationIcon/>}/>
            </Tabs>
        </AppBar>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
          <TabContainer dir={theme.direction}><Movies/></TabContainer>
          <TabContainer dir={theme.direction}><Directors/></TabContainer>
        </SwipeableViews>
      </div>
  )
};

export default withHoc(SimpleTabs);