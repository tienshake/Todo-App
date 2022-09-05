import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import MenuUser from '../../MenuUser';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
const pages = [
    { title: 'Home', path: '/' },
    { title: 'History', path: '/history' },
];

const Header = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" className={styles.container}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <PlaylistAddCheckIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            TODO
                        </Typography>
                    </Link>
                    <Box className={styles.link} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu mobile"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ xs: 'block', md: 'none' }}
                        >
                            {user &&
                                pages.map((item, i) => (
                                    <Link to={item.path} key={i} onClick={handleCloseNavMenu}>
                                        <Button style={{ my: 2, color: 'black', display: 'block' }}>
                                            {item.title}
                                        </Button>
                                    </Link>
                                ))}
                        </Menu>
                    </Box>

                    <PlaylistAddCheckIcon sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            flexGrow: 0.5,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/">TODO</Link>
                    </Typography>

                    <Box
                        className={styles.link}
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex', alignItems: 'center' },
                        }}
                    >
                        {user &&
                            pages.map((item, i) => (
                                <NavLink to={item.path} key={i}>
                                    <Button
                                        className={styles.btnLink}
                                        style={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {item.title}
                                    </Button>
                                </NavLink>
                            ))}
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'flex', md: 'flex', alignItems: 'center' },
                        }}
                    >
                        {user && <div style={{ color: '#fffff' }}>{`Hello: ${user.fullName}!`}</div>}
                        <MenuUser />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
