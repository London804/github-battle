var React = require('react');
var NavLink = require('react-router-dom').NavLink; // changes the style of the active link vs just regular link

function Nav (argument) {
	return (	
		<ul className="nav">
			<li>
				<NavLink exact activeClassName='active' to='/'>
				Home
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/battle'>
				Battle
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/popular'>
				Popular
				</NavLink>
			</li>

		</ul>
	)
}

module.exports = Nav;