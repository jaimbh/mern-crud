import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Adduser from './Component/Adduser';
import Errorpage from './Component/Errorpage';

export default function App(){
	return(
		<>
		<Navbar/>
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/add/*" element={<Adduser />} />
			<Route path="*" element={<Errorpage />} />
		</Routes>
		</>
	);
}