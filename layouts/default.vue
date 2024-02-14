<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app color="green">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn @click="disconnect">Déconnexion</v-btn>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer
        v-model="drawer"
        :absolute="true"
        temporary
      >
        <v-list-item title="Contacts">Contacts</v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="contact in contacts" :key="contact.id" link title="List Item 1"><v-checkbox v-model="selectedContact" :value="contact.id" :label="contact.name"></v-checkbox></v-list-item>
      </v-navigation-drawer>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; KaDev {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'KaDev Whatsapp',
      drawer: false,
      selectedContact: []
    }
  },
  computed: {
    contacts() {
      return this.$store.state.contacts
    }
  },
  watch: {
    selectedContact(value) {
      this.$store.commit('setGroup', value)
      this.socket.emit('contactSelected', value)
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: ''
    })
    /* Listen for events: */
    this.socket
      .on('qr', (msg) => {
        this.$store.commit('setQrCode', msg)
        this.$store.commit('setIsAuth', false)
        this.$router.push('/login')
      })
      .on('session-closed', () => {
        this.$router.push('/login')
      })
      .on('connected', (msg) => {
        this.$store.commit('setContacts', msg.contacts)
        this.$store.commit('setMessages', msg.chats)
        this.$store.commit('setIsAuth', true)
        this.$router.push('/')
      })
      .on('updateMsgs', (msgs) => {
        this.$store.commit('setMessages', msgs)
      })
      .on('message-received', (msg) => {
        this.$store.commit('appendMessage', msg)
      })
  },
  methods: {
    disconnect() {
      this.socket.emit('close-session')
    }
  }
}
</script>
