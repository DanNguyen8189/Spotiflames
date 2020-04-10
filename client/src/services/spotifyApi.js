import axios from "axios";
import { getHashParams } from '../utils';

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds
const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { accessToken } = data;
    setLocalAccessToken(accessToken);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// called on app start
export const getAccessToken = () => {
  /**
   * TODO
   * Do we want to do this instead?
   *                     headers: {
                        'Authorization': 'Bearer ' + this.$route.query.access_token
                    }
   */
  /* console.log("getAccessToken called");
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  return; */
  // const { error, accessToken, refreshToken } = getHashParams();
  // TODO not too sure about this
  const hashParams = getHashParams();
  const error = hashParams.error;
  const accessToken = hashParams.access_token;
  const refreshToken = hashParams.refresh_token;
  console.log("get hashparams return: " + hashParams.access_token);

  /* if (hashParams.access_token === undefined || !getLocalAccessToken()) {
    console.log("user hasn't logged in");
    return;
  } */
  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refreshToken);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(accessToken);
    return accessToken;
  }

  return localAccessToken;
}
export const token = getAccessToken();

export const logout = () => {
  console.log("removing tokens from local storage");
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  // line below caused error during logout
  // window.location.reload();
};

// Spotify API calls--------------------------------------

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
// export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });
export const getUser = () =>
  axios.get('https://api.spotify.com/v1/me', { headers });

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50', { headers });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers });
export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });
export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });
export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

export const getUserInfo = () => {
  return axios
    .all([getUser(), getTopArtistsShort(), getTopArtistsMedium(), getTopArtistsLong(),
      getTopTracksShort(), getTopTracksMedium(), getTopTracksLong()])
    .then(
      axios.spread((user, topArtistsShort, topArtistsMedium, topArtistsLong,
        topTracksShort, topTracksMedium, topTracksLong) => {
        return {
          user: user.data,
          topArtistsShort: topArtistsShort.data,
          topArtistsMedium: topArtistsMedium.data,
          topArtistsLong: topArtistsLong.data,
          topTracksShort: topTracksShort.data,
          topTracksMedium: topTracksMedium.data,
          topTracksLong: topTracksLong.data
        };
      })
    );
};

export const getTopArtists = () => {
  return axios
    .all([getTopArtistsShort(), getTopArtistsMedium(), getTopArtistsLong()])
    .then(
      axios.spread((topArtistsShort, topArtistsMedium, topArtistsLong) => {
        return {
          topArtistsShort: topArtistsShort.data,
          topArtistsMedium: topArtistsMedium.data,
          topArtistsLong: topArtistsLong.data
        };
      })
    );
};
