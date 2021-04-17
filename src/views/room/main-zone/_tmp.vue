<template>
  <h4 class="text-xl font-semibold mb-2">Device setting</h4>

  <div class="p-3 rounded-md bg-gray-100">
    <h4 class="font-semibold">Microphone</h4>
    <p class="text-xs">Produce sounds to check if the mic works.</p>

    <div class="mt-1 relative">
      <button
        type="button"
        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span class="flex items-center">
          <span class="block truncate"> Tom Cook </span>
        </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <ul
        v-if="false"
        class="z-10 absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          v-for="i of 5"
          :key="i"
          class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
          id="listbox-option-0"
          role="option"
        >
          <div class="flex items-center">
            <span class="font-normal ml-3 block truncate"> Wade Cooper </span>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-3 overflow-hidden h-2 text-xs flex rounded bg-purple-200">
      <div
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
        style="width: 30%"
      ></div>
    </div>
  </div>

  <div class="p-3 my-4 rounded-md bg-gray-100">
    <h4 class="font-semibold">Camera</h4>
    <p class="text-xs">Move in front of the camera to check if it works.</p>

    <div class="mt-1 relative">
      <button
        type="button"
        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span class="flex items-center">
          <span class="block truncate"> Tom Cook </span>
        </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <ul
        v-if="false"
        class="z-10 absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          v-for="i of 5"
          :key="i"
          class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
          id="listbox-option-0"
          role="option"
        >
          <div class="flex items-center">
            <span class="font-normal ml-3 block truncate"> Wade Cooper </span>
          </div>
        </li>
      </ul>
    </div>

    
    <div class="mt-3 w-full bg-red-400 rounded-md">

    </div>
  </div>

  <button
    class="group relative w-full flex justify-center mt-2 py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
  >
    Next
  </button>
</template>

<script>
import { ref } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";

export default {
  setup() {
    // State
    var showCameraPreview = ref(false);
    var mics = ref([]);
    var camera = ref([]);
    var currentMic = ref();
    var currentCamera = ref();

    // Return
    return { showCameraPreview }
  },
};

async function mediaDeviceTest() {
  // play local track on device detect dialog
  localTracks.videoTrack.play("pre-local-player");
  // localTracks.audioTrack.play();

  // get mics
  mics = await AgoraRTC.getMicrophones();
  currentMic = mics[0];
  $(".mic-input").val(currentMic.label);
  mics.forEach((mic) => {
    $(".mic-list").append(`<a class="dropdown-item" href="#">${mic.label}</a>`);
  });

  // get cameras
  cams = await AgoraRTC.getCameras();
  currentCam = cams[0];
  $(".cam-input").val(currentCam.label);
  cams.forEach((cam) => {
    $(".cam-list").append(`<a class="dropdown-item" href="#">${cam.label}</a>`);
  });
}
</script>