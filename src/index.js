import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Loader from './Loader'

class App extends React.Component {
	// first they execute constructor
	// constructor(props) {
	// 	// we have to write super(props) because it overrides the constructor methon of the base class ( React.Component)
	// 	// also allowes the constructor to be called from react.component
	// 	super(props)

	// 	// initialise state
	// 	// this is the only time we do direct assignment usinf this.state
	// 	this.state = { lat: null, errorMessage: '' }
	// }
	state = { lat: null, errorMessage: '' }
	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ lat: position.coords.latitude }),
			(err) => this.setState({ errorMessage: err.message }),
		)
	}

	// componentDidUpdate() {
	// 	console.log('Did update')
	// }

	renderContent() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>
		}

		if (!this.state.errorMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />
		}

		return <Loader message="Please allow permission to use location for the result." />
	}

	// react says we have to define render
	render() {
		return <div className="border red">{this.renderContent()}</div>
	}
}

ReactDOM.render(<App />, document.querySelector('#root'))
