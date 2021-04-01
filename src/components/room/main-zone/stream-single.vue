<template>
  <div :id="user.uid.toString()" class="w-full h-full"></div>
</template>

<script>
import { onMounted } from "vue";
export default {
  props: {
    key: { type: String, required: false },
    user: { type: Object, required: false },
  },
  setup(props) {
    function playStream() {
      const remoteVideoTrack = props.user.videoTrack;
      if (remoteVideoTrack != null) {
        remoteVideoTrack.play(props.user.uid.toString());
      }
    }

    onMounted(playStream);
  },
};
</script>