<template>
  <div
    class="flex items-center justify-center space-x-4 md:space-x-10 py-2 md:pt-4 md:pb-0"
  >
    <div class="flex flex-col align-center justify-center space-y-1">
      <button
        v-on:click="switchDevice"
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
          <svg v-if="isAudioEnabled" width="24" height="24" viewBox="0 0 36 36">
            <path
              d="M18 24c3.9 0 7-3.1 7-7V9c0-3.9-3.1-7-7-7s-7 3.1-7 7v8c0 3.9 3.1 7 7 7zM13 9c0-2.8 2.2-5 5-5s5 2.2 5 5v8c0 2.8-2.2 5-5 5s-5-2.2-5-5V9z"
              class="clr-i-outline clr-i-outline-path-1"
              fill="currentColor"
            ></path>
            <path
              d="M30 17h-2c0 5.5-4.5 10-10 10S8 22.5 8 17H6c0 6.3 4.8 11.4 11 11.9V32h-3c-.6 0-1 .4-1 1s.4 1 1 1h8c.6 0 1-.4 1-1s-.4-1-1-1h-3v-3.1c6.2-.5 11-5.6 11-11.9z"
              class="clr-i-outline clr-i-outline-path-2"
              fill="currentColor"
            ></path>
          </svg>

          <svg v-else width="24" height="24" viewBox="0 0 36 36">
            <path
              d="M30 17h-2c0 1.8-.5 3.5-1.4 5l1.5 1.5c1.2-2 1.8-4.2 1.9-6.5z"
              class="clr-i-outline clr-i-outline-path-1"
              fill="currentColor"
            ></path>
            <path
              d="M18 4c2.8 0 5 2.2 5 5v8c0 .4-.1.8-.2 1.2l1.6 1.6c.4-.9.6-1.8.6-2.8V9c0-3.9-3.2-7-7.1-6.9c-2.9 0-5.6 1.9-6.5 4.7L13 8.3c.5-2.4 2.6-4.1 5-4.3z"
              class="clr-i-outline clr-i-outline-path-2"
              fill="currentColor"
            ></path>
            <path
              d="M25.2 26.6l6.9 6.9l1.4-1.4L4 2.6L2.6 4l8.4 8.4V17c0 3.9 3.1 7 7 7c1.3 0 2.5-.3 3.6-1l2.2 2.2C22.1 26.4 20.1 27 18 27c-5.4.2-9.8-4.1-10-9.4V17H6c.1 6.2 4.8 11.4 11 12v3h-3c-.6 0-1 .4-1 1s.4 1 1 1h8c.6 0 1-.4 1-1s-.4-1-1-1h-3v-3c2.2-.2 4.4-1 6.2-2.4zm-11.4-6.9c-.5-.8-.8-1.7-.8-2.7v-2.6l7.1 7.1c-2.2 1-4.9.3-6.3-1.8z"
              class="clr-i-outline clr-i-outline-path-3"
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
          <svg
            v-if="isVideoEnabled"
            width="24"
            height="24"
            viewBox="0 0 256 256"
          >
            <path
              d="M208 56h-27.725L166.65 35.562A8 8 0 0 0 159.994 32h-64a8 8 0 0 0-6.656 3.563L75.713 56H48a24.027 24.027 0 0 0-24 24v112a24.027 24.027 0 0 0 24 24h160a24.027 24.027 0 0 0 24-24V80a24.027 24.027 0 0 0-24-24zm8 136a8.01 8.01 0 0 1-8 8H48a8.01 8.01 0 0 1-8-8V80a8.01 8.01 0 0 1 8-8h31.994a8 8 0 0 0 6.656-3.563L100.275 48h55.438l13.625 20.438A8 8 0 0 0 175.994 72H208a8.01 8.01 0 0 1 8 8zM128 88a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44zm0 72a28 28 0 1 1 28-28a28.031 28.031 0 0 1-28 28z"
              fill="currentColor"
            ></path>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 256 256">
            <path
              d="M39.375 18.619a8 8 0 0 0-11.84 10.762L51.733 56H48a24.027 24.027 0 0 0-24 24v112a24.027 24.027 0 0 0 24 24h149.188l19.438 21.381a8 8 0 0 0 11.84-10.762zm66.202 96.609l36.995 40.695a28.007 28.007 0 0 1-36.995-40.695zM48 200a8.01 8.01 0 0 1-8-8V80a8.01 8.01 0 0 1 8-8h18.279l28.414 31.256A43.994 43.994 0 0 0 128 176a44.196 44.196 0 0 0 25.441-8.121L182.643 200zM232 80v106.029a8 8 0 1 1-16 0V80a8.01 8.01 0 0 0-8-8h-32.006a8 8 0 0 1-6.657-3.563L155.712 48h-55.47a8 8 0 0 1-12.913-9.423l2.007-3.014A8 8 0 0 1 95.994 32h64a8 8 0 0 1 6.656 3.563L180.275 56H208a24.027 24.027 0 0 1 24 24z"
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
import notyf from "@/utils/notyf";

export default {
  emits: ["leave"],
  setup(props, { emit }) {
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

    // Switch device
    function switchDevice() {
      notyf.error("Not implement yet!");
    }

    // End call
    async function endCall() {
      // Destroy the local audio and video tracks.
      localAudio.value.close();
      localVideo.value.close();

      // Leave the channel.
      await client.value.leave();
      emit("leave");
    }

    // Return
    return {
      isAudioEnabled,
      isVideoEnabled,
      toggleAudio,
      toggleVideo,
      endCall,
      switchDevice,
    };
  },
};
</script>