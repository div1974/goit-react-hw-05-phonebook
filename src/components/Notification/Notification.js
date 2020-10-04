import React from "react";

import styles from "./Notification.module.css";

const Notification = (props) => {
  return (
    <div className={styles.notification}>
      {`${props.name} is already in contacts`}
    </div>
  );
};
export default Notification;
