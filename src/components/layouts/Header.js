import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Collapse,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  listItemClose: {
    paddingLeft: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Header = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  const handleClick = index => () => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawer}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={'h5'} color={'inherit'}>{ props.title || 'Duplica' }</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {/*<MenuList >*/}
        {/*  <MenuItem to='/settings' >*/}
        {/*    <ListItemIcon><SettingsIcon /></ListItemIcon>*/}
        {/*    <ListItemText primary='Settings' />*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem component={Link} to='/factory' className={classes.nested}>*/}
        {/*    <ListItemIcon><LocationCityIcon /></ListItemIcon>*/}
        {/*    <ListItemText primary='Factory' />*/}
        {/*  </MenuItem>*/}
        {/*</MenuList>*/}
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem
          className={clsx(classes.listItem, {
            [classes.listItemClose]: !open
          })}
          button
          component={Link}
          to='/'
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        {props.menu.map(({ name, menus = [], icon: IconComponent }, index) => (
          <Fragment key={index}>
            <ListItem
              className={clsx(classes.listItem, {
                [classes.listItemClose]: !open
              })}
              button
              onClick={handleClick(index)}
            >
              <ListItemIcon><IconComponent /></ListItemIcon>
              <ListItemText primary={name} />
              {openIndex === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openIndex === index} timeout='auto' unmountOnExit>
              <>
                <List component='div' disablePadding>
                  {menus.map(({ name, to = '/', icon: IconComponent }, i) => (
                    <ListItem
                      className={clsx(classes.listItem, {
                        [classes.nested]: open,
                        [classes.listItemClose]: !open
                      })}
                      key={i}
                      button
                      component={Link}
                      to={to}
                    >
                      <ListItemIcon><IconComponent /></ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItem>
                  ))}
                </List>
              </>
            </Collapse>
          </Fragment>
        ))}
      </Drawer>
    </Fragment>
  );
};

export default Header;
