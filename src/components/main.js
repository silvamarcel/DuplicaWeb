import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './layouts/Header';
import Content from './layouts/Content';
import menu from './layouts/menu';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex'
  }
}));

const Main = (props) => {
  if (!props.api.auth.isAuthenticated()) {
    return <Redirect to='/login' />;
  }
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Header menu={menu} auth={props.api.auth} />
      <Content api={props.api} />
    </div>
  );
};

Main.propTypes = {
  auth: PropTypes.object,
  api: PropTypes.object
};

export default Main;
