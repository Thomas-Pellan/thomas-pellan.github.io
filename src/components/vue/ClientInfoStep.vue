<template>
    <form @submit="validate" class="m-form">
        <p  class="m-form-title">
            Vous contacter :
        </p>
        <div class="m-form-field">
            <label for="name">Nom et Prénom *</label>
            <input
                name="name"
                id="name"
                v-model="prospectData.name"
                maxlength="50"
                required
            />
        </div>
        <div class="m-form-field">
            <label for="mail">Adresse Email *</label>
            <input
                type="email"
                name="mail"
                id="mail"
                v-model="prospectData.mail"
                maxlength="60"
                required
            />
        </div>
        <div class="m-form-field">
            <label for="phone">Téléphone *</label>
            <input
                type="tel"
                name="phone"
                id="phone"
                v-model="prospectData.phone"
                maxlength="60"
                required
            />
        </div>
        <div v-if="isCompany">
            <div class="m-form-field">
                <label for="phone">Nom de l'entreprise *</label>
                <input
                    name="company"
                    id="company"
                    v-model="prospectData.companyName"
                    maxlength="60"
                    required
                />
            </div>
            <div class="m-form-field">
                <label for="phone">Poste Occupé</label>
                <input
                    name="poste"
                    id="poste"
                    v-model="prospectData.title"
                    maxlength="60"
                />
            </div>
        </div>
        <div class="m-form-checkbox">
            <input
                type="checkbox"
                name="consent"
                id="consent"
                v-model="prospectData.news"
            />
            <label for="consent">
                Je coche cette case pour recevoir des informations promotionnelles de la part d'IBF Equicoaching concernant les nouveautes ou les evenements a venir.
            </label>
        </div>
        <div class="m-form-checkbox">
            <input
                type="checkbox"
                name="consent"
                id="consent"
                v-model="prospectData.consent"
                required
            />
            <label for="consent">
                En cochant cette case, j'accepte que IBF-Equicoaching conserve mes données personnelles remplies
                ci-dessus pour me recontacter. <a href="/mentions-legales">Mentions légales</a>
            </label>
        </div>
        <div>
            <button>
                Suivant
            </button>
            <button type="button" @click="backToType">
                Retour
            </button>
        </div>
    </form>
</template>
<script>

import {mapStores} from '@nanostores/vue'
import {clientType, prospect} from '../../store/contact-form'
import ExtendedProspect from '../../class/ExtendedProspect'

export default {
    name: 'ClientInfoStep',
    setup() {
        return {
            ...mapStores({clientType, prospect})
        }
    },
    data() {
        return {
            prospectData: {},
        }
    },
    created() {
      if(prospect.get()){
          this.prospectData = prospect.get()
      }
    },
    computed: {
        isCompany() {
            return clientType.get() === 'company'
        }
    },
    methods: {
        backToType() {
            clientType.set(null)
            this.$emit('step-back')
        },
        async validate(e){
            e.preventDefault()
            prospect.set(new ExtendedProspect(this.prospectData.name, this.prospectData.mail, this.prospectData.phone, this.prospectData.consent, this.prospectData.companyName, this.prospectData.title, this.prospectData.news))
            this.$emit('step-valid')
        },
    }
}
</script>