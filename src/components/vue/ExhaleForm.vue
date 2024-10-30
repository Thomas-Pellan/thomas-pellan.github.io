<template>
  <div id="exhale-form"
      class="m-form m-form-exhale"
      aria-label="Demander à etre contacté pour le programme exhale"
  >
    <div class="m-form-field m-form-exhale-field">
      <label for="phone">Prenez un premier rendez vous par téléphone :</label>
      <input
          type="tel"
          name="phone"
          id="phone"
          v-model="prospectData.phone"
          maxlength="60"
          required
      />
    </div>
    <button v-if="!isSuccess" class="m-form-exhale-button" @click="sendData">
      Suivant
    </button>
    <p v-if="isSuccess" class="m-form-exhale-text">
      Merci, je vous recontacterai prochainement.
    </p>
  </div>
</template>
<script>
import {mapStores} from "@nanostores/vue";
import {prospect, sendContact} from '../../store/contact-form'
import Prospect from "../../class/Prospect";

export default {
  name: 'ExhaleForm',
  props: {
  },
  setup() {
    return {
      ...mapStores({prospect,})
    }
  },
  data() {
    return {
      prospectData: {},
      msg: '',
      isSuccess: false,
    }
  },
  computed: {

  },
  created() {
    this.prospectData = this.prospect.value ? this.prospect.value : {}
  },
  methods: {
    async sendData(e){
      e.preventDefault()
      prospect.set(new Prospect(null, null, this.prospectData.phone, null, null, null))
      this.isSuccess = await sendContact();
    }
  }
}
</script>