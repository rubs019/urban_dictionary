import VFormSignUp from "../components/VFormSignUp.vue";
import { Post } from "@/services/request/api.service";
import DTO from "../services/dto/dto";
import Logger from "../helpers/logger";
import Store from "../store";
import { API_PATH, STATUS } from "@/constants";
import { passwordIsGreaterThan6 } from '@/helpers/checkPasswordHelper';
import { checkPassword } from '@/helpers/checkPasswordHelper';
export default {
    name: "AppSignUp",
    components: {
        VFormSignUp
    },
    data: () => ({
        form: {
            message: null,
            color: null,
            status: null
        }
    }),
    methods: {
        async register(credentials) {
            // Use to show loader
            this.form.status = STATUS.PENDING;
            if (!this.validationInput(credentials)) {
                this.form.status = STATUS.ERROR;
                return;
            }
            try {
                const credential = DTO.accountCreate(credentials);
                if (!credential) {
                    Logger('Error credentials');
                    return;
                }
                const result = await Post(API_PATH.CREATE_USER, credential);
                Store.setConnected(true);
                Store.setUser(result.data);
                this.setMsgNotification(this.$t('notif.SUCCESS'), false);
                const that = this;
                setTimeout(() => {
                    that.$router.push("/login");
                }, 1500);
            }
            catch (e) {
                this.form.status = STATUS.ERROR;
                Logger('error', e);
                const that = this;
                setTimeout(() => {
                    if (!e || !e.response || !e.response.data) {
                        that.setMsgNotification(this.$t('notif.ERROR_SERVER'), true);
                        return;
                    }
                    if (e.response.data.status === 422) {
                        that.setMsgNotification(this.$t('notif.USER_ALREADY_EXIST'), true);
                        return;
                    }
                    if (e.response.data.statusCode === 409) {
                        that.setMsgNotification(this.$t('notif.EMAIL_ALREADY_EXIST'), true);
                    }
                }, 1500);
            }
        },
        /**
         * Set the message of notification
         *
         * @param message {string} The new message to show
         * @param isError {boolean} Use to update color of form
         * @return {boolean}
         */
        setMsgNotification(message, isError = true) {
            this.form.color = isError ? 'danger' : 'success';
            this.form.message = message;
        },
        validationInput(credentials) {
            if (!passwordIsGreaterThan6(credentials.pwd)) {
                this.setMsgNotification(this.$t('notif.PWD_TOO_SHORT'), true);
                return false;
            }
            if (!checkPassword(credentials.pwd, credentials.pwd2)) {
                this.setMsgNotification(this.$t('notif.NOT_SAME_PWD'), true);
                return false;
            }
            return true;
        }
    }
};
//# sourceMappingURL=AppSignUp.vue.js.map