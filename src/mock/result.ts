export default {
  success(data) {
    return {
      code: 1,
      message: '',
      data
    }
  },

  error (message) {
    return {
      code: 2,
      data: {},
      message,
    }
  },
}