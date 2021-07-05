import '../styles/globals.css'
import Head from 'next/head'
import {AuthProvider} from '../hooks/UserContext'
function MyApp({ Component, pageProps }) {
  return (
   <AuthProvider>
   
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet"/>
</Head>
<Component {...pageProps} />
   </AuthProvider>
  )
}

export default MyApp
