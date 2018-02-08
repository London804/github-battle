var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
      	username: ''
    };

    this.handleChange = this.handleChange.bind(this); // this makes sure the this in handleChange is referring to the component
    this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(event) {
    	var value = event.target.value;

    	this.setState(function () {
      		return {
        		username: value
      		}
    	});
 	}

  	handleSubmit(event) {
    	event.preventDefault();

    this.props.onSubmit(
    	this.props.id,
      	this.state.username
    	);
  	}

  	render() {
    	return (
	      	<form className='column' onSubmit={this.handleSubmit}>
	        	<label className='header' htmlFor='username'>{this.props.label}</label>
	        	<input
	          		id='username'
	          		placeholder='github username'
	          		type='text'
	          		value={this.state.username}
	          		autoComplete='off'
	          		onChange={this.handleChange}
	        	/>
	        	<button
	         		className='button'
	          		type='submit'
	          		disabled={!this.state.username}>
	            	Submit
	        	</button>
	      	</form>
    	)
  	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
  	label: PropTypes.string.isRequired,
  	onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  	label: 'Username',
}

class Battle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  playerOneName: '',
		  playerTwoName: '',
		  playerOneImage: null,
		  playerTwoImage: null,
	};

    	this.handleSubmit = this.handleSubmit.bind(this); // this makes sure that the this keyword in handleSubmit is set to the component's this
  	}

  	handleSubmit(id, username) { // id is PlayerOneName or PlayerTWoName
    	this.setState(function () {
      		var newState = {}; 
      		newState[id + 'Name'] = username; // this builds the new object with the playerName
      		newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200' // and Image
      		return newState;
    	});
  	}

  	render() {
    	var playerOneName = this.state.playerOneName;
    	var playerTwoName = this.state.playerTwoName;

    	return (
	      	<div>
	        	<div className='row'>
	          		{!playerOneName && // in this context the && works as an if statement.
	            	<PlayerInput //  If playerOneName doesn't exist it renders playerInput
		             	id='playerOne'
		              	label='Player One' // Label for form
		              	onSubmit={this.handleSubmit}
		            />}

	          		{!playerTwoName &&
	           		<PlayerInput
	              		id='playerTwo'
	              		label='Player Two'
	              		onSubmit={this.handleSubmit}
	            	/>}
	        	</div>
	      	</div>
    	)
  	}
}

module.exports = Battle;