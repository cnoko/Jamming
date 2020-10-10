import React from 'react';
import PropTypes from 'prop-types';
import Tracklist from '../Tracklist/Tracklist';
import './playlist.css';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	handleNameChange(event) {
		this.props.onChangeName(event.target.value);
	}
	render() {
		return (
			<div className="Playlist">
				<input 
					value={this.props.playlistName}
					onChange={this.handleNameChange} id="playlistName" />
				 <Tracklist 
					tracks={this.props.playlistTracks} 
					onRemove={this.props.onRemove} 
					isRemoval={this.props.isRemoval} /> 
				 <button className="Playlist-save" onClick={this.props.savePlaylist} >SAVE TO SPOTIFY</button>
			</div>
		);
	}
}
Playlist.propTypes = {
	playlistName: PropTypes.string.isRequired,
	playlistTracks: PropTypes.array.isRequired,
	savePlaylist: PropTypes.func.isRequired,
	onChangeName: PropTypes.func.isRequired,
	isRemoval: PropTypes.bool.isRequired,
}
export default Playlist;