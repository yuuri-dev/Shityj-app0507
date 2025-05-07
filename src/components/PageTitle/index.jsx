import React from 'react'
import style from "./PageTitle.module.css"

const PageTitle = ({children}) => {
  return (
      <div className={style.title}>{children}</div>
  )
}

export default PageTitle