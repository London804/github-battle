var React = require('react');

class Popular extends React.Component {
	// when calling constructor you should always pass props and call super passing props
	constructor (props) { 
		super(props);
		this.state = { // this sets the state to all by default
			selectedlanguage: 'All'
		};

		// this line makes sure that the function updateLanguage is referencing the component (this references the component)
		this.updateLanguage = this.updateLanguage.bind(this);
	}


	updateLanguage(lang) {
		this.setState(function () { 
			return {
				selectedlanguage: lang
			}
		})
	} 
	render() {
		var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
		console.log('update language',this);
		return (
			<ul className='languages'>
				{languages.map(function (lang) {
					console.log('languages', this); // this is undefined because the function creates a new "this" context
					return (
						<li 
							style={lang === this.state.selectedlanguage ? {color: '#d0021b'} : null}
							onClick={this.updateLanguage.bind(null, lang)}
							key={lang}>
							{lang}
						</li>
					)
				}, this)}
			</ul>
		)
	}
}

module.exports = Popular;