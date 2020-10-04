import React from "react";
import styles from "./ContactListItem.module.css";
import PropTypes from "prop-types";

const ContactListItem = ({ name, number, onRemove }) => (
  <li className={styles.ContactListItem}>
    <p className={styles.ContactListText}>
      {name}:<br />
      {number}
    </p>

    <button
      type="button"
      className={styles.ContactListButton}
      onClick={onRemove}
    >
      Удалить
    </button>
  </li>
);

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

export default ContactListItem;
