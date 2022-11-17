import React, { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import useAlert from '@hooks/useAlert';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';


//CustomHook que crea un estado para User, hace el llamado a la API , guarda la info del signIn en el estado y devuelve esa info
function useProviderAuth() {
	const [user, setUser] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const {alert, setAlert, toogleAlert } = useAlert();
	const router = useRouter();

	const signIn = async (email, password) => {
		const options = {
			headers: {
				accept: '*/*',
				'Content-Type':'application/json',
			}
		}

		const url = endPoints.auth.login;

		const { data: { access_token } } = await axios.post(url, {email, password }, options);
		if (access_token){
			Cookie.set('token', access_token, {expires: 1});

			axios.defaults.headers.Authorization = `Bearer ${access_token}`;
			const { data: user } = await axios.get(endPoints.auth.profile);
			console.info('Access Token Created');
			setUser(user);
			Cookie.set('user', user, {expires:1})

		} ;
	};

	const verifyAuthentication = async () => {
		const jwt= Cookie.get('token');
		const savedUser = Cookie.get('user');
		if (jwt){
			console.info('Access Token still valid');
			setUser(savedUser);
		} else {
			router.push('/login');
			console.error("Access denied, please sign in")
		}
	}
	
	const logout = () => {
		Cookie.remove('token');
		setUser(null);
		delete axios.defaults.headers.Authorization;
		window.location.href = '/login';
	};

	return{
		user,
		signIn,
		currentPage,
		setCurrentPage,
		logout,
		verifyAuthentication,
		alert,
		setAlert,
		toogleAlert
	};
}

//creamos un contexto
const AuthContext = createContext();

//Creamos un Provider que va a envolver toada la _app.js y le va a dar acceso a lo que se retorna en useProviderAuth, es decir user y la función signIn.
export function ProviderAuth({children}){
	const auth = useProviderAuth();
	return <AuthContext.Provider value ={auth}>
			{children}
		</AuthContext.Provider>;
}

//Creamos la función que expone el contenido del contexto
export const useAuth = () => {
	return useContext(AuthContext);
};