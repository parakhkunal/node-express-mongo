import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import TextBox from './components/text_box';
import SearchForm from './components/search_form';
import AddMovieForm from './components/add_movie_form';


const App = () => {
	return (
		<div> 
			<SearchForm />
		</div>
		);
}

const Papp = () => {
	return (
		<div>
			<AddMovieForm />
		</div>	
		)
}

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<Papp />, document.getElementById("addForm"));
