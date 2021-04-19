export default {
  state() {
    return {
      client: null,
      videoTrack: null,
      audioTrack: null,
      remoteUsers: [],
      roomData: null,
    }
  },
  mutations: {
    setClient(state, client) {
      state.client = client
    },
    setTracks(state, payload) {
      state.audioTrack = payload.audioTrack
      state.videoTrack = payload.videoTrack
    },
    setRoomData(state, data) {
      state.roomData = data
    }
  }
}