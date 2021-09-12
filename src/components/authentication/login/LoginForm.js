import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider} from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import axios from 'axios'
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
      login:''
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      axios.post(
        '/api/tenants/login',{
          email:values.email,
          password: values.password
        }
      ).then((response) =>{
        if (response.data.data.status){
          console.log(response.data.data)
          //Hash the key before storing it in the localstorage
          localStorage.setItem('value', response.data.data.token)
          //Hash the key and the value in the localstorage to not make it visible to the user -- TBD later along the project
          localStorage.setItem('user',response.data.data.user)
          navigate('/dashboard', { replace: true });
        }
        else{
          // SHOW ERROR MESSAGE LATER ON --> 
          actions.setErrors("login",response.data.data.message)
          actions.setSubmitting(false)
        }

      }).catch((error)=>{
        //  @TBD -- SHOW ERROR MESSAGE LATER ON 
        actions.setErrors("login",error.message)
        actions.setSubmitting(false)
      })
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
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

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {errors.login}
          </Typography>
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
  );
}
