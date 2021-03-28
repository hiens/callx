<template>
  <div
    class="h-full hidden lg:block ml-6 rounded-3xl overflow-hidden bg-white shadow-sm"
  >
    <div class="h-full flex flex-col">
      <div class="p-4 text-xl font-semibold">Chat</div>
      <div class="w-full flex-grow flex flex-col-reverse overflow-y-auto px-4">
        <div
          class="mt-2 flex flex-row-reverse mb-2 space-x-2 justify-items-end items-end"
        >
          <div class="flex flex-col">
            <div class="p-2 rounded-t-xl rounded-bl-xl bg-blue-200 shadow-sm">
              <p class="text-xs font-medium text-blue-900">
                Nyanpasu~ Nyanpasu~ Nyanpasu~ Nyanpasu~ Nyanpasu~
              </p>
            </div>
          </div>
          <div class="w-1/4"></div>
        </div>
        <div
          v-for="item in 3"
          :key="'message-' + item"
          class="flex mb-2 space-x-2 justify-items-end items-end"
        >
          <div
            class="flex-none w-8 h-8 flex justify-center items-center rounded-full bg-yellow-500 text-xl text-white uppercase"
          >
            H
          </div>

          <div class="flex flex-col">
            <p class="text-gray-500 text-xs mb-1">Hotaru</p>
            <div class="p-2 rounded-t-xl rounded-br-xl bg-gray-200 shadow-sm">
              <p class="text-xs font-medium">
                Nyanpasu~ hello hello hello hello hello hello hello hello
              </p>
            </div>
          </div>
          <div class="w-1/4"></div>
        </div>
      </div>
      <div class="flex-flex-col">
        <hr class="mb-1" />
        <div class="flex">
          <div class="w-10 h-10 justify-center align-center">
            <icon-smile class="m-auto h-full text-xl text-gray-500" />
          </div>
          <div class="w-10 h-10 justify-center align-center">
            <icon-attach class="m-auto h-full text-xl text-gray-500" />
          </div>
        </div>
        <textarea
          id="new-message-input"
          type="text"
          name="new-message"
          placeholder="Write your message..."
          cols="10"
          rows="1"
          class="w-full pb-4 border-transparent focus:ring-transparent focus:border-none transition-none"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconSmile from "virtual:vite-icons/uil/smile";
import IconAttach from "virtual:vite-icons/fluent/attach-12-regular";

export default {
  components: {
    IconSmile,
    IconAttach,
  },
};
</script>
