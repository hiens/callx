<template>
  <div class="h-screen bg-gray-100 flex items-center content-center justify-center">
    <div class="flex h-full 2xl:h-5/6	 max-w-screen-2xl md:p-6 m-auto">
      <main-zone />
      <chat-zone />
    </div>
  </div>
</template>

<script>
import MainZone from "@/components/room/main-zone/index.vue";
import ChatZone from "@/components/room/chat-zone/index.vue";

export default {
  components: { MainZone, ChatZone },
};
</script>
