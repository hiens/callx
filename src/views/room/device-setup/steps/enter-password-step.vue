<template>
  <div v-if="isValid">
    <h4 class="text-xl font-semibold mb-2">Get started</h4>
    <div class="w-3/4 m-auto">
      <img src="/image/ginger-cat-733.png" alt="" />
    </div>
    <p>Please enter the room password</p>
    <input
      v-model="password"
      v-on:keyup.enter="decyptData"
      required
      class="appearance-none rounded-md relative block w-full mt-1 mb-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Room password"
      onkeypress="return /[a-z, 0-9]/i.test(event.key)"
    />
    <button
      v-on:click="decyptData"
      class="group relative w-full flex justify-center mt-2 py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
    >
      Next
    </button>
  </div>
  <div v-else>
    <h4 class="text-xl font-semibold mb-2">Hmm</h4>
    <p>Sorry, the token is invalid!</p>
  </div>
</template>

<script>
import { ref } from "vue";
import CryptoUtils from "@/utils/crypto-utils";
import { useRoute } from "vue-router";
import notyf from "@/utils/notyf";

export default {
  emits: ["done"],
  setup(props, { emit }) {
    // State
    var route = useRoute();
    var isValid = ref(route.query.token ? true : false);
    var password = ref();

    // Decrypt query token
    function decyptData() {
      try {
        const decryptedData = CryptoUtils.decrypt(
          route.query.token,
          password.value
        );
        const decryptedJson = JSON.parse(decryptedData);
        if (decryptedJson && decryptedJson.video) {
          emit("done");
        }
      } catch (e) {
        notyf.error("Wrong password");
      }
    }

    // Return
    return { isValid, password, decyptData };
  },
};
</script>