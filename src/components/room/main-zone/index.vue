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

    <stream-view
      :client="client"
      :local-video="localVideoTrack"
    />

    <button-bar
      v-if="client != null"
      :client="client"
      :local-audio="localAudioTrack"
      :local-video="localVideoTrack"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import AppConfigs from "@/configs/app.configs.json";
import IconSetting from "virtual:vite-icons/uil/setting";
import StreamView from "./stream-view.vue";
import ButtonBar from "./button_bar.vue";

export default {
  components: { IconSetting, StreamView, ButtonBar },
  setup() {
    const notyf = new Notyf({
      duration: 3000,
      dismissible: true,
      position: {
        x: "right",
        y: "top",
      },
    });
    AgoraRTC.setLogLevel(2);
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    var localAudioTrack = ref();
    var localVideoTrack = ref();

    async function eventHandler() {
      // Subscribe to a remote user
      client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user
        await client.subscribe(user, mediaType);

        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      });

      client.on("user-unpublished", (user) => {
        console.log("user-unpublished" + user.uid);
      });
      client.on("connection-state-change", (curState, revState, reason) => {
        console.log("connection-state-change", curState);
      });
      client.on("user-joined", (user) => {
        console.log("user-joined: " + user.uid);
        notyf.success(`User ${user.uid} joined`);
      });
      client.on("user-left", (user) => {
        console.log("user-left: " + user.uid);
        notyf.success(`User ${user.uid} leaved`);
      });
    }

    async function startVideoCall() {
      // Join channel
      await client.join(AppConfigs.agoraAppId, "demo_channel_name", null);

      // Create and publish local track
      localAudioTrack.value = await AgoraRTC.createMicrophoneAudioTrack();
      localVideoTrack.value = await AgoraRTC.createCameraVideoTrack();
      await client.publish([localAudioTrack.value, localVideoTrack.value]);
    }

    // Call function
    eventHandler();
    startVideoCall();

    return { client, localAudioTrack, localVideoTrack };
  },
};
</script>
