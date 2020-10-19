import layout from './layout.module.css';
import Head from 'next/head';

export default function Layout(props) {
    return (
        <div className={layout.container}>
            <Head>
                <link rel="icon" href="/images/favicon/favicon.ico" />
            </Head>

            {props.children}
            
            <footer className={layout.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel Logo" className={layout.logo} />
                </a>
                <p>&copy; 2020 Borum Tech</p>
            </footer>
        </div>
    );
}