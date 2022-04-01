import React, { Dispatch, SetStateAction } from 'react'
import styles from './ModalDelete.module.scss'
// types
import { Items } from '../../pages';

type AppProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setItems: Dispatch<SetStateAction<Items[]>>
    id: string
  };

const ModalDelete =({ setOpenModal, setItems, id }: AppProps) => {

    const handleCancel = () => {
        setOpenModal(false)
    }

    const handleDelete = async () => {      
      const fetchedResponse = await fetch(`/api/itemData?item_id=${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      });

      const { message, data } = await fetchedResponse.json();
      
      setItems(data)
      setOpenModal(false) 
  }

  return (
    <div className={styles.container}>
        <div className={styles.modal} >
            <h3>Add a new photo</h3>
            <div className={styles.inputWrapper}>
                <label>Password</label>
                <input type='password' placeholder='******************'></input>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleCancel} type='button'>Cancel</button>
                <button onClick={handleDelete} type='submit'>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default ModalDelete