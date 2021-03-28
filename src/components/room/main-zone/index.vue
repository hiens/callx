<template>
  <div class="flex-grow h-full flex h-full flex-col">
    <div class="flex bw-full h-16 g-red-500 p-4 md:pt-0 md:px-0">
      <img src="/image/logo.png" height="50" alt="Callx connect logo" />
      <div class="flex-grow"></div>
      <button
        class="p-0 mx-auto w-10 h-10 md:w-14 md:h-14 rounded-xl hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none bg-gray-500"
      >
        <div class="w-6 md:w-8 m-auto">
          <icon-setting style="width: 100%; height: 100%; color: white" />
        </div>
      </button>
    </div>
    <div
      class="flex-grow relative rounded-3xl bg-red-100 shadow-sm overflow-hidden"
    >
      <div id="main-video" class="object-cover h-full w-full"></div>

      <div
        class="flex space-x-1 justify-center align-center absolute top-4 left-4 py-1 px-2 shadow-lg rounded-md bg-white"
      >
        <div
          class="w-3 h-3 md:w-4 md:h-4 m-auto bg-green-500 rounded-full"
        ></div>
        <p class="font-semibold text-gray-400 antialiased text-xs md:text-base">
          08:10
        </p>
      </div>
    </div>

    <button-bar />
  </div>
</template>

<script>
import { ref } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";
import AppConfigs from "@/configs/app.configs.json";
import IconSetting from "virtual:vite-icons/uil/setting";

export default {
  components: { IconSetting },
  setup() {
    var client = ref();
    var localAudioTrack = ref();
    var localVideoTrack = ref();
    var remoteTracks = ref([]);

    async function updateMainView(mainView, remoteVideoTrack) {
      mainView.style.width = "100%";
      mainView.style.height = "100%";
      document.getElementById("main-video").appendChild(mainView);
      remoteVideoTrack.play(mainView.id);
    }

    async function startVideoCall() {
      // Create client
      client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      // Join channel
      const uid = await client.join(
        AppConfigs.agoraAppId,
        "demo_channel_name",
        null,
        null
      );

      // Create and publish local track
      localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      await client.publish([localAudioTrack, localVideoTrack]);
      var localPlayer = document.createElement("div");
      localPlayer.id = uid;

      updateMainView(localPlayer, localVideoTrack);

      // Subscribe to a remote user
      client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user.
        await client.subscribe(user, mediaType);
        console.log("subscribe success: ${mediaType}");

        // If the subscribed track is video.
        if (mediaType === "video") {
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;
          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          const playerContainer = document.createElement("div");
          // Specify the ID of the DIV container. You can use the `uid` of the remote user.
          playerContainer.id = user.uid.toString();

          updateMainView(playerContainer, remoteVideoTrack);
        }

        // If the subscribed track is audio.
        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          // Play the audio track. No need to pass any DOM element.
          remoteAudioTrack.play();
        }
      });

      client.on("user-unpublished", (user) => {
        // Get the dynamically created DIV container.
        const playerContainer = document.getElementById(user.uid);
        // Destroy the container.
        playerContainer.remove();
      });
    }

    startVideoCall();

    return {  };
  },
};
</script>
