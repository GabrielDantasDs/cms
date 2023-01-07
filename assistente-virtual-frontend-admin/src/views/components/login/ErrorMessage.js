import React from 'react'
import styles from '../../../styles/components/login/Index.module.css'
export default function ErrorMessage(props) {
  return <div className={styles.errorMessage}>{props.error}</div>
}
