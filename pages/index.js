import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home({json}) {

  const router = useRouter();

  const [city, setCity] = useState('Miami');

  const handleChange = (e) => {
    setCity(e.target.value);  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/?searchTerm=${city}`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Api Try Out</title>
        <meta name="description" content="Try out api before sign up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Try OpenWeatherMap API!
        </h1>

        <div>
          <form onSubmit={handleSubmit}>
          <label htmlFor="city">Enter City</label>
          <input type="text" id="city" value={city} placeholder="Enter city" onChange={handleChange} />
          <button>Search</button>
          </form>
        </div>

        <div>
              <pre>
                {JSON.stringify(json, null, 2)}
              </pre>
        </div>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {

  const searchTerm = context.query.searchTerm ?? "miami";

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${process.env.API_KEY}`)

  const json = await res.json();

  return {
    props: {json},
  }
}