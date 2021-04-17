<template>
  <h4 class="text-xl font-semibold mb-2">App permissions</h4>
  <div class="w-3/4 m-auto">
    <img src="/image/ginger-cat-722.png" alt="" />
  </div>
  <p v-if="permissionsGranted">Permissions are accepted, click <span class="font-semibold">Next</span> to join now!</p>
  <p v-else>
    You must accept <span class="font-semibold">audio</span> and
    <span class="font-semibold">camera</span> permission to continue
  </p>
  <button
    v-on:click="createTracks"
    class="group relative w-full flex justify-center mt-2 py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
  >
    Next
  </button>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import AgoraRTC from "agora-rtc-sdk-ng";
import notyf from "@/utils/notyf";

export default {
  emits: ["done"],
  setup(props, { emit }) {
    // State
    const store = useStore();
    var permissionsGranted = ref(false);

    // Check permission
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionObj) => {
        if (permissionObj.state == "granted") {
          navigator.permissions
            .query({ name: "camera" })
            .then((permissionObj) => {
              if (permissionObj.state == "granted") {
                // Permissions are granted
                permissionsGranted.value = true;
              }
            });
        }
      });

    // Create audio track & video track
    async function createTracks() {
      try {
        // Create local track
        let audioTrack, videoTrack;
        [audioTrack, videoTrack] = await Promise.all([
          AgoraRTC.createMicrophoneAudioTrack(),
          AgoraRTC.createCameraVideoTrack(),
        ]);

        store.commit("setTracks", {
          audioTrack: audioTrack,
          videoTrack: videoTrack,
        })

        emit("done");
      } catch (e) {
        console.error(e)
        notyf.error("Please accept permissions to continue");
      }
    }

    // Return
    return { createTracks, permissionsGranted };
  },
};
</script>
