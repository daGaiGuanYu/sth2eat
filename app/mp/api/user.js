const callCF = require('./common/call-cloud-func')

module.exports = {
  getOpenId: async () => callCF('login')
    .then(res => res.openId)
    .catch(console.error)
}