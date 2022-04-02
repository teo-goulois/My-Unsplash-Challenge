import React, { Dispatch, SetStateAction, useState } from 'react'
import { Items } from '../../pages';
import styles from './Modal.module.scss'

type AppProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setItems: Dispatch<SetStateAction<Items[]>>
};

type Form = {
    img: boolean | string,
    title: boolean | string
}

const Modal =({ setOpenModal, setItems }: AppProps) => {
    const [form, setForm] = useState<Form>({
        img: false,
        title: false
    })

    const handleCancel = () => {
        setOpenModal(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        value === '' ? 
            setForm((prev) => ({...prev, [event.target.name]: false})) : 
            setForm((prev) => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = async () => {
        if (form.img === false || form.title === false ) {
            console.log('filled all the form');
            return
        } else {
            const newImage = form
            
            const fetchedResponse = await fetch(`/api/itemData/`, {
                method: "POST",
                body: JSON.stringify(newImage),
                headers: { "Content-Type": "application/json" },
            });
    
            const { message, data } = await fetchedResponse.json();
            
            setItems(data)
            setOpenModal(false)
            setForm({
                img: false,
                title: false
            })
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.modal} >
            <h3>Add a new photo</h3>
            <div className={styles.inputWrapper}>
                <label>Label</label>
                <input name='title' onChange={handleChange} placeholder='Suspendisse elit massa'></input>
            </div>
            <div className={styles.inputWrapper}>
                <label>Photo URL</label>
                <input name='img' onChange={handleChange} placeholder='https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r...'></input>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleCancel} type='button'>Cancel</button>
                <button onClick={handleSubmit} type='submit'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Modal