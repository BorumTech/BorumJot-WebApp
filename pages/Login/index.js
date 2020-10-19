import Layout from '../../components/Layout/layout';
import FormField from '../../components/FormField/formField';
import Head from 'next/head';
import Link from 'next/link';
import login from './login.module.css';

export default function LoginPage(props) {
    return (
        <Layout>
            <Head>
                <title>Login | Borum Jot</title>
            </Head>
            
            <form method="post" action="" className={login.form}>
                <h1>Login</h1>
                <FormField focus format="email" label="Email" />
                <FormField format="password" label="Password" />
                <Link href=""><a>Forgot password? Reset it</a></Link>
                <Link href="/Register"><a>Don't have an account? Register</a></Link>
                <input type="submit" value="Submit" />
            </form>
        </Layout>
    );
}