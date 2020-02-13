import React, { useContext } from 'react';
import GlobalState from '../../state/store';

import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import LeftDrawer from '../LeftDrawer/LeftDrawer';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';

const menuId = 'primary-search-account-menu';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        background: '#8360c3',  /* fallback for old browsers */
        // eslint-disable-next-line
        background: '-webkit-linear-gradient(to right, #2ebf91, #8360c3)',  /* Chrome 10-25, Safari 5.1-6 */
        // eslint-disable-next-line
        background: 'linear-gradient(to right, #2ebf91, #8360c3)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        position: 'fixed',
        top: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),       
        marginRight: theme.spacing(2),
        marginLeft: 0,        
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),            
        },
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        padding: 5
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',       
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    inputRoot: {
        color: 'inherit',
         '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    inputInput: {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'flex',
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const { state } = useContext(GlobalState)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={classes.grow}>
                <AppBar position="static"
                    className={classes.appBar}>
                    <Toolbar className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <LeftDrawer classes={classes} />

                            <Typography className={classes.title} variant="h6" noWrap>
                                {!state.profileData || state.profileData.name === null
                                    ? 'NinjaSubs'
                                    : `${state.profileData.name}`}
                            </Typography>
                        </div>

                        <SearchBar classes={classes} />

                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <ProfileMenu props={{ anchorEl, handleMenuClose }} />
            </div>
        </div>

    );
}