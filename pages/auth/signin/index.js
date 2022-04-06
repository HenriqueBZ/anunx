import Image from "next/image"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/client"
import { makeStyles } from "@material-ui/core"

import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Typography,
    CircularProgress,
} from "@material-ui/core"

import TemplateDefault from "../../../src/templates/Default"
import { initialValues, validationSchema } from "../../../src/utils/formValuesSignin"
import MuiAlert from "@material-ui/lab/Alert"
import useToasty from "../../../src/contexts/Toasty"

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 30
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    formControl: {
        marginBottom: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loading: {
        display: 'block',
        margin: '10px auto',
    },
    errorMessage: {
        margin: '20px 0'
    },
    orSeparator: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        width: '100%',
        height: 1,
        margin: theme.spacing(7, 0, 4),

        '& span': {
            backgroundColor: 'white',
            padding: "0 30px"
        }
    }
}))

const Signin = ({ NEXTAUTH_URL }) => {
    const classes = useStyles()
    const router = useRouter()
    const { setToasty } = useToasty()
    const [ session ] = useSession()

    console.log(session)

    const handleGoogleLogin = () => {
        signIn("google", {
            callbackUrl: `${NEXTAUTH_URL}/user/dashboard`
        })
    }    

    const handleSubmit = async values => {
        signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: `${NEXTAUTH_URL}/user/dashboard`
        })
    }

    return (
        <TemplateDefault>

            <Container maxWidth="sm" component="main" className={classes.container}>
                <Typography component="h1" variant="h5" align="center" color="textPrimary">
                    Entre na sua conta
                </Typography>                
            </Container>            

            <Container maxWidth="md">
                <Box className={classes.box}>

                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={
                                <Image
                                    src="/images/logo_google.svg"
                                    width={30}
                                    height={30}
                                    alt="Login com Google"
                                />                                                
                            }
                            onClick={handleGoogleLogin}
                        >
                            Login com Google
                        </Button>                        
                    </Box>

                    <Box className={classes.orSeparator}>
                        <span>ou</span>
                    </Box>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {
                            ({
                                touched,
                                values,
                                errors,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        {
                                            router.query.i === '1'
                                                ? (
                                                    <MuiAlert severity="error" className={classes.errorMessage}>
                                                        Usuário ou senha inválidos
                                                    </MuiAlert>
                                                )
                                                : null
                                        }
                                      <FormControl fullWidth error={errors.email && touched.email} className={classes.formControl}>
                                          <InputLabel>E-mail</InputLabel>
                                              <Input
                                                  name="email"
                                                  type="email"
                                                  value={values.email}
                                                  onChange={handleChange}
                                              />
                                              <FormHelperText>
                                                  {errors.email && touched.email ? errors.email : null}
                                              </FormHelperText>                                            
                                      </FormControl>

                                      <FormControl fullWidth error={errors.password && touched.password} className={classes.formControl}>
                                          <InputLabel>Senha</InputLabel>
                                              <Input
                                                  name="password"
                                                  type="password"
                                                  value={values.password}
                                                  onChange={handleChange}
                                              />
                                              <FormHelperText>
                                                  {errors.password && touched.password ? errors.password : null}
                                              </FormHelperText>                                            
                                      </FormControl>                                        

                                      {
                                          isSubmitting
                                              ?   (
                                                  <CircularProgress className={classes.loading}/>
                                              )
                                              :   (
                                                  <Button
                                                      type="submit"
                                                      fullWidth
                                                      variant="contained"
                                                      color="primary"
                                                      className={classes.submit}
                                                  >
                                                      Entrar
                                                  </Button>
                                              )
                                      }                                        

                                    </form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Container>

        </TemplateDefault>
    )
}

Signin.getInitialProps = async function() {
    return {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }
}

export default Signin