import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import Api from './Api';
import Home from './Home';


function App() {

	const [user, setUser] = useState(localStorage.token &&
							jwt_decode(localStorage.getItem("token")).cashCountUser);
	const [company, setCompany] = useState(JSON.parse(localStorage.getItem("cashCountCompany")));

	const handleLogin = (token) => {
		localStorage.setItem("token", token);
		setUser(jwt_decode(token).cashCountUser);
		Api.token = token;
	};

	const handleCompany = (company) => {
		localStorage.setItem("cashCountCompany", JSON.stringify(company));
		setCompany(company);
	};

	return (
		<Container>
			<div className="App">
				<Home user={user}
						company={company}
						handleLogin={handleLogin}
						handleCompany={handleCompany} />
			</div>
		</Container>
	);
};

export default App;
