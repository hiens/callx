<template>
  <div v-if="isCompatible">
    <div v-if="setupStep == 0">
      <h4 class="text-xl font-semibold mb-2">Get started</h4>
      <p>
        You must accept <span class="font-semibold">audio</span> and
        <span class="font-semibold">camera</span> permission to continue
      </p>
      <button
        class="group relative w-full flex justify-center mt-2 py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
      >
        Next
      </button>
    </div>
    <div v-else>
      <h4 class="text-xl font-semibold mb-2">Get started</h4>
      <p>
        You must accept <span class="font-semibold">audio</span> and
        <span class="font-semibold">camera</span> permission to continue
      </p>
      <button
        class="group relative w-full flex justify-center mt-2 py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
      >
        Next
      </button>
    </div>
  </div>
  <div v-else>
    <h4 class="text-xl font-semibold mb-2">Browser not supported</h4>
    <p>You seem to be using an unsupported browser. Recommended browser:</p>
    <a
      v-for="(item, index) in supportedBrowser"
      :key="'browser-index-' + index"
      :href="item.url"
      target="_blank"
    >
      <div class="flex items-center mt-1 p-1 rounded-lg hover:bg-gray-100">
        <div class="w-12 h-12 mr-2">
          <img :src="item.icon" alt="" />
        </div>
        <div class="flex-grow">
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-xs text-blue-500">Download for free</p>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { ref } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";

export default {
  setup() {
    // State
    var setupStep = ref(0);
    var isCompatible = ref(true);
    var permissionGranted = false;
    var supportedBrowser = [
      {
        icon: "/image/ms-edge.png",
        name: "Microsoft Edge",
        url: "https://www.microsoft.com/vi-vn/edge",
      },
      {
        icon: "/image/chrome.png",
        name: "Google Chome",
        url: "https://www.google.com/intl/vi_vn/chrome/",
      },
    ];

    // Set log level
    AgoraRTC.setLogLevel(2);

    // Check browser compatibility
    isCompatible.value = AgoraRTC.checkSystemRequirements();
    if (isCompatible.value) {
      //
    }

    // Check permission
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionObj) => {
        console.log(permissionObj.state);
      });

    navigator.permissions.query({ name: "camera" }).then((permissionObj) => {
      console.log(permissionObj.state);
    });

    return { isCompatible, setupStep, supportedBrowser };
  },
};
</script>