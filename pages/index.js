import Head from 'next/head'
import Link from 'next/link'
import home from './home.module.css';
import PlatformButton from '../components/PlatformButton/platformButton';
import Layout from '../components/Layout/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>

      <main className={home.main}>
        <div className={home.grid}>
          <button className={home.card}><Link href="/Login"><a>Login</a></Link></button>
          <button className={home.card}><Link href="/Register"><a>Register</a></Link></button>
        </div>
        <div className={home.grid}>
          <PlatformButton 
            downloadLink="https://play.google.com/store/apps/details?id=com.boruminc.borumjot.android"
            imgSrc="/images/platforms/android-icon.png" 
            label="Get for free on the Google Play Store" />
        </div>
      </main>
    </Layout>
  )
}
