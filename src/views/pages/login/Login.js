

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { setRole } from '../../../actions'; // Import the setRole action
import image from '../login/asset/industry4.jpg'; // Import your background image

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
      contrastText: '#ffffff', // White for text
    },
    secondary: {
      main: '#ffffff', // White
      contrastText: '#1976d2', // Blue for text
    },
  },
});

const ADMIN_ROLE = 'admin';
const OPERATOR_ROLE = 'operator';

const Login = () => {
  const [whitelevel_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleValue] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(''); // State for network error message

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    if (!whitelevel_id) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
    // if (!password) {
    //   setPasswordError('Password is required');
    //   isValid = false;
    // } else if (!passwordRegex.test(password)) {
    //   setPasswordError('Password must be at least 8 characters, start with a capital letter, and include a special character');
    //   isValid = false;
    // } else {
    //   setPasswordError('');
    // }

    if (!role) {
      setRoleError('Role is required');
      isValid = false;
    } else {
      setRoleError('');
    }

    if (!isValid) return;

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://192.168.0.166:8080/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ whitelevel_id, password, role }),
      });

      const data = await response.json();
      console.log('Response data:', data); // Log the entire response to check its structure

      const accessToken = data.access;
      const refreshToken = data.refresh;
      if (!accessToken || !refreshToken) {
        throw new Error('Token not found in the response');
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);

      if (response.ok) {
        console.log('Login successful');
        alert('Login successful');

        

        dispatch(setRole(role)); // Dispatch the role to the Redux store

        if (role === ADMIN_ROLE) {
          navigate('/dashboard');
        } else if (role === OPERATOR_ROLE) {
          navigate('/appsidebar1');
        }
      } else {
        console.error('Error logging in:', data.detail);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setNetworkError('Network error occurred. Please try again later.'); // Set network error message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          objectFit: 'fill'
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="primary">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {networkError && (
                <Alert severity="error" sx={{ width: '100%' }}>
                  {networkError}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="whitelevel_id"
                label="Username"
                name="whitelevel_id"
                autoComplete="whitelevel_id"
                autoFocus
                value={whitelevel_id}
                onChange={(e) => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  },
                }}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  onChange={(e) => setRoleValue(e.target.value)}
                  label="Role"
                  error={!!roleError}
                >
                  <MenuItem value={ADMIN_ROLE}>Admin</MenuItem>
                  <MenuItem value={OPERATOR_ROLE}>Operator</MenuItem>
                  <MenuItem value={OPERATOR_ROLE}>Viewer</MenuItem>
                  
                </Select>
                {roleError && <Typography color="error">{roleError}</Typography>}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading} // Disable button while loading
              >
                {loading ? <CircularProgress size={24} color="secondary" /> : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {setRole1} from '../../../store' // Adjust the import path accordingly
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert';
// import image from '../login/asset/industry4.jpg'; // Import your background image

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', // Blue
//       contrastText: '#ffffff', // White for text
//     },
//     secondary: {
//       main: '#ffffff', // White
//       contrastText: '#1976d2', // Blue for text
//     },
//   },
// });

// const ADMIN_ROLE = 'admin';
// const OPERATOR_ROLE = 'operator';

// const FAKE_CREDENTIALS = {
//   [ADMIN_ROLE]: { username: 'adminUser', password: 'Admin@123' },
//   [OPERATOR_ROLE]: { username: 'operatorUser', password: 'Operator@123' },
// };

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole1] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [roleError, setRoleError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [networkError, setNetworkError] = useState(''); // State for network error message

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     let isValid = true;
//     if (!username) {
//       setUsernameError('Username is required');
//       isValid = false;
//     } else {
//       setUsernameError('');
//     }

//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;
//     if (!password) {
//       setPasswordError('Password is required');
//       isValid = false;
//     } else if (!passwordRegex.test(password)) {
//       setPasswordError('Password must be at least 8 characters, start with a capital letter, and include a special character');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     if (!role) {
//       setRoleError('Role is required');
//       isValid = false;
//     } else {
//       setRoleError('');
//     }

//     if (!isValid) return;

//     setLoading(true); // Set loading state to true

//     setTimeout(() => {
//       try {
//         const fakeUser = FAKE_CREDENTIALS[role];
//         if (fakeUser && fakeUser.username === username && fakeUser.password === password) {
//           console.log('Login successful');
//           alert('Login successful');

//           dispatch(setRole1(role)); // Dispatch the role to the Redux store

//           if (role === ADMIN_ROLE) {
//             navigate('/dashboard');
//           } else if (role === OPERATOR_ROLE) {
//             navigate('/appsidebar1');
//           }
//         } else {
//           console.error('Error logging in: Invalid credentials');
//           alert('Login failed. Please check your credentials and try again.');
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//         setNetworkError('Network error occurred. Please try again later.'); // Set network error message
//       } finally {
//         setLoading(false); // Set loading state to false
//       }
//     }, 2000); // Simulate a network delay for the loading spinner
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           backgroundImage: `url(${image})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           objectFit: 'fill'
//         }}
//       >
//         <Container
//           component="main"
//           maxWidth="xs"
//           sx={{
//             backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
//             borderRadius: '20px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             padding: '20px',
//           }}
//         >
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" color="primary">
//               Sign in
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//               {networkError && (
//                 <Alert severity="error" sx={{ width: '100%' }}>
//                   {networkError}
//                 </Alert>
//               )}
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 error={!!usernameError}
//                 helperText={usernameError}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'rgba(0, 0, 0, 0.6)',
//                     '&.Mui-focused': {
//                       color: 'primary.main',
//                     },
//                   },
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={!!passwordError}
//                 helperText={passwordError}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': {
//                       borderColor: 'primary.main',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     color: 'rgba(0, 0, 0, 0.6)',
//                     '&.Mui-focused': {
//                       color: 'primary.main',
//                     },
//                   },
//                 }}
//               />
//               <FormControl fullWidth margin="normal" required>
//                 <InputLabel id="role-label">Role</InputLabel>
//                 <Select
//                   labelId="role-label"
//                   id="role"
//                   value={role}
//                   onChange={(e) => setRole1(e.target.value)}
//                   label="Role"
//                   error={!!roleError}
//                 >
//                   <MenuItem value={ADMIN_ROLE}>Admin</MenuItem>
//                   <MenuItem value={OPERATOR_ROLE}>Operator</MenuItem>
//                 </Select>
//                 {roleError && <Typography color="error">{roleError}</Typography>}
//               </FormControl>
//               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                 {loading && <CircularProgress />}
//               </Box>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   backgroundColor: 'primary.main',
//                   color: 'primary.contrastText',
//                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                   '&:hover': {
//                     backgroundColor: 'primary.dark',
//                   },
//                 }}
//                 disabled={loading} // Disable button while loading
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2" sx={{ color: 'primary.main' }}>
//                     Forgot password?
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Login;