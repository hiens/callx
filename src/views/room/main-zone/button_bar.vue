<template>
  <div
    class="flex items-center justify-center space-x-4 md:space-x-10 py-2 md:pt-4 md:pb-0"
  >
    <div class="flex flex-col align-center justify-center space-y-1">
      <button
        class="p-0 mx-auto w-12 h-12 md:w-14 md:h-14 bg-white rounded-full hover:bg-gray-100 mouse shadow-2xl transition ease-in duration-200 focus:outline-none"
      >
        <div class="w-6 m-auto">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12.29 5.21l1.5 1.5a1 1 0 0 0 1.42 0a1 1 0 0 0 .13-1.21H19a1 1 0 0 0 0-2h-3.66a1 1 0 0 0-.13-1.21a1 1 0 0 0-1.42 0l-1.5 1.5a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33zm10.63 3.91a1 1 0 0 0-.21-.33l-1.5-1.5a1 1 0 0 0-1.42 0a1 1 0 0 0-.13 1.21H16a1 1 0 0 0 0 2h3.66a1 1 0 0 0 .13 1.21a1 1 0 0 0 1.42 0l1.5-1.5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76zM11 10a4 4 0 1 0 4 4a4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm9-3a1 1 0 0 0-1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.69l.54-1.62a1 1 0 0 1 .9-.69H10a1 1 0 0 0 0-2H8.44a3 3 0 0 0-2.85 2.06L5.28 8H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      <span class="hidden text-sm font-medium mx-auto md:block">Device</span>
    </div>
    <div class="flex flex-col align-center justify-center space-y-1">
      <button
        v-on:click="toggleAudio"
        class="p-0 mx-auto w-12 h-12 md:w-14 md:h-14 bg-white rounded-full hover:bg-gray-100 mouse shadow-2xl transition ease-in duration-200 focus:outline-none"
      >
        <div class="w-6 m-auto">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 15a4 4 0 0 0 4-4V5a4 4 0 0 0-8 0v6a4 4 0 0 0 4 4zM10 5a2 2 0 0 1 4 0v6a2 2 0 0 1-4 0zm10 6a1 1 0 0 0-2 0a6 6 0 0 1-12 0a1 1 0 0 0-2 0a8 8 0 0 0 7 7.93V21H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.07A8 8 0 0 0 20 11z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      <span class="hidden text-sm font-medium mx-auto md:block">Mic</span>
    </div>
    <div class="flex flex-col align-center justify-center space-y-1">
      <button
        v-on:click="toggleVideo"
        class="p-0 mx-auto w-12 h-12 md:w-14 md:h-14 bg-white rounded-full hover:bg-gray-100 mouse shadow-2xl transition ease-in duration-200 focus:outline-none"
      >
        <div class="w-6 m-auto">
          <svg width="23" height="24" viewBox="0 0 24 24">
            <path
              d="M19 6.5h-1.28l-.32-1a3 3 0 0 0-2.84-2H9.44A3 3 0 0 0 6.6 5.55l-.32 1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3.05zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1zm-8-9a4 4 0 1 0 4 4a4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      <span class="hidden text-sm font-medium mx-auto md:block">Cam</span>
    </div>
    <div class="flex flex-col align-center justify-center space-y-1">
      <button
        v-on:click="endCall"
        class="p-0 mx-auto w-12 h-12 md:w-14 md:h-14 bg-red-600 rounded-full hover:bg-red-700 mouse shadow-2xl transition ease-in duration-200 focus:outline-none"
      >
        <div class="w-6 m-auto">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M18.59 10.52c1.05.51 2.04 1.15 2.96 1.91l-1.07 1.07c-.58-.47-1.21-.89-1.88-1.27v-1.71m-13.2 0v1.7c-.65.37-1.28.79-1.87 1.27l-1.07-1.07c.91-.75 1.9-1.38 2.94-1.9M12 7C7.46 7 3.34 8.78.29 11.67c-.18.18-.29.43-.29.71s.11.53.29.7l2.48 2.48c.18.18.43.29.71.29c.27 0 .52-.1.7-.28c.79-.73 1.68-1.36 2.66-1.85c.33-.16.56-.51.56-.9v-3.1C8.85 9.25 10.4 9 12 9s3.15.25 4.59.73v3.1c0 .4.23.74.56.9c.98.49 1.88 1.11 2.67 1.85c.18.17.43.28.7.28c.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71A16.971 16.971 0 0 0 12 7z"
              fill="white"
            ></path>
          </svg>
        </div>
      </button>
      <span class="hidden text-sm font-medium mx-auto md:block">End call</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AgoraRTC from "agora-rtc-sdk-ng";

export default {
  emits: ['leave'],
  setup(props, {emit}) {
    // States
    const store = useStore();
    var localAudio = computed(() => store.state.audioTrack);
    var localVideo = computed(() => store.state.videoTrack);
    var client = computed(() => store.state.client);
    var isAudioEnabled = ref(true);
    var isVideoEnabled = ref(true);

    // Toggle audio
    function toggleAudio() {
      isAudioEnabled.value = !isAudioEnabled.value;
      localAudio.value.setEnabled(isAudioEnabled.value);
    }

    // Toggle video
    function toggleVideo() {
      isVideoEnabled.value = !isVideoEnabled.value;
      localVideo.value.setEnabled(isVideoEnabled.value);
    }

    // End call
    async function endCall() {
      // Destroy the local audio and video tracks.
      localAudio.value.close();
      localVideo.value.close();

      // Leave the channel.
      await client.value.leave();
      emit('leave')
    }

    // Return
    return {
      isAudioEnabled,
      isVideoEnabled,
      toggleAudio,
      toggleVideo,
      endCall,
    };
  },
};
</script>