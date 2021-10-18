import '../styles/globals.css'
import Head from 'next/head'
import {AuthProvider} from '../hooks/UserContext'
function MyApp({ Component, pageProps }) {
  return (
   <AuthProvider>
   
    <Head>
</Head>
<Component {...pageProps} />
   </AuthProvider>
  )
}

export default MyApp
