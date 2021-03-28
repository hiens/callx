<template>
  <div class="flex h-screen md:px-10 md:py-6 bg-gray-100">
    <main-zone />
    <chat-zone />
  </div>
</template>

<script>
import MainZone from "@/components/room/main-zone/index.vue";
import ChatZone from "@/components/room/chat-zone/index.vue";

export default {
  components: { MainZone, ChatZone },
};
</script>
