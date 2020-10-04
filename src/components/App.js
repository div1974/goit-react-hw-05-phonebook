import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactItemFade from "./ContactList/ContactItemFade.module.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    chkName: null,
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (el) => {
    const contact = {
      id: uuidv4(),
      name: el.name,
      number: el.number,
    };

    const nameChk = this.state.contacts.filter((e) => e.name === contact.name)
      .length;

    if (!nameChk > 0) {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    } else {
      this.setState({ chkName: contact.name });
    }
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <ContactForm
          onAddContact={this.addContact}
          chkName={this.state.chkName}
        />

        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}

        <CSSTransition
          in={visibleContacts.length > 0}
          timeout={250}
          classNames={{ ...ContactItemFade }}
          unmountOnExit
        >
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        </CSSTransition>
      </>
    );
  }
}
