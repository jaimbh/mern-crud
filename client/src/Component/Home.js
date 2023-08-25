import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Home(){
	
	const [users, setUsers] = useState([]);

	const fetchUsers = async ()=>{
		try{
			const res = await fetch('/getusers');
			const data = await res.json();
			setUsers(data);
			
		}catch(error){
			console.error(error);
		}
	}
	
	useEffect(() => {
		fetchUsers();
	}, []);

	const deleteUser = async (userId) => {
		try {
			const res = await fetch(`/deleteuser/${userId}`, {
				method: 'DELETE',
			});
			
			const data = await res.json();

			if(data.error){
				window.alert('Failed to delete user');
				
			}else{
				window.alert(data.message);
				fetchUsers();
			}
			
		} catch (error) {
		console.error(error);
		}
	};
  
	return(
		<>
		<div className="container p-5">
		<center><h3>Users</h3></center><hr/>
		<div className="px-5">
			<table className="table">
				<thead>
					<tr>
						<th>User</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Sex</th>
						<th colSpan="2">Options</th>
					</tr>
				</thead>
				<tbody>
				
				{users.map((user) => (
				    <tr key={user._id}>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.phone}</td>
						<td>{user.sex}</td>
						<td>
							<Link to={`/add/${user._id}`} state={user}>
								<input type="button" className="btn btn-primary mx-2" value="Edit" />
							</Link>
							<input type="button" className="btn btn-primary" value="Delete" onClick={() => deleteUser(user._id)}/>
						</td>
					</tr>
				))}
					
				</tbody>
			</table>
		</div>
		</div>
		</>
	);
}