<template>
  <div v-if="message.body" :class="message.fromMe ? 'container-message outcoming-message' : 'container-message incoming-message'">
    <div class="message">
      <label for="">{{ message.from }} :</label>
      <audio v-if="message.type === 'ptt'" controls="controls" autobuffer="autobuffer">
        <source :src="message.body" />
      </audio>
      <img v-else-if="message.type === 'image'" :src="message.body"/>
      <p v-else>{{ message.body }}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      message: {
        required: true,
        type: Object
      }
    },
  }
</script>
<style scoped>
  label {
    display: block;
  }
  img {
    width: 200px;
  }
  .container-message {
    display: flex;
    margin-bottom: 10px;
  }
  .container-message.outcoming-message{
    justify-content: end;
  }
  .container-message.incoming-message{
    justify-content: start;
  }
  .message {
    max-width: 320px;
    padding: 10px;
    border-radius: 6px;
  }
  .incoming-message .message {
    background-color: darkcyan;
    color: white;
  }
  .outcoming-message .message {
    background-color: violet;
    color: white;
  }
</style>