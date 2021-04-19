<template>
  <div
    class="flex-grow relative rounded-3xl bg-gradient-to-br from-green-300 to-blue-300 shadow-sm overflow-hidden"
  >
    <video-view v-if="videoEnabled"></video-view>
    <audio-view v-else></audio-view>
    <div
      class="flex space-x-1 justify-center align-center absolute top-4 left-4 py-1 px-2 shadow-lg rounded-md bg-white"
    >
      <div class="flex items-center w-3 h-3 md:w-4 md:h-4 m-auto rounded-full">
        <img
          class="w-3/4 h-3/4"
          :src="
            networkQuality == 0
              ? '/image/loading.gif'
              : `/image/network-${networkQuality}.png`
          "
          alt=""
        />
      </div>
      <p class="font-medium text-gray-400 antialiased text-xs">
        {{ callingTimeStr }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import VideoView from "./video-view.vue";
import AudioView from "./audio-view.vue";
import notyf from "@/utils/notyf";

export default {
  components: { AudioView, VideoView },
  emits: ['leave'],
  setup(props, { emit }) {
    // State
    const store = useStore();
    const videoEnabled = store.state.roomData.video;
    const endTime = store.state.roomData.closeAt;
    const client = store.state.client;
    const localAudio = store.state.audioTrack;
    const localVideo = store.state.videoTrack;
    var networkQuality = ref(0);
    var callingTime = ref(0);

    // Check network quality
    function checkNetworkQuality() {
      // Check network quality
      client.on("network-quality", (stats) => {
        networkQuality.value = stats.downlinkNetworkQuality;
      });
    }

    // End call
    async function endCall() {
      // Destroy the local audio and video tracks.
      localAudio.close();
      if (videoEnabled) localVideo.close();

      // Leave the channel.
      await client.leave();
      emit("leave");
    }

    // Check calling time
    function checkCallingTime() {
      setInterval(() => {
        // Get calling time
        if (client.remoteUsers.length > 0) {
          callingTime.value += 1;
        }

        // Auto stop checker
        if (endTime) {
          let now = dayjs();
          let closeAt = dayjs(endTime);
          let secondsDiff = closeAt.diff(now, "second");

          console.log(secondsDiff);

          if (secondsDiff == 60) {
            notyf("The room will close in 1 minute");
          } else if (secondsDiff < 0) {
            endCall();
          }
        }
      }, 1000);
    }

    // Default run
    checkCallingTime();
    checkNetworkQuality();

    return {
      videoEnabled,
      networkQuality,
      callingTimeStr: computed(
        () =>
          `${
            parseInt(callingTime.value / 60 > 10)
              ? parseInt(callingTime.value / 60)
              : "0" + parseInt(callingTime.value / 60)
          }:${
            callingTime.value % 60 > 10
              ? callingTime.value % 60
              : "0" + (callingTime.value % 60)
          }`
      ),
    };
  },
};
</script>