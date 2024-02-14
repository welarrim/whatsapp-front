<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-text>
          <message-block v-for="message in messages" :key="message.id._serialized" :message="message"/>
          <send-message />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    messages() {
      return this.$store.state.messages
    }
  },
}
</script>

