import React, {useState} from 'react'
import { Avatar, Button, CssBaseline,
    TextField, FormControlLabel,
    Checkbox, Link, Grid,
    Typography,
    Container, makeStyles, Snackbar
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#96a9d4',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    tf: {
        background: 'linear-gradient(45deg, #96a9d4 30%, #96a9d4 50%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        borderRadius: 3,
        color: 'white',
        border: 0
    },
    floatingLabelFocusStyle: {
        color: '#ffffff'
    }
}));

const useField = (id, type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return{
        id,
        type,
        name,
        value,
        onChange,
        setValue
    }
}

const SignIn = () => {
    const classes = useStyles()
    const {setValue: setUsernameValue, ...usernameInput} = useField('username', 'text', 'Username')
    const {setValue: setPasswordValue, ...passwordInput} = useField('password', 'password', 'Password')
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)

    const handleSignIn = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: usernameInput.value,
                password: passwordInput.value
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            console.log('USER:',user)
            dispatch(setUser(user))
            setUsernameValue('')
            setPasswordValue('')
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
                history.push('/dashboard')
            }, 2000)
        }catch(exception){
            setTimeout(() => {

            },3000)
        }
    }

    return(
        <>
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignIn}>
                    <TextField margin='normal' required className={classes.tf}
                               fullWidth id='username' variant='filled'
                               label='Username' name='username'
                               autoComplete='email' autoFocus
                               InputLabelProps={{
                                   className: classes.floatingLabelFocusStyle,
                               }} {...usernameInput}
                    />
                    <TextField margin='normal' required className={classes.tf}
                               fullWidth name='password' variant='filled'
                               label='Password' type='password'
                               id='password' autoComplete='current-password'
                               InputLabelProps={{
                                   className: classes.floatingLabelFocusStyle,
                               }}
                               {...passwordInput}
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit' fullWidth
                        variant='contained' color='primary'
                        className={classes.submit}
                     >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
        <Snackbar open={open} >
            <Alert elevation={6} variant="filled" severity='success'>
                Login Successful
            </Alert>
        </Snackbar>
        </>
    )
}

export default SignIn