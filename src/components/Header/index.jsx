import React from 'react';
import styles from './Header.module.css';


function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Shifty</h1>
    </div>
  );
}

export default Header;
