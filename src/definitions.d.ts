import { TranslateResult } from "vue-i18n"

export interface Form {
    "message"?: TranslateResult,
    "color"?: string,
    "status"?: number
}

/**
 * Form status
 * @type {{SUCCESS: number, ERROR: number, PENDING: number, DEFAULT: number}}
 */
export enum STATUS {
    DEFAULT = 0,
    PENDING = 1,
    ERROR = 2,
    SUCCESS = 3
}
