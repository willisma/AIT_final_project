import Head from "next/head";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import { userService, alertService } from '../../utils/user-service';
import Layout from "../../components/layout";
import styles from "../../styles/login.module.css"

export default function Login(){
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // handle form submission
    // calling user service to the wrapped api
    function onSubmit({ username, password }) {
        console.log('log in session');

        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                router.push("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Layout>
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <h2>Welcome to Dream Diffusion</h2>
                        <label htmlFor="username" >Email: </label>
                        <input type="text" name="username" {...register('username')}/>
                        <div>{errors.email?.message}</div>
                        <label htmlFor="password" >Password: </label>
                        <input type="password" name="password" {...register('password')}/>
                        <div>{errors.password?.message}</div>
                        <button disabled={formState.isSubmitting}>
                            {formState.isSubmitting && <span></span>}
                            Login
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    )
}