exports.successToast = (ctx, message) => {
	ctx.$toast.open({
		message: message,
		type: 'is-success'
	})
}

exports.errorToast = (ctx, message) => {
	ctx.$toast.open({
		message,
		type: 'is-danger',
		duration: 4000
	})
}
