<template>
    <div
            id="contact-form"
            class="m-event-form"
            aria-label="S'inscrire à un évènement"
    >
        <div v-if="isValidating" class="m-event-form-wait">
            Envoi du formulaire, Veuillez patienter...
        </div>
        <form v-if="!isCompleted && !isValidating" @submit="validateForm">
            <p>
                Je souhaite m'inscrire :
            </p>
            <label>Date de l'évènement *
                <select name="date"
                        v-model="selectDate"
                        required
                >
                    <option
                            v-for="date in dates"
                            v-bind:value="date"
                            :selected="date === selectDate"
                    >
                        {{ date.toLocaleDateString('fr-FR') }}
                    </option>
                </select>
            </label>
            <label>Nombre d'inscrits *
                <input
                        name="nombre"
                        min="1"
                        max="10"
                        v-model="subNumber"
                        type="number"
                        required
                />
            </label>
            <label>Nom et Prénom *
                <input
                        name="name"
                        v-model="prospectData.name"
                        maxlength="50"
                        required
                />
            </label>
            <label>Adresse Email *
                <input
                        type="email"
                        name="mail"
                        v-model="prospectData.mail"
                        maxlength="60"
                        required
                />
            </label>
            <label>Téléphone *
                <input
                        type="tel"
                        name="phone"
                        v-model="prospectData.phone"
                        maxlength="60"
                        required
                />
            </label>
            <label class="m-event-form-consent">
                <input
                        type="checkbox"
                        name="consent"
                        v-model="prospectData.consent"
                        maxlength="60"
                        required
                />
                <p>
                    En cochant cette case, j'accepte que IBF-Equicoaching conserve mes données personnelles remplies
                    ci-dessus pour me recontacter. <a href="/mentions-legales">Mentions légales</a>
                </p>
            </label>
            <p class="m-event-form-error" v-if="errorMsgs">
                {{ errorMsgs }}
            </p>
            <button>
                Je m'inscris !
            </button>
        </form>
        <div v-else-if="isCompleted" class="m-event-form-success">
            <p class="m-event-form-success-msg">
                Merci, Votre pré inscription a bien été prise en compte, je vous contacterai prochainement pour
                confirmer
                votre participation !
            </p>
            <button type="button" @click="resetForm">
                M'inscrire à un autre évènement
            </button>
        </div>
    </div>
</template>
<script>
import {mapStores} from '@nanostores/vue'
import EventSubscription from '../../class/EventSubscription'
import Prospect from '../../class/Prospect'
import {event, prospect, errorMsg, subscribe} from '../../store/event-subscription'

export default {
    name: 'EventForm',
    props: ['dates'],
    setup() {
        return {
            ...mapStores({prospect, event})
        }
    },
    data() {
        return {
            prospectData: {},
            msg: '',
            isCompleted: false,
            selectDate: null,
            subNumber: 1,
            isValidating: false,
        }
    },
    computed: {
        errorMsgs() {
            return this.msg || errorMsg.value
        },
    },
    created() {
        this.selectDate = this.dates[0]
        this.prospectData = this.prospect.value ? this.prospect.value : {}
    },
    methods: {
        async validateForm(e) {
            e.preventDefault()
            this.msg = ''
            prospect.set(new Prospect(this.prospectData.name, this.prospectData.mail, this.prospectData.phone, this.prospectData.consent))
            event.set(new EventSubscription(this.selectDate, this.subNumber))
            this.isValidating = true
            await subscribe().then((value) => this.isCompleted = value)
            this.isValidating = false
        },
        resetForm() {
            this.isCompleted = false
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common/_spaces.scss';
@import '../../styles/common/_colors.scss';

.m-event-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: $space-B;
  padding: $space-B;
  border: solid 0.1rem $color-gray-light;

  form {
    max-width: 80%;
  }

  input, select {
    width: 100%;
    margin: $space-Ae;
    padding: $space-B;
    font-size: 1rem;
    border: solid lightgray 0.1rem;
    border-radius: 0.3rem;
  }

  &-consent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    accent-color: $color-primary;

    input {
      height: 2rem;
      width: 2rem;
      margin: $space-B;
    }

    input:checked {
      background-color: $color-primary;
    }
  }

  &-error {
    margin: $space-Ae;
    color: $color-primary;
    font-weight: 700;
  }

  &-success {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 15rem;
    }

    &-msg {
      margin: $space-Ae;
      color: $color-success;
      font-weight: 700;
    }
  }

  button {
    margin: $space-Ae;
    padding: $space-B;
    font-size: 1rem;
    font-weight: 600;
    background: $color-primary;
    color: $color-white;
    border-radius: 0.3rem;
  }

  button:hover {
    background: $color-white;
    color: $color-primary;
    border: $color-primary;
  }
}
</style>