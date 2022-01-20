import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

/* import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList'; */

/* import { Container } from './App.global.styled'; */
/* import { TitlePhoneBook, TitleContacts, Section } from './App.styled'; */

export default class App extends Component {
  state = {
    pictureName: '',
  };

  formSubmitHandler = data => {
    const { name } = data;
    const normalizedNameContact = name.toLowerCase();
    this.setState({ pictureName: normalizedNameContact });
    /* console.log(this.state.pictureName); */

    /*   this.setState(previousState => {
      return { pictureName: normalizedNameContact };
    }); */
    /*  const { name } = data; */
    /* const normalizedNameContact = name.toLowerCase(); */
    /* const newId = { id: nanoid(), ...data }; */
    /*  this.findContactName(normalizedNameContact)
      ? alert(`${name} is already in contacts.`)
      : this.setState(previousState => {
          return { contacts: [...previousState.contacts, newId] };
        }); */
    /* console.log(newId); */
  };

  render() {
    /* const { filter } = this.state; */

    /*  const visibleContact = this.getFilterContact(); */

    return (
      <div>
        <Searchbar formSubmit={this.formSubmitHandler}></Searchbar>
        <ImageGallery pictureName={this.state.pictureName}></ImageGallery>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
