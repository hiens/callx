<template>
  <div
    class="h-screen bg-gray-100 flex items-center content-center justify-center"
  >
    <div v-if="stateIndex == 0" class="w-96 mx-6 p-4 bg-white shadow-xl rounded-lg">
      <device-setup v-on:done="stateIndex++" />
    </div>
    <div v-else-if="stateIndex == 1" class="flex h-full 2xl:h-5/6 w-full max-w-screen-2xl md:p-6 m-auto">
      <main-zone v-on:leave="stateIndex++" />
      <chat-zone />
    </div>
    <div v-else>
      <img class="max-w-xs" src="/image/ginger-cat-738.png" alt="">
      <h1 class="text-center text-3xl font-black">Call ended!</h1>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DeviceSetup from "./device-setup/index.vue";
import MainZone from "./main-zone/index.vue";
import ChatZone from "./chat-zone/index.vue";

export default {
  components: { DeviceSetup, MainZone, ChatZone },
  setup() {
    // State
    var stateIndex = ref(0);

    return { stateIndex };
  },
};
</script>
