import React, {useState} from 'react';
import jwt_decode from 'jwt-decode';
import Api from './Api';
import Home from './Home';


function App() {

	const [user, setUser] = useState(localStorage.token &&
							jwt_decode(localStorage.getItem("token")).cashCountUser);
	const [company, setCompany] = useState(localStorage.getItem("cashCountCompany"));

	const handleLogin = (token) => {
		localStorage.setItem("token", token);
		setUser(jwt_decode(token).cashCountUser);
		Api.token = token;
	};

	return (
		<div className="App">
			<Home user={user}
					company={company}
					handleLogin={handleLogin} />
		</div>
	);
};

export default App;
