<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="/image/logo.png" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create new room
        </h2>
      </div>
      <form class="mt-8 space-y-4">
        <div class="flex">
          <button
            type="button"
            v-on:click="enableVideo = false"
            class="flex-1 text-xs rounded-r-none hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-semibold cursor-pointer border duration-200 ease-in-out transition"
            v-bind:class="{
              'hover:bg-gray-200 bg-gray-100 text-gray-500 border-gray-300': enableVideo,
              'hover:bg-purple-200 bg-purple-100 text-purple-500 border-purple-300': !enableVideo,
            }"
          >
            Voice call
          </button>
          <button
            type="button"
            v-on:click="enableVideo = true"
            class="flex-1 text-xs rounded-l-none hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-semibold cursor-pointer border duration-200 ease-in-out transition"
            v-bind:class="{
              'hover:bg-gray-200 bg-gray-100 text-gray-500 border-gray-300': !enableVideo,
              'hover:bg-purple-200 bg-purple-100 text-purple-500 border-purple-300': enableVideo,
            }"
          >
            Video call
          </button>
        </div>

        <div class="flex">
          <input
            v-model="roomName"
            id="room-name"
            name="room-name"
            type="text"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Room name"
            onkeypress="return /[a-z, 0-9]/i.test(event.key)"
          />
          <button
            type="button"
            v-on:click="genRoomName"
            class="ml-1 justify-center p-2 text-gray-500 transition duration-150 rounded-md border border border-grey-300 focus:outline-none"
          >
            <svg role="img" width="20" height="20" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M12.793 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L14.086 7H12.5C8.952 7 6 9.952 6 13.5S8.952 20 12.5 20s6.5-2.952 6.5-6.5a1 1 0 1 1 2 0c0 4.652-3.848 8.5-8.5 8.5S4 18.152 4 13.5S7.848 5 12.5 5h1.586l-1.293-1.293a1 1 0 0 1 0-1.414z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </button>
        </div>

        <div
          class="duration-200 transition-all ease-in-out"
          v-bind:class="{
            'px-4 py-2 bg-red-200 rounded-md shadow-sm': autoClose,
          }"
        >
          <div class="flex items-center">
            <input
              v-model="autoClose"
              id="auto-close-toggle"
              name="auto-close-toggle"
              type="checkbox"
              class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <div class="ml-3 flex-grow">
              <div class="w-full">
                <label
                  for="auto-close-toggle"
                  class="text-sm text-gray-900"
                  v-bind:class="{ 'text-red-600 font-medium': autoClose }"
                >
                  Auto disconnect
                  <span v-if="autoClose">at: </span>
                </label>
              </div>

              <input
                v-if="autoClose"
                type="datetime-local"
                ref="closedAt"
                id="close-time"
                name="close-time"
                class="text-sm appearance-none rounded bg-red-200 text-red-600 font-medium border-red-600 leading-tight focus:outline-none focus:ring-red-600 focus:border-red-600"
                v-model="closeAt"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          v-on:click="createRoom"
          class="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
        >
          Create room
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CryptoUtils from "@/utils/crypto-utils";

export default {
  setup() {
    // Setup dayjs
    dayjs.extend(localizedFormat);

    // State
    var roomName = ref();
    var enableVideo = ref(true);
    var autoClose = ref(false);
    var closeAt = ref(dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"));

    // Generate random room name
    function genRoomName() {
      var length = 10;
      var result = [];
      var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      roomName.value = result.join("");
    }

    // Generate short link
    function createRoom() {
      let data = {
        video: enableVideo.value,
        closeAt: autoClose.value ? closeAt.value : null,
      };

      let token = CryptoUtils.encrypt(JSON.stringify(data), "");

    }

    // Return
    return {
      roomName,
      genRoomName,
      createRoom,
      enableVideo,
      autoClose,
      closeAt,
    };
  },
};
</script>
