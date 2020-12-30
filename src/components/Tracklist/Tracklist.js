import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track/Track';
import './tracklist.css';

class Tracklist extends React.Component {
	constructor(props) {
		super(props);
		this.renderTrack = this.renderTrack.bind(this);
	}
	renderTrack(track) {
		return <Track 
				key={track.id} 
				track={track} 
				onAdd={this.props.onAdd} 
				onRemove={this.props.onRemove}
				isRemoval={this.props.isRemoval} />
	}
	render() {
		return (
			<div className="TrackList">
			{
				this.props.tracks.map(this.renderTrack)
			}
			</div>
		);
	}
}
Tracklist.propTypes = {
	tracks: PropTypes.array.isRequired,
	onAdd: PropTypes.func,
	onRemove: PropTypes.func,
	isRemoval: PropTypes.bool.isRequired
}
export default Tracklist;