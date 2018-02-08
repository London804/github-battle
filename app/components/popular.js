var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage (props) { // whenever you use props you should use propTypes
	var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className='languages'>
			{languages.map(function (lang) {
				return (
					<li 
						style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
						onClick={props.onSelect.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}


SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

function RepoGrid (props) {
	console.log(props.repos);
	return (
	<ul className='popular-list'>
	{props.repos.map(function( repo, index) {
		return (
			<li key={repo.name} className='popular-item'>
				<div className='popular-rank'>#{index + 1}</div>
				<ul className='space-list-items'>
					<li>
						<img
							className='avatar'
							src={repo.owner.avatar_url}
							alt={'Avatar for ' + repo.owner.login} />
					</li>
					<li><a href={repo.html_url}>{repo.name}</a></li>
					<li>@{repo.owner.login}</li>
					<li>{repo.stargazers_count} stars </li>
				</ul>
			</li>
		)
	})}
	
	</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}
// state
// lifecycle events
// ui

class Popular extends React.Component {
	constructor (props) { 
		super(props);
		this.state = { // this sets the state to all by default
			selectedLanguage: 'All',
			repos: null // I'm not sure why this is necessary
		};
	
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		// AJAX
		this.updateLanguage(this.state.selectedLanguage);


	}

	updateLanguage(lang) {
		this.setState(function () { 
			return {
				selectedLanguage: lang
			}
		});

		api.fetchPopularRepos(lang)
			.then((repos) => {
				this.setState( () => {
					return {
						repos: repos
					}
				})
			});
	} 
	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} />
					{!this.state.repos // this waits until the request returns the repos
						? <p>LOADING</p>
						: <RepoGrid repos={this.state.repos} />
					}

			</div>
		)
	}
}

module.exports = Popular;