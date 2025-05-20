import React from 'react'
import styles from "./ButtonBlue.module.css"

const ButtonBlue = ({children,func}) => {
  return (
      <button className={styles.button} onClick={func}>
          {children}
    </button>
  )
}

export default ButtonBlue