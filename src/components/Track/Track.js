import React from 'react';
import PropTypes from 'prop-types';
import './track.css';

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	renderAction() {
		if (this.props.isRemoval) {
			return <button className="Track-Action" onClick={this.removeTrack}>-</button>;
		} else {
			return <button className="Track-Action" onClick={this.addTrack}>+</button>;
		}
	}
	addTrack() {
		this.props.onAdd(this.props.track);
	}
	removeTrack() {
		this.props.onRemove(this.props.track);
	}
	render() {
		return (
			<div className="Track">
			  <div className="Track-information">
				<h3>{this.props.track.name}</h3>
				<p>{this.props.track.artist} | {this.props.track.album} </p>
			  </div>
			  {this.renderAction()}
			</div>
		);
	}
}
Track.propTypes  = {
	track:  PropTypes.object.isRequired,
	onAdd:  PropTypes.func,
	onRemove:  PropTypes.func,
	isRemoval:  PropTypes.bool.isRequired

}
export default Track;