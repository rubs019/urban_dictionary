import { Vue } from "vue/types/vue"

/*
	Toast Helpers
	Use to display Toast depends the component
 */

/**
 * Display success component
 * @param { String } viewComponent - The current component were the func was called
 * @param { String } message - Message to display
 */
export const successToast = (viewComponent: Vue, message: string): void => {
	viewComponent.$toast.open({
		message: message,
		type: 'is-success'
	})
}

export const errorToast = (viewComponent: Vue, message: string): void => {
	viewComponent.$toast.open({
		message,
		type: 'is-danger',
		duration: 4000
	})
}
