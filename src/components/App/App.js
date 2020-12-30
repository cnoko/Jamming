import React from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this._defaultPlaylistName = "New Playlist";
		this.state = {
			searchResults: [], //[{"id":1,"name":"name0","artist":"artist0","album":"album0","uri":"http://localhost:3000/"},{"id":2,"name":"name1","artist":"artist1","album":"album1","uri":"http://localhost:3000/"},{"id":3,"name":"name2","artist":"artist2","album":"album2","uri":"http://localhost:3000/"},{"id":4,"name":"name3","artist":"artist3","album":"album3","uri":"http://localhost:3000/"},{"id":5,"name":"name4","artist":"artist4","album":"album4","uri":"http://localhost:3000/"},{"id":6,"name":"name5","artist":"artist5","album":"album5","uri":"http://localhost:3000/"}],
			playlistTracks: [], //[{"id":1,"name":"name0","artist":"artist0","album":"album0","uri":"http://localhost:3000/"}],
			playlistName: this._defaultPlaylistName,
		};
		['addTrack', 'removeTrack', 'updatePlaylistName', 'savePlaylist', 'search'].forEach(method => {
			this[method] = this[method].bind(this);
		});
	}
	savePlaylist() {
		const trackUris = this.state.playlistTracks.map(track => track.uri);
		Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
			this.setState({
				playlistName: this._defaultPlaylistName,
				playlistTracks: [],
			});
		});
	}
	updatePlaylistName(name) {
		this.setState({
			playlistName: name
		});
	}
	addTrack(track) {
		console.log('add...');
		if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
			return;
		}
			let tracks = this.state.playlistTracks;
			tracks.push(track)
			this.setState({
				playlistTracks: tracks,
			});
	}
	removeTrack(track) {
		console.log('remove...');
		let tracks = this.state.playlistTracks;
		tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
		this.setState({
			playlistTracks: tracks
		})
	}
	search(searchTerm) {
		Spotify.search(searchTerm).then(searchResults => {
			this.setState({
				searchResults: searchResults
			});
		});
	}
	
	
	render() {
		return (
		<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
						<SearchResults 
							searchResults={this.state.searchResults} 
							onAdd={this.addTrack} 
							isRemoval={false} />
						<Playlist 
							playlistName={this.state.playlistName} 
							playlistTracks={this.state.playlistTracks} 
							onRemove={this.removeTrack} 
							onChangeName={this.updatePlaylistName}
							savePlaylist={this.savePlaylist}
							isRemoval={true} /> 
					</div>
				</div>
			</div>
		);
	}
}
