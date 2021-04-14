<template>
  <div
    class="h-screen bg-gray-100 flex items-center content-center justify-center"
  >
    <div v-if="stateIndex == 0" class="w-96 mx-6 p-4 bg-white shadow-xl rounded-lg">
      <device-setup />
    </div>
    <div v-else-if="stateIndex == 1" class="flex h-full 2xl:h-5/6 max-w-screen-2xl md:p-6 m-auto">
      <main-zone />
      <chat-zone />
    </div>
    <div v-else>
      Alert
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DeviceSetup from "@/components/room/device-setup/index.vue";
import MainZone from "@/components/room/main-zone/index.vue";
import ChatZone from "@/components/room/chat-zone/index.vue";

export default {
  components: { DeviceSetup, MainZone, ChatZone },
  setup() {
    // State
    var stateIndex = ref(0);

    return { stateIndex };
  },
};
</script>
