/*
    Toast Helpers
    Use to display Toast depends the component
 */
/**
 * Display success component
 * @param { String } viewComponent - The current component were the func was called
 * @param { String } message - Message to display
 */
export const successToast = (viewComponent, message) => {
    viewComponent.$toast.open({
        message: message,
        type: 'is-success'
    });
};
export const errorToast = (viewComponent, message) => {
    viewComponent.$toast.open({
        message,
        type: 'is-danger',
        duration: 4000
    });
};
//# sourceMappingURL=toast.js.map