import Layout from '../../components/Layout/layout';
import FormField from '../../components/FormField/formField';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import login from './login.module.css';
import localStorage from '../../lib/localstorage';

export default function LoginPage(props) {
    const onLogin = async (e) => {
        e.preventDefault();

        const formEl = e.target.parentElement;
        
        const email = formEl.elements["Email"].value;
        const password = formEl.elements["Password"].value;
        const body = "email=" + email + "&password=" + password 
        
        fetch('https://api.jot.bforborum.com/api/v1/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            }
        }).then(response => {
            localStorage.useLocalStorage("userApiKey", response.data.api_key);
            Router.push("/");
        });
    }

    return (
        <Layout>
            <Head>
                <title>Login | Borum Jot</title>
            </Head>
            
            <form method="post" action="" className={login.form}>
                <h1>Login</h1>
                <FormField required focus format="email" label="Email" />
                <FormField required format="password" label="Password" />
                <Link href=""><a>Forgot password? Reset it</a></Link>
                <Link href="/Register"><a>Don't have an account? Register</a></Link>
                <input type="submit" value="Submit" onClick={onLogin} />
            </form>
        </Layout>
    );
}