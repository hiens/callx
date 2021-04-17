<template>
  <div v-if="isCompatible" class="transition duration-1000">
    <div v-if="setupStep == 0" key="transition-item-0">
      <enter-password-step v-on:done="nextStep" />
    </div>
    <div v-else key="transition-item-1">
      <request-permission-step v-on:done="nextStep" />
    </div>
  </div>
  <div v-else>
    <h4 class="text-xl font-semibold mb-2">Browser not supported</h4>
    <p>You seem to be using an unsupported browser. Recommended browser:</p>
    <a
      v-for="(item, index) in supportedBrowsers"
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
import EnterPasswordStep from "./steps/enter-password-step.vue";
import RequestPermissionStep from "./steps/request-permission-step.vue";

export default {
  components: {
    EnterPasswordStep,
    RequestPermissionStep,
  },
  emits: ["done"],
  setup(props, { emit }) {
    // State
    var setupStep = ref(0);
    var isCompatible = ref(true);
    var supportedBrowsers = [
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

    function nextStep() {
      if (setupStep.value == 0) {
        setupStep.value = 1;
      } else {
        emit("done")
      }
    }

    // Set log level
    AgoraRTC.setLogLevel(2);

    // Check browser compatibility
    isCompatible.value = AgoraRTC.checkSystemRequirements();
    if (isCompatible.value) {
      //
    }


    return {
      isCompatible,
      setupStep,
      supportedBrowsers,
      nextStep,
    };
  },
};
</script>