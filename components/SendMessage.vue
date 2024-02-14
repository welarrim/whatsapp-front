<template>
  <div>
    <v-textarea
        v-model="message"
        auto-grow
        variant="filled"
        label="Message"
        rows="1"
      ></v-textarea>
      <v-select
        label="Envoyer à"
        item-text="name"
        item-value="id"
        :items="group"
        v-model="sendTo"
      ></v-select>
      <v-btn
        :disabled="!message || !sendTo"
        :loading="isLoading"
        @click="sendMessage"
      >
        Envoyer
      </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      socket: null,
      sendTo: null,
      message: null,
      isLoading: false,
    }
  },
  computed: {
    group() {
      const filteredArray = [];
      let result;
      this.$store.state.group.forEach(element => {
        result = this.$store.state.contacts.find(element2 => element2.id === element)
        if (result) {
          filteredArray.push({
            "id": result.id,
            "name": result.name
          })
        }
      });
      return filteredArray
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: ''
    })
  },
  methods: {
    sendMessage() {
      this.socket.emit('send-message', {message: this.message, to: this.sendTo})
    }
  }
}
</script>