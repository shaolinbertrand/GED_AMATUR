import axios from 'axios'

const api = axios.create({
	//baseURL: 'http://192.168.0.120:3001/api/'
	//baseURL: 'http://localhost:3001/api'
	//baseURL: 'http://192.168.10.146:3001/api/'
	//baseURL: 'http://192.168.10.119:3001/api/'
	baseURL: 'https://api-pix.bb.com.br/pix/v2/pix'
})

export default api;