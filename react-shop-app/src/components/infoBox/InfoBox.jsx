import React from 'react'
import styles from './InfoBox.module.scss'

const InfoBox = ({cardClass, title, count, icon}) => {
  return (
    <div className={styles.infoBox}>
      <div className={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </div>
    </div>
  )
}

export default InfoBox