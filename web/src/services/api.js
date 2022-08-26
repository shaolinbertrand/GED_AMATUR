import axios from 'axios'

const api = axios.create({
	//baseURL: 'http://192.168.0.120:3001/api/'
	baseURL: 'http://192.168.100.3:3001/api/'
})

export default api;