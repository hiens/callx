<template>
  <div class="w-full h-full flex align-center justify-center items-center">
    <div
      v-if="mainUser != null && mainUser.videoTrack != null"
      id="main-video"
      class="object-cover h-full w-full"
    >
      <video-single :key="mainUser.uid" :user="mainUser" />
    </div>

    <div v-else class="w-64">
      <img
        :src="
          mainUser != null
            ? '/image/ginger-cat-robot-cat-twin.png'
            : '/image/ginger-cat-782.png'
        "
        alt=""
      />
      <h4
        v-if="mainUser == null"
        class="text-center text-xl text-gray-600 mt-4"
      >
        Waiting for other users...
      </h4>
      <h4 v-else class="text-center text-xl text-gray-600 mt-4">
        User {{ mainUser.uid }}'s video is unavailable!
      </h4>
    </div>
  </div>

  <div
    class="flex flex-wrap flex-wrap-reverse h-full flex-col absolute top-0 right-2 py-4"
  >
    <div
      class="w-16 h-16 mb-1 ml-1 bg-black rounded-full border-2 border-purple-500 overflow-hidden"
    >
      <video-single
        :user="{ uid: client.uid, videoTrack: localVideo }"
        isLocal
      />
    </div>
    <div
      v-for="(user, index) in otherUsers"
      :key="'video-track-' + user.uid"
      class="w-16 h-16 mb-1 ml-1 bg-black rounded-full border-2 border-white overflow-hidden"
    >
      <video-single v-on:click="changeMainUser(index)" :user="user" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import VideoSingle from "./video.vue";

export default {
  components: { VideoSingle },
  setup() {
    // State
    const store = useStore();
    var client = computed(() => store.state.client);
    var localVideo = computed(() => store.state.videoTrack);
    var mainUser = ref();
    var otherUsers = ref([]);

    // Update user list everytime event push
    function checkUserList() {
      setInterval(() => {
        let remoteUsers = store.state.client.remoteUsers;
        if (remoteUsers.length == 0) {
          // There are no remote users
          mainUser.value = null;
          otherUsers.value = [];
        } else {
          // There are one or more remote users in channel
          if (
            mainUser.value == null ||
            !remoteUsers.map((e) => e.uid).includes(mainUser.value.uid)
          ) {
            mainUser.value = remoteUsers[0];
          } else {
            mainUser.value = remoteUsers.find(
              (e) => e.uid == mainUser.value.uid
            );
          }

          otherUsers.value = remoteUsers.filter(
            (e) => e.uid != mainUser.value.uid
          );
        }
      }, 500);
    }

    // Change main user with other user
    function changeMainUser(index) {
      let tUser = mainUser.value;
      mainUser.value = otherUsers.value[index];
      otherUsers.value[index] = tUser;
    }

    checkUserList();

    // Return
    return {
      client,
      localVideo,
      mainUser,
      otherUsers,
      changeMainUser,
    };
  },
};
</script>