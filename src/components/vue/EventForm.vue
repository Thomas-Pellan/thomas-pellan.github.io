<template>
    <div
            class="m-event-form"
            aria-label="S'inscrire à un évènement"
    >
        <div v-if="isFinished">
            Il n'est plus possible de s'inscrire pour cet évènement.
        </div>
        <form v-else-if="!isCompleted">
            <p>
                Je souhaite m'inscrire à cet évènement :
            </p>
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
export default {
    name: 'EventForm',
    props: {
        date: {
            type: Date,
            required: true,
        }
    },
    computed: {
        isFinished() {
            //@todo : use moment for dates
            return new Date(this.date) > new Date() - 1
        }
    },
    data() {
        return {
            prospect: {
                name: null,
                phone: null,
                mail: null,
                consent: false,
            },
            msg: '',
            isCompleted: false,
            isValidationForm: false,
        }
    },
    created() {
        console.log(this.$route)
    },
    methods: {
        validateForm() {
            this.msg = ''
            if (!this.prospect.name || !this.prospect.phone || !this.prospect.mail || !this.prospect.consent) {
                this.msg = 'Un champ du fomulaire n\'a pas été rempli, merci d\'entrer vos coordonnées et de cocher la case de consentement.'
                return
            }
            this.isCompleted = true
        },
    }
}
</script>
<style lang="scss">
@import '../../styles/common/_spaces.scss';
@import '../../styles/common/_colors.scss';

.m-event-form {
  width: inherit;
  margin: $space-B;
  padding: $space-B;
  border: solid 0.1rem $color-gray-light;

  form {
    width: 90%;
  }

  input {
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