<template>
  <div
    class="flex-grow relative rounded-3xl bg-gradient-to-br from-green-300 to-blue-300 shadow-sm overflow-hidden"
  >
    <div class="w-full h-full flex align-center justify-center items-center">
      <div
        v-if="mainUser != null && mainUser.videoTrack != null"
        id="main-video"
        class="object-cover h-full w-full"
      >
        <stream-single :key="mainUser.uid" :user="mainUser" />
      </div>

      <div v-else class="w-64">
        <img
          src="https://www.pngkit.com/png/full/242-2421234_kawaii-cats-render-by-sweetkawaiilove-on-deviantart-anime.png"
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
      class="flex space-x-1 justify-center align-center absolute top-4 left-4 py-1 px-2 shadow-lg rounded-md bg-white"
    >
      <div class="flex items-center w-3 h-3 md:w-4 md:h-4 m-auto rounded-full">
        <img
        class="w-3/4 h-3/4"
          :src="
            networkQuality == 0
              ? '/image/loading.gif'
              : `/image/network-${networkQuality}.png`
          "
          alt=""
        />
      </div>
      <p class="font-medium text-gray-400 antialiased text-xs">08:10</p>
    </div>

    <div
      class="flex flex-wrap flex-wrap-reverse h-full flex-col absolute top-0 right-2 py-4"
    >
      <div
        class="w-16 h-16 mb-1 ml-1 bg-black rounded-full border-2 border-white overflow-hidden"
      >
        <stream-single
          v-if="localVideo != null"
          :user="{ uid: client.uid, videoTrack: localVideo }"
        />
      </div>
      <div
        v-for="(user, index) in otherUsers"
        :key="'video-track-' + user.uid"
        class="w-16 h-16 mb-1 ml-1 bg-black rounded-full border-2 border-white overflow-hidden"
      >
        <stream-single v-on:click="changeMainUser(index)" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import StreamSingle from "./stream-single.vue";
export default {
  components: { StreamSingle },
  props: {
    client: { type: Object, required: true },
    localVideo: { type: Object, required: false },
  },
  setup(props) {
    // State
    var mainUser = ref();
    var otherUsers = ref([]);
    var networkQuality = ref(0);

    // Check network quality
    function checkNetworkQuality() {
      // Check network quality
      props.client.on("network-quality", (stats) => {
        networkQuality.value = stats.downlinkNetworkQuality;
      });
    }

    // Update user list everytime event push
    function checkUserList() {
      setInterval(() => {
        let remoteUsers = props.client.remoteUsers;
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
    checkNetworkQuality();

    // Return
    return { mainUser, otherUsers, changeMainUser, networkQuality };
  },
};
</script>