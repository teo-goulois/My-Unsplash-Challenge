import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
// components
import Header from '../components/header/Header'
import MasonryComponent from '../components/masonry/Masonry'
import Modal from '../components/modal/Modal'

export interface Items {
  img: string
  title: string
  _id: string
}

type AppProps = {
  itemData: Items[]
};

const Home: NextPage<AppProps> = ({ itemData }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  // header
  const [inputValue, setInputValue] = useState<string | false>(false)
  //masonry
  const [items, setItems] = useState<Items[]>(itemData)

  const search = async () => {
    if (inputValue) {
      const response = await fetch(`/api/itemData?search=${inputValue}`)
      const itemData = await response.json(); 
      setItems(itemData)
    } else {
      const response = await fetch(`/api/itemData`)
      const itemData = await response.json(); 
      setItems(itemData)
    }
  }

  useEffect(() => {
    search()    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])


  return (
    <div className={styles.container}>
      <Head>
        <title>Devchallenges</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,
      maximum-scale=5"
        />
        <link rel="icon" href="/devchallenges.png" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://devchallenges.io/"
        />
      </Head>

      <main className={styles.main}>
        { openModal &&  <Modal setOpenModal={setOpenModal} setItems={setItems} /> }
       
        <Header setOpenModal={setOpenModal} setInputValue={setInputValue} />
        <MasonryComponent itemData={items} setItems={setItems} />
      </main>
        
    </div>
  )
}

export default Home

export async function getServerSideProps(ctx: any) {

	const data = await fetch(process.env.API_URL as string);
	const itemData = await data.json();  

	return {
		props: { itemData },
	};
}



