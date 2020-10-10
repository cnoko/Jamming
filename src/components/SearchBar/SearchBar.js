import React from 'react';
import PropTypes from 'prop-types';
import './searchbar.css';


class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		}
		//this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}
	
	handleTermChange(event) {
		const term = document.getElementById('search').value;
		this.setState({
			searchTerm: term
		});
		this.props.onSearch(term);
	}
	
	render() {
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" id="search" />
			<button className="SearchButton" onClick={this.handleTermChange}>SEARCH</button>
			</div>
		);
	}
}

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired
}
export default SearchBar;