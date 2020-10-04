import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import fadeStyles from "./fade.module.css";
import styles from "./ContactForm.module.css";
import Notification from "../Notification";
import NotificationFade from "../Notification/NotificationFade.module.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    mess: true,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact(this.state);

    this.setState({ name: "", number: "" });

    this.setState({ mess: true });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.ContactForm} onSubmit={this.handleSubmit}>
        <div className={styles.ContactFormMessage}>

        <div>
        <CSSTransition
          in={true}
          appear={true}
          classNames={{ ...fadeStyles }}
          timeout={500}
          unmountOnExit
        >
          {(state) => <h2>Phonebook</h2>}
        </CSSTransition>
        </div>


        {this.props.chkName && (
          
          <CSSTransition
            in={this.state.mess}
            appear={true}
            classNames={{ ...NotificationFade }}
            timeout={1500}
            onEntered={() => {
              this.setState({ mess: false });
            }}
            unmountOnExit
          >
            <Notification name={this.props.chkName} />
          </CSSTransition>
          
        )}
       
        </div>


        <label className={styles.ContactFormLabel}>
          Name
          <input
            className={styles.ContactFormInput}
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
          />
        </label>
        <label className={styles.ContactFormLabel}>
          Phone
          <input
            className={styles.ContactFormInput}
            type="text"
            value={number}
            onChange={this.handleChange}
            name="number"
          />
        </label>

        <button type="submit" className={styles.ContactFormButton}>
          Добавить контакт
        </button>
      </form>
    );
  }
}
