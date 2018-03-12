import { Component } from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'mdi-react/MenuIcon';
import PageTitle from '../PageTitle';
import UserMenu from './UserMenu';
import SidebarList from './SidebarList';

@withStyles(
  theme => ({
    root: {
      flexGrow: 1,
      minHeight: '100vh',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100vw'
    },
    appBar: {
      position: 'absolute',
      backgroundColor: theme.palette.secondary.main,
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${theme.drawerWidth}px)`
      }
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    toolbar: {
      ...theme.mixins.toolbar,
      paddingLeft: theme.spacing.triple,
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    drawerPaper: {
      color: theme.palette.secondary.contrastText,
      width: theme.drawerWidth,
      // position: 'relative',
      [theme.breakpoints.up('md')]: {
        position: 'relative'
      }
    },
    title: {
      color: theme.palette.common.white
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.triple,
      width: '100%',
      paddingBottom: theme.spacing.unit * 12,
      overflowY: 'auto',
      height: 'calc(100% - 56px)',
      marginTop: 56,
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px)',
        marginTop: 64
      }
    }
  }),
  { withTheme: true }
)
export default class AppView extends Component {
  static propTypes = {
    children: node.isRequired,
    title: string
  };

  static defaultProps = {
    title: ''
  };

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, className, children, theme, title, ...props } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography variant="title" className={classes.title}>
            {process.env.APPLICATION_TITLE}
          </Typography>
        </div>
        <Divider />
        <UserMenu />
        <Divider />
        <SidebarList />
      </div>
    );

    return (
      <div className={classes.root}>
        <PageTitle>{title}</PageTitle>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" noWrap className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classNames(classes.content, className)} {...props}>
          {children}
        </main>
      </div>
    );
  }
}
