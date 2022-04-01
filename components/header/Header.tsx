import React, { Dispatch, SetStateAction, SVGProps } from 'react'
import styles from './Header.module.scss' 

type AppProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setInputValue: Dispatch<SetStateAction<string | false>>
};

const Header = ({ setOpenModal, setInputValue }: AppProps) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value === '' ? setInputValue(false) : setInputValue(event.target.value)
  }

  const handleAddPhoto = () => {
    setOpenModal(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapperLeft}>
        <div className={styles.wrapperLogo}>
          <div className={styles.logo}>
            <div className={styles.square} />
            <div className={styles.rectangle} />
          </div>
          <div className={styles.wrapperLogoText}>
            <h2>My Unsplash</h2>
            <h3>devchallenges.io</h3>
          </div>
        </div>
        <div className={styles.inpupWrapper}>
          <IonMdSearch />
          <input onChange={handleInputChange} placeholder='Search by name'></input>
        </div>
      </div>
      <button onClick={handleAddPhoto} type='button' className={styles.wrapperRight}>
        Add a photo
      </button>
    </div>
  )
}

export default Header


export function IonMdSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24px" height="24px" viewBox="0 0 512 512" {...props}><path d="M337.509 305.372h-17.501l-6.571-5.486c20.791-25.232 33.922-57.054 33.922-93.257C347.358 127.632 283.896 64 205.135 64 127.452 64 64 127.632 64 206.629s63.452 142.628 142.225 142.628c35.011 0 67.831-13.167 92.991-34.008l6.561 5.487v17.551L415.18 448 448 415.086 337.509 305.372zm-131.284 0c-54.702 0-98.463-43.887-98.463-98.743 0-54.858 43.761-98.742 98.463-98.742 54.7 0 98.462 43.884 98.462 98.742 0 54.856-43.762 98.743-98.462 98.743z" fill="#BDBDBD"></path></svg>
  )
}