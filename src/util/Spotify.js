const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const _scopes = ['playlist-modify-public'];
let _accessToken;
const Spotify = {
	getAccessToken: function () {
		if (_accessToken) {
			return _accessToken;
		}
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
		if (accessTokenMatch && expireInMatch) {
			_accessToken = accessTokenMatch[1];
			const expiresIn = Number(expireInMatch[1]);
			window.setTimeout(() => _accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return _accessToken;
		} else {
			const accessUri = ('https://accounts.spotify.com/authorize' 
				+ '?response_type=token' 
				+ '&client_id=' + encodeURIComponent(clientId)
				+ '&scope=' + encodeURIComponent(_scopes.join(' '))
				+ '&redirect_uri=' + encodeURIComponent(redirectUri));
			window.location = accessUri;
			return;
		}
	},
	
	search: function(searchTerm) {
		const accessToken =  Spotify.getAccessToken();
		return fetch("https://api.spotify.com/v1/search?type=track&q=" + encodeURIComponent(searchTerm), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			}
		}).then(response => {
			if (response) {
				return response.json();
			} 
			return [];
		}).then(responseJSON => {
			if (responseJSON && responseJSON.tracks) {
				return responseJSON.tracks.items.map(track => {
					return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						uri: track.uri,
					};
				});;
			}
			 return [];
		});
	},
	savePlaylist: function(name, trackUris) {
		if(!name && !trackUris.length) {
			return;
		}
		const accessToken = Spotify.getAccessToken();
		const headers = {'Authorization': 'Bearer ' + accessToken};
		return fetch('https://api.spotify.com/v1/me', {headers: headers})
				.then(response => {
					return response.json();
				})
				.then(responseJSON => {
					const userId = responseJSON.id;
					fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
						headers: headers,
						method: 'POST',
						body: JSON.stringify({name: name}),
					}).then(response => {
						return response.json();
					}).then(responseJSON => {
						const playlistId = responseJSON.id;
						return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
							headers:headers,
							method: 'POST',
							body: JSON.stringify({uris: trackUris})
						});
					}).then(response => {
						return response.json();
					});
				});
	}
	
};

export default Spotify;