import React from 'react';
import PropTypes from 'prop-types';
import Tracklist from '../Tracklist/Tracklist';
import './searchresults.css';

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				<Tracklist 
					tracks={this.props.searchResults} 
					onAdd={this.props.onAdd}
					isRemoval={this.props.isRemoval} />
			</div>
		);
	}
}
SearchResults.propTypes = {
	searchResults: PropTypes.array.isRequired,
	onAdd: PropTypes.func.isRequired,
	isRemoval: PropTypes.bool.isRequired
}