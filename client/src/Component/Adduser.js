import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Adduser(){
	const navigate = useNavigate();
	
	const [user, setUser] = useState({name: '', email: '', phone: '', sex: 'male'});
	
	const id = useParams(); 
	
	let reqmethod, url;
	if(id['*']){
		reqmethod = 'PUT';
		url = '/add/' + id['*'];
	}else{
		reqmethod = 'POST';
		url = '/add';
	}
	
	const fetchUsers = async ()=>{
		try{
			const res = await fetch('/getusers');
			const response = await res.json();
			const field = response.find(item => item._id === id['*']);
			
			if(field){
				setUser({name: field.name, email: field.email, phone: field.phone, sex: field.sex});
				
			}else{
				navigate('/add');
			}
			
		}catch(error){
			console.error(error);
		}
	}
	
	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line
	}, []);

	let name,value;
	const handleInputs = (e)=>{
		name = e.target.name;
		value = e.target.value;
		setUser({...user, [name]:value});
	}
	
	const PostData = async (e)=>{
		e.preventDefault();
		const {name, email, phone, sex} = user;
		
		const res = await fetch(url, {
			method: reqmethod,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name, email, phone, sex})
		});
		
		const data = await res.json();
		
		if(data.error){
			window.alert(data.error);
		}else{
			window.alert(data.message);
			navigate('/');
		}
	}
	
	return(
		<>
		<div className="container p-5">
			<div className="px-5">
			<form method="post">
				<input type="text" className="form-control mb-4" id="name" name="name" value={user.name} onChange={handleInputs} placeholder="Name"/>
				<input type="email" className="form-control mb-4" id="email" name="email" value={user.email} onChange={handleInputs} placeholder="Email"/>
				<input type="number" className="form-control mb-4" id="phone" name="phone" value={user.phone} onChange={handleInputs} placeholder="Phone"/>
				<div className="form-check">
					<input className="form-check-input" type="radio" name="sex" id="male" value="male" onChange={handleInputs} checked={user.sex === "male"}/>
					<label className="form-check-label" htmlFor="male">Male</label>
				</div>
				<div className="form-check mb-4">
					<input className="form-check-input" type="radio" name="sex"  value="female" onChange={handleInputs} checked={user.sex === "female"} id="female"/>
					<label className="form-check-label" htmlFor="female">Female</label>
				</div>
				<input type="submit" className="btn btn-primary" name="add" id="add" onClick={PostData} value="Add"/>
			</form>
			</div>
		</div>
		</>
	);
}