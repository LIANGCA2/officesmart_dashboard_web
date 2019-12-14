import { kebabCaseToCamelCase } from '../utils/StringUtil'

const files = require.context('.', false, /\.js$/)
const api = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  api[kebabCaseToCamelCase(key.replace(/(\.\/|\.js)/g, ''))] = files(key)
})

export default api
