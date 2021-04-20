<template>
  <div class="flex-grow w-full flex h-full flex-col">
    <div class="flex w-full h-16 g-red-500 p-4 md:pt-0 md:px-0">
      <img src="/image/logo.png" height="50" width="150" alt="Callx connect logo" />
      <div class="flex-grow"></div>
    </div>

    <stream-view v-on:leave="emit('leave')" />

    <button-bar v-on:leave="emit('leave')" />
  </div>
</template>

<script>
import AgoraRTC from "agora-rtc-sdk-ng";
import notyf from "@/utils/notyf";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import AppConfigs from "@/configs/app.configs.json";
import StreamView from "./stream-view/index.vue";
import ButtonBar from "./button_bar.vue";

export default {
  components: { StreamView, ButtonBar },
  emits: ["leave"],
  setup(props, { emit }) {
    // Store
    const store = useStore();
    const route = useRoute();
    const videoEnabled = store.state.roomData.video;

    // Create client
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    store.commit("setClient", client);

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
        notyf.error(`User ${user.uid} leaved`);
      });
    }

    async function startVideoCall() {
      // Join channel
      await client.join(AppConfigs.agoraAppId, route.params.id, null);
      await client.publish(
        videoEnabled
          ? [store.state.videoTrack, store.state.audioTrack]
          : [store.state.audioTrack]
      );
    }

    // Call function
    eventHandler();
    startVideoCall();

    // Return
    return { emit };
  },
};
</script>
