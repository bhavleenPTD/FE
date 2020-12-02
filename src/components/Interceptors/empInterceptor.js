import Axios from 'axios';

Axios.interceptors.request.use(async (config) => {
	if (localStorage.getItem('userToken')) {
		config.headers.empauthorization =
			'Bearer ' + localStorage.getItem('userToken');
	}
	return config;
});

export const EmpHTTP = Axios;
