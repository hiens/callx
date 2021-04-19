<template>
  <div class="w-full h-full flex align-center justify-center items-center">
    <div class="w-64">
      <img
        :src="hasRemoteViews ? '/image/ginger-cat-robot-cat-twin.png' : '/image/ginger-cat-782.png'"
        alt=""
      />
      <h4 v-if="hasRemoteViews" class="text-center text-xl text-gray-600 mt-4">
        Calling
      </h4>
      <h4 v-else class="text-center text-xl text-gray-600 mt-4">
        Waiting for other users...
      </h4>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    // State
    const store = useStore();
    const client = store.state.client;
    var hasRemoteViews = ref(false);

    // Update user list everytime event push
    function checkRemoteUsers() {
      setInterval(() => {
        hasRemoteViews.value = client.remoteUsers.length > 0;
      }, 1000);
    }

    checkRemoteUsers();

    // Return
    return { hasRemoteViews };
  },
};
</script>