import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResult';

class Search extends Component {
  state = {
    searchText: '',
    amount: 10,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '10356678-58718323202bb9cd1325a4ab8',
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => {
            this.setState({ images: res.data.hits });
          })
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };
  render() {
    return (
      <div>
        <TextField
          name="searchText"
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          defaultValue={this.searchText}
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={25} primaryText="25" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
export default Search;
