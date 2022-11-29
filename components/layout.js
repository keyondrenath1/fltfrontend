import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MaterialUIAppBar from '../material-ui-components/MaterialUIAppBar'

export default function Layout({children}) {
  return (
    <div>
      <Head>
        <title>FixerLT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MaterialUIAppBar />
      {children}
    </div>
  )
}
