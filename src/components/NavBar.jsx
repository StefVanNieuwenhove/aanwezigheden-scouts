/** @format */

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CssBaseline,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/UserContext';

const drawerWidth = 185;

function NavBar(props) {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const activeStyle = {
    textDecoration: 'underline',
  };

  const activeStyleDrawer = {
    textDecoration: 'underline',
    backgroundColor: 'green',
    color: 'white',
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        backgroundColor: 'green',
        color: 'white',
        height: '100%',
      }}
    >
      <Typography variant='h6' sx={{ my: 2 }}>
        Scouts aanwezigheden
      </Typography>
      <Divider sx={{ color: 'black' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to='/'
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant='h6'>Overzicht</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to='/kapoen'
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant='h6'>Kapoenen</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to='/wouter'
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant='h6'>Wouters</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to='/jonggiver'
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant='h6'>Jonggivers</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to='/giver'
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant='h6'>Givers</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              component={NavLink}
              to='/jin'
              style={({ isActive }) =>
                isActive ? activeStyleDrawer : undefined
              }
            >
              <ListItemText>
                <Typography variant='h6'>Jins</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          /* <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to="/add"
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant="h6">Create</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            component={NavLink}
            to="/delete"
            style={({ isActive }) => (isActive ? activeStyleDrawer : undefined)}
          >
            <ListItemText>
              <Typography variant="h6">remove</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem> */
        }
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' sx={{ backgroundColor: 'green', color: 'white' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'block', lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h4'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            Scouts - aanwezigheden
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
            }}
          >
            <Button
              ize='large'
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to='/'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant='h6'>Overzicht</Typography>
            </Button>
            <Button
              ize='large'
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to='/kapoen'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant='h6'>Kapoenen</Typography>
            </Button>
            <Button
              ize='large'
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to='/wouter'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant='h6'>Wouters</Typography>
            </Button>
            <Button
              ize='large'
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to='/jonggiver'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant='h6'>Jonggivers</Typography>
            </Button>
            <Button
              ize='large'
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to='/giver'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant='h6'>Givers</Typography>
            </Button>
            <Button
              ize='large'
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to='/jin'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant='h6'>Jins</Typography>
            </Button>
            {/* <Button
              ize="large"
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to="/add"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant="h6">Create</Typography>
            </Button>
            <Button
              ize="large"
              sx={{ color: '#fff', mx: 1, '&:hover': { color: '#000' } }}
              component={NavLink}
              to="/delete"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Typography variant="h6">Remove</Typography>
            </Button> */}
          </Box>
          {user && (
            <Box>
              <IconButton size='large' onClick={handleMenu} color='inherit'>
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main'>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default NavBar;
