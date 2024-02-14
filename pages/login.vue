<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Connexion
        </v-card-title>
        <v-card-text>
          <qrcode v-if="qr" :value="qr" :options="{
            width: 300
          }"></qrcode>
          <p v-else>Veuillez patienter le temps que je reçois le QR Code.</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
export default {
  name: 'IndexPage',
  components: {
    qrcode: VueQrcode,
  },
  computed: {
    qr() {
      return this.$store.state.qrCode
    }
  }
}
</script>
