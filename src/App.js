import React, {useState} from 'react';
import jwt_decode from 'jwt-decode';
import Routing from './Routing';
import Api from './Api';


function App() {

	const [user, setUser] = useState(localStorage.token &&
							jwt_decode(localStorage.getItem("token")).user);
	const [company, setCompany] = useState(localStorage.getItem("company"));

	const handleLogin = (token) => {
		localStorage.setItem("token", token);
		setUser(jwt_decode(token).user);
		Api.token = token;
	};

	return (
		<div className="App">
			<Routing user={user}
					company={company} />
		</div>
	);
};

export default App;
