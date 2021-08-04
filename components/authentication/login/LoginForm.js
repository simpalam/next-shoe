import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import client from '../../../apollo-client';
import { LOGIN_USER } from '../../../graphql/mutation/user.mutation';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'

// ----------------------------------------------------------------------

export default function LoginForm() {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const[open,setOpen]=useState(false);

  const router=useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {

      const {data,error,loading }= await client.mutate({
        mutation:LOGIN_USER,
        variables:{username:values.email,password:values.password}
      });

      if(loading){
        return <h2>Loadinng</h2>
      }
     if(error){
       console.error(error)
       return null
     }
     if(data.tokenAuth.success){
       localStorage.setItem('login',data.tokenAuth.success);
       localStorage.setItem('userid',data.tokenAuth.user.id);
       localStorage.setItem('username',data.tokenAuth.user.username);
       alert('Welcome you have sign in successfully.');
       
       router.back();
      //  router.push('products')
       console.log(data)
     }
     if(!data.tokenAuth.success){
       alert('Please enter valid credential. Dear you have missed something.');
       router.reload();
     }
     
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClose=()=>{
    setOpen(false);
  }
  const handleOpen=()=>{
    setOpen(true);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Password reset
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Password reset email may go to spam emails.
            So please check your spam folder.
          </Typography>

        </DialogContent>
        <DialogActions>
          <Link
          href="https://django-shoe.herokuapp.com/accounts/password_reset/"
          >
          <Button>
            Ok , Let's Go
          </Button>
          </Link>
        </DialogActions>

      </Dialog>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />
          <Typography 
          onClick={handleOpen}>
          Forgot password?

          </Typography>

          {/* <Link 
          onClick={handleOpen}
          // href="https://django-shoe.herokuapp.com/accounts/password_reset/"
           >
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
    </div>
  );
}
