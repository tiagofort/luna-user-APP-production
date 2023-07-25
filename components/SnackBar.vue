<template>
  <v-row>
    <v-col>
      <v-snackbar v-model="show" :color="color" :timeout="timeout">
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      color: '',
      timeout: -1
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.timeout = state.snackbar.time
        this.show = true
      }
    })
  }
}
</script>