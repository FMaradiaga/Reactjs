import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./authProvider";

const LOGIN_URL = 'http://172.28.0.82:3030/autentication';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar, { genConfig } from 'react-nice-avatar'

function Copyright (props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://cooperativataulabe.hn/">
                Cooperativa Taulabe.hn
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export const Login = () => {
    const config = genConfig()
    const { setAuth } = useContext(AuthContext);
    const userWindows = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErrMsg('');
    }, [userWindows, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Entro a la funcion');
        try {

           await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName:user, password:password })
            })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token)
                    setAuth({ user, password });
                    setUser('');
                    setPwd('');
                    setSuccess(true);
                    
                } else {
                    alert('Usuario o contraseña incorrectos')
                   

                }
                })
            .catch(err => console.error(err))

           

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <ThemeProvider theme={defaultTheme}>
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar style={{ width: '9rem', height: '9rem' }} {...config} />
                                <br />
                                <Typography component="h1" variant="h5">
                                    Iniciar Sesion
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        ref={userWindows}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
                                        id="userWindows"
                                        label="Usurio de Windows"
                                        name="userWindows"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña de Windows"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={password}
                                        autoComplete="off"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        onClick={handleSubmit}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Ingresar al Sistema
                                    </Button>
                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            )}
        </>
    )
}
