/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/pages/HomePage/Loadable';
import BirdsPage from 'containers/pages/BirdsPage/Loadable';
import TrainsPage from 'containers/pages/TrainsPage/Loadable';
import NotFoundPage from 'containers/pages/NotFoundPage/Loadable';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ChevronLeft } from '@material-ui/icons';
import GlobalStyle from 'global-styles';
import Link from 'components/Link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const fragments = [
  {
    path: '/trains',
    header: () => <div>Trains</div>,
    component: () => <TrainsPage />,
  },
  {
    path: '/birds',
    header: () => <div>Birds</div>,
    component: () => <BirdsPage />,
  },
];

export default function App() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ChevronLeft />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            <Switch>
              <Route exact path="/">
                <div>Home</div>
              </Route>
              {fragments.map((route, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Route key={index} path={route.path} exact>
                  <route.header />
                </Route>
              ))}
            </Switch>
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {fragments.map((route, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Route key={index} path={route.path} exact={route.exact}>
            <route.component />
          </Route>
        ))}
        <Route exact path="/trains" component={TrainsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
