import axios from 'axios'

const api = axios.create({
	//baseURL: 'http://192.168.0.120:3001/api/'
	//baseURL: 'http://192.168.100.3:3001/api/'
	baseURL: 'http://192.168.10.146:3001/api' //ip cabeado
	//baseURL: 'http://27.78.101.104:3001/api' //ip wifi
})

export default api;