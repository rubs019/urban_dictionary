<template>
  <div class="columns">
	<div class="column is-6 is-offset-3">
	  <VFormSignUp @tryRegister="register"
				   :message="form.message"
				   :color="form.color"
				   :status="form.status"></VFormSignUp>
	</div>
  </div>
</template>

<script lang="ts">
    import Vue from 'Vue'
    import Component from 'vue-class-component'
    import VFormSignUp from "../components/VFormSignUp.vue"
    import DTO from "../services/dto/dto"
    import Logger from "../helpers/logger"
    import Store from "../store"
    import { API_PATH } from "@/constants"
    import { passwordIsGreaterThan6 } from '@/helpers/checkPasswordHelper'
    import { checkPassword } from '@/helpers/checkPasswordHelper'
    import { RawUserCredential, UserCredential } from '@/services/dto/dto.d'
    import { Form, STATUS } from "@/definitions.d"
    import { TranslateResult } from "vue-i18n"
    import { APIRequest } from "@/services/request/request"

    @Component({
        name: "AppSignUp",
        components: {
            VFormSignUp
        },
        data: function () {
            return {}
        }
    })
    export default class AppSignUp extends Vue {
        form: Form = {}

        /**
         * Set the message of notification
         *
         * @param message {string} The new message to show
         * @param isError {boolean} Use to update color of form
         * @return {boolean}
         */
        setMsgNotification(message: TranslateResult, isError = true) {
            this.form.color = isError ? 'danger' : 'success'
            this.form.message = message
        }

        validationInput(userCredential: RawUserCredential) {
            if (!passwordIsGreaterThan6(userCredential.pwd)) {
                this.setMsgNotification(this.$t('notif.PWD_TOO_SHORT'), true)
                return false
            }
            if (!checkPassword(userCredential.pwd, userCredential.pwd2)) {
                this.setMsgNotification(this.$t('notif.NOT_SAME_PWD'), true)
                return false
            }
            return true
        }

        async register(credentials: RawUserCredential) {

            // Use to show loader
            this.form.status = STATUS.PENDING

            if (!this.validationInput(credentials)) {
                this.form.status = STATUS.ERROR
                return
            }

            try {
                const credential: UserCredential | undefined = DTO.accountCreate(credentials)

                if (!credential) {
                    Logger('Error credentials')
                    return
                }

                const result = await new APIRequest().Post(API_PATH.CREATE_USER, credential)

                Store.setConnected(true)
                Store.setUser(result.data)

                this.setMsgNotification(this.$t('notif.SUCCESS'), false)
                const that = this
                setTimeout(() => {
                    that.$router.push("/login")
                }, 1500)
            } catch (e) {
                this.form.status = STATUS.ERROR
                Logger('error', e)
                const that = this
                setTimeout(() => {
                    if (!e || !e.response || !e.response.data) {
                        that.setMsgNotification(this.$t('notif.ERROR_SERVER'), true)
                        return
                    }
                    if (e.response.data.status === 422) {
                        that.setMsgNotification(this.$t('notif.USER_ALREADY_EXIST'), true)
                        return
                    }

                    if (e.response.data.statusCode === 409) {
                        that.setMsgNotification(this.$t('notif.EMAIL_ALREADY_EXIST'), true)
                    }
                }, 1500)
            }

        }
    }
</script>

<style scoped>
  .tile {
	margin-top: 10%;
  }
</style>
