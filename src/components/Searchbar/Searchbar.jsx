import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    name: '',
  };

  handleNameChange = event => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.name.trim() === '') {
      toast.error('Enter the name of the picture');
      return;
    }

    this.props.formSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;
    const { Searchbar, SearchForm, button, buttonLabel, input } = styles;

    return (
      <header className={Searchbar}>
        <form className={SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={button}>
            <BsSearch className={buttonLabel} />
          </button>

          <input
            className={input}
            name="name"
            type="text"
            autoComplete="off"
            autoFocus={true}
            placeholder="Search images and photos"
            value={name}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
