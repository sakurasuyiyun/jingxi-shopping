import axios from 'axios'

const instance = axios.create({
	// baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
	// baseURL: 'http://localhost:8000/index.php/',
	baseURL: 'http://1.12.73.162/api',
	// baseURL: 'http://106.13.236.239:81/index.php/',
	timeout: 10000
})

export const get = (url,params = {}) => {
	return new Promise((resolve,reject) => {
		instance.get(url,{ params }).then((response) => {
			resolve(response.data)
		},err => {
			reject(err)
		})
	})
}

export const post = (url,data = {}) => {
	return new Promise((resolve,reject) => {
		instance.post(url,data,{
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			resolve(response.data)
		},err => {
			reject(err)
		})
	})
}

