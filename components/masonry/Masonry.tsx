/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from './Masonry.module.scss' 
// component
import ModalDelete from '../modalDelete/ModalDelete';
// types
import { Items } from '../../pages/index'

type AppProps = {
  itemData: Items[],
  setItems: Dispatch<SetStateAction<Items[]>>
};

const MasonryComponent = ({ itemData, setItems }: AppProps) => {
  const [activeIndex, setActiveIndex] = useState<number | false>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const handleMouseOver = (index: number) => {
    setActiveIndex(index)
  }

  const handleDelete = (index: number, id: string) => {
    
    setOpenModalDelete(true)
  }

  return (
    <>
    <div className={styles.masonry} >
        {itemData.map((item, index) => (
          <div 
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={() => setActiveIndex(false)}
          className={styles.item} key={index}>
            { openModalDelete &&  <ModalDelete setOpenModal={setOpenModalDelete} setItems={setItems} id={item.id} />  }
            { index === activeIndex && <div className={styles.itemHover}>
              <button onClick={() => handleDelete(index, item.id)} type='button'>Delete</button>
              <h3>{item.title}</h3>
            </div>}
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              style={{
                display: 'block',
                width: '100%',
              }}
            />
          </div>
        ))}

   </div>
   </>
  )
}

export default MasonryComponent
