<template>
    <div
            id="event-form"
            class="m-form"
            aria-label="S'inscrire à un évènement"
    >
        <div v-if="isValidating" class="m-form-wait">
            Envoi du formulaire, Veuillez patienter...
        </div>
        <form v-if="!isCompleted && !isValidating" @submit="validateForm">
            <p class="m-form-title">
                Je souhaite m'inscrire :
            </p>
            <div class="m-form-field">
                <label for="date">Date de l'évènement *</label>
                <select name="date"
                        id="date"
                        v-model="selectDate"
                        required
                >
                    <option
                        v-for="event in events"
                        v-bind:value="event._date"
                        :selected="event._date === selectDate"
                    >
                        {{ event._date.toLocaleDateString('fr-FR') }} - {{event._isAfternoon ? '14h/17h' : '9h/12h'}} - {{ event._name }}
                    </option>
                </select>
            </div>
            <div class="m-form-field">
                <label for="nb">Nombre d'inscrits *</label>
                <input
                    name="nombre"
                    id="nb"
                    min="1"
                    max="10"
                    v-model="subNumber"
                    type="number"
                    required
                />
            </div>
            <div class="m-form-field">
                <label for="name">Nom et Prénom du ou des participants *</label>
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
                    ci-dessus pour me recontacter. <a href="/cookies">Gestion des données</a>
                </label>
            </div>
            <p class="m-form-error" v-if="errorMsgs">
                {{ errorMsgs }}
            </p>
            <button>
                Je m'inscris !
            </button>
        </form>
        <div v-else-if="isCompleted" class="m-form-success">
            <p v-if="isSuccess" class="m-form-success-msg">
                Merci, Votre pré inscription a bien été prise en compte, je vous contacterai prochainement pour
                confirmer
                votre participation !
            </p>
            <p else class="m-form-success-msg-error">
              Une erreur s'est produite, merci de rééssayer plus tard ou de me contacter par téléphone au 06.10.83.37.88.
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
    props: {
        events: {
            type: [],
            required: true,
        }
    },
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
            isSuccess: true,
        }
    },
    computed: {
        errorMsgs() {
            return this.msg || errorMsg.value
        },
    },
    created() {
        this.selectDate = this.events[0]._date
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