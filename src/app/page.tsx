import Head from 'next/head'
import IconSelector from '../components/IconSelector'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Lucide Icon Selector</title>
        <meta name="description" content="Select Lucide icons easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-4">Lucide Icon Selector</h1>
        <IconSelector />
      </main>
    </div>
  )
}