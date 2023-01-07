import axios from 'axios'
import Constants from 'src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const login = async (data) => {
  let response = await axios.post(constants.baseUrl + '/login', data)

  return response
}
