import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './MoviesSearchHoc';

const MoviesSearch = ({ classes }) => {
  return(
      <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon/>
        </div>
        <InputBase
          placeholder="Search..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
  )
};

export default withHocs(MoviesSearch);