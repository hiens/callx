<template>
  <div
    class="flex items-center justify-center space-x-4 md:space-x-10 py-2 md:pt-4 md:pb-0"
  >
    <div class="flex flex-col align-center justify-center space-y-1">
      <button
        class="p-0 mx-auto w-12 h-12 md:w-14 md:h-14 bg-white rounded-full hover:bg-gray-100 mouse shadow-2xl transition ease-in duration-200 focus:outline-none"
      >
        <div class="w-6 m-auto">
          <icon-camera-change style="width: 100%; height: 100%; color: black" />
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
          <icon-microphone style="width: 100%; height: 100%; color: black" />
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
          <icon-webcam style="width: 100%; height: 100%; color: black" />
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
          <icon-call-end style="width: 100%; height: 100%; color: white" />
        </div>
      </button>
      <span class="hidden text-sm font-medium mx-auto md:block">End call</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import AgoraRTC from "agora-rtc-sdk-ng";
import IconCameraChange from "virtual:vite-icons/uil/camera-change";
import IconWebcam from "virtual:vite-icons/uil/webcam";
import IconMicrophone from "virtual:vite-icons/uil/microphone";
import IconCallEnd from "virtual:vite-icons/ic/outline-call-end";

export default {
  components: {
    IconCameraChange,
    IconWebcam,
    IconMicrophone,
    IconCallEnd,
  },
  props: {
    client: { type: Object, required: true },
    localAudio: { type: Object },
    localVideo: { type: Object },
  },
  setup(props) {
    // States
    var isAudioEnabled = ref(true);
    var isVideoEnabled = ref(true);

    // Toggle audio
    function toggleAudio() {
      isAudioEnabled = !isAudioEnabled;
      props.localAudio.setEnabled(isAudioEnabled);
    }

    // Toggle video
    function toggleVideo() {
      isVideoEnabled = !isVideoEnabled;
      props.localVideo.setEnabled(isVideoEnabled);
    }

    // End call
    async function endCall() {
      // Destroy the local audio and video tracks.
      props.localAudio.close();
      props.localVideo.close();

      // Leave the channel.
      await props.client.leave();
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