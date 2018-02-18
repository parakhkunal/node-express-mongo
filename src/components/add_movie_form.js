import React, { Component } from "react";

export default class AddMovieForm extends Component {
	render() {
		return (
			<div>
				<form id="addMovie"> 
					<div>
						<label> Google Book ID * :  
						</label>
						<input />
					</div>

					<div>
						<label> Title * :  
						</label>
						<input />
					</div>

					<div>
						<label> Authors * :  
						</label>
						<input />
					</div>

					<div>
						<label> Description :  
						</label>
						<input />
					</div>

					<div>
						<label> Genre :  
						</label>
						<input />
					</div>

					<div>
						<label> Publisher :  
						</label>
						<input />
					</div>

					<div>
						<label> Average Rating :  
						</label>
						<input />
					</div>

					<div>
						<label> Maturity Rating :  
						</label>
						<input />
					</div>

					<div>
						<label> Page Count :  
						</label>
						<input />
					</div>

					<div>
						<label> Links :  
						</label>
						<input />
					</div>

					<div>
						<label> Images :  
						</label>
						<input />
					</div>

					<div>
						<label> Language :  
						</label>
						<input />
					</div>
				</form>
			</div>
		);
	}
}