import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

//CustomHook que crea un estado para User, hace el llamado a la API , guarda la info del signIn en el estado y devuelve esa info
function useProviderAuth() {
	const [user, setUser] = useState(null);

	const signIn = async (email, password) => {
		const options = {
			headers: {
				accept: '*/*',
				'Content-Type':'application/json',
			}
		}

		const url = endPoints.auth.login;

		const { data: access_token } = await axios.post(url, {email, password }, options);
		console.log(access_token);
	};

	return{
		user,
		signIn,
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