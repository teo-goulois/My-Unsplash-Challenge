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
  const [id, setId] = useState<string | false>(false)

  const handleMouseOver = (index: number) => {
    setActiveIndex(index)
  }

  const handleDelete = (id: string) => {
    setId(id)
    setOpenModalDelete(true)
  }

  return (
    <>
    <div className={styles.masonry} >
      { (openModalDelete && id) &&  <ModalDelete setOpenModal={setOpenModalDelete} setItems={setItems} id={id} />  }
        {itemData?.map((item, index) => (
          <div 
          onMouseOver={() => handleMouseOver(index)}
          onMouseLeave={() => setActiveIndex(false)}
          className={styles.item} key={index}>
            { index === activeIndex && <div className={styles.itemHover}>
              <button onClick={() => handleDelete(item._id)} type='button'>Delete</button>
              <h3>{item.title}</h3>
            </div>}
            <img
              loading={index > 10 ? "lazy" : "eager"}
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
