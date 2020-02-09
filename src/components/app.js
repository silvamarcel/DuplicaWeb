import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './layouts/Header';
import Content from './layouts/Content';
import menu from './layouts/menu';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <Suspense fallback="loading">
        <div className={classes.app}>
          <CssBaseline />
          <Header menu={menu} />
          <Content />
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
