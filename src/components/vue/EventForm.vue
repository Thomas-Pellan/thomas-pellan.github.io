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
            <div class="m-event-form-field">
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
                        {{ event._date.toLocaleDateString('fr-FR') }} - {{ event._name }}
                    </option>
                </select>
            </div>
            <div class="m-event-form-field">
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
            <div class="m-event-form-field">
                <label for="name">Nom et Prénom *</label>
                <input
                    name="name"
                    id="name"
                    v-model="prospectData.name"
                    maxlength="50"
                    required
                />
            </div>
            <div class="m-event-form-field">
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
            <div class="m-event-form-field">
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
            <div class="m-event-form-consent">
                <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    v-model="prospectData.consent"
                    maxlength="60"
                    required
                />
                <label for="consent">
                    En cochant cette case, j'accepte que IBF-Equicoaching conserve mes données personnelles remplies
                    ci-dessus pour me recontacter. <a href="/mentions-legales">Mentions légales</a>
                </label>
            </div>
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