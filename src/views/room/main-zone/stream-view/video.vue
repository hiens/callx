<template>
  <div
    :id="isLocal ? 'pre-local-player' : user.uid.toString()"
    class="w-full h-full"
  ></div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: {
    key: { type: String, required: false },
    user: { type: Object, required: false },
    isLocal: { type: Boolean, required: false },
  },
  setup(props) {
    function playStream() {
      const videoTrack = props.user.videoTrack;
      if (videoTrack != null) {
        videoTrack.play(
          props.isLocal ? "pre-local-player" : props.user.uid.toString()
        );
      }
    }

    onMounted(playStream);
  },
};
</script>