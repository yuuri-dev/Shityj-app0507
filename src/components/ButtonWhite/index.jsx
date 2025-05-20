import React from 'react'
import styles from "./ButtonWhite.module.css"

const ButtonWhite = ({children,func}) => {
  return (
      <button className={styles.button} onClick={func}>
          {children}
    </button>
  )
}

export default ButtonWhite