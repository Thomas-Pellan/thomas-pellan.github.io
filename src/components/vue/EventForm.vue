<template>
    <div
            class="m-event-form"
            aria-label="S'inscrire à un évènement"
    >
        <form v-if="!isCompleted">
            <p>
                Je souhaite m'inscrire :
            </p>
            <label>Date de l'évènement *
                <select name="date" v-model="selectDate">
                    <option v-for="date in eventDates">
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
                />
            </label>
            <label>Nom et Prénom *
                <input
                        name="name"
                        v-model="prospect.name"
                        maxlength="50"
                />
            </label>
            <label>Adresse Email *
                <input
                        type="email"
                        name="mail"
                        v-model="prospect.mail"
                        maxlength="60"
                />
            </label>
            <label>Téléphone *
                <input
                        type="tel"
                        name="phone"
                        v-model="prospect.phone"
                        maxlength="60"
                />
            </label>
            <label class="m-event-form-consent">
                <input
                        type="checkbox"
                        name="consent"
                        v-model="prospect.consent"
                        maxlength="60"
                />
                <p>
                    En cochant cette case, j'accepte que IBF-Equicoaching conserve mes données personnelles remplies
                    ci-dessus pour me recontacter. <a href="/mentions-legales">Mentions légales</a>
                </p>
            </label>
            <p class="m-event-form-msg" v-if="msg">
                {{ msg }}
            </p>
            <button
                    type="button"
                    v-on:click="validateForm"
            >
                Je m'inscris !
            </button>
        </form>
        <p v-else>
            Merci, Votre pré inscription a bien été prise en compte, je vous contacterai prochainement pour confirmer
            votre participation !
        </p>
    </div>
</template>
<script>
import EventSubscription from '../../class/EventSubscription'
import Prospect from '../../class/Prospect'
import {isSendingSubscription, prospect} from '../../store/event-subscription'
import {useStore} from '@nanostores/vue'

export default {
    name: 'EventForm',
    props: {
        dates: {
            type: [],
            required: true,
        }
    },
    data() {
        return {
            prospect: {},
            msg: '',
            isCompleted: false,
            isValidationForm: false,
            eventDates: [],
            selectDate: null,
            subNumber: 1,
        }
    },
    created() {
        this.filterDates()
        this.selectDate = this.eventDates[0]
        const test = useStore(isSendingSubscription);
        const test2 = useStore(prospect);
        console.log('test')
        console.log(test)
        console.log('test2')
        console.log(test2)
    },
    methods: {
        validateForm() {
            this.msg = ''
            if (!this.selectDate) {
                this.msg = 'Merci de renseigner une date d\'évènement qui vous intéresse.'
                return
            }
            const prospect = new Prospect(this.prospect.name, this.prospect.mail, this.prospect.phone, this.prospect.consent)
            if (prospect.isInvalid()) {
                this.msg = 'Un champ du fomulaire n\'a pas été rempli, merci d\'entrer vos coordonnées et de cocher la case de consentement.'
                return
            }
            const eventData = new EventSubscription(this.selectDate, this.subNumber)
            this.isCompleted = true
        },
        filterDates() {
            const currentDate = new Date()
            this.dates.forEach((date) => {
                if (date > currentDate) {
                    this.eventDates.push(date)
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common/_spaces.scss';
@import '../../styles/common/_colors.scss';

.m-event-form {
  max-width: 80%;
  margin: $space-B;
  padding: $space-B;
  border: solid 0.1rem $color-gray-light;

  form {
    width: 90%;
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

  &-msg {
    margin: $space-Ae;
    color: $color-primary;
    font-weight: 700;
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
    borde: $color-primary;
  }
}
</style>