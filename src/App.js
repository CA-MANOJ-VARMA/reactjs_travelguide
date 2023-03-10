import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

// Replace your code here
const statusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

class App extends Component {
  state = {isLoading: statusConstants.initial, packagesData: []}

  componentDidMount() {
    this.fetchFunction()
  }

  fetchFunction = async () => {
    this.setState({isLoading: statusConstants.progress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      console.log(jsonData.packages)
      this.setState({
        isLoading: statusConstants.success,
        packagesData: jsonData.packages,
      })
    }
  }

  loaderFunction = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {packagesData} = this.state

    return (
      <ul className="css-ul-container">
        {packagesData.map(eachItem => (
          <li key={eachItem.id}>
            <div className="css-card-container">
              <img src={eachItem.image_url} alt={eachItem.name} />
              <h1>{eachItem.name}</h1>
              <p>{eachItem.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  displayResultsFunction = () => {
    const {isLoading, packagesData} = this.state
    console.log(isLoading)

    switch (isLoading) {
      case statusConstants.progress:
        return this.loaderFunction()
      case statusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="css-bg-container">
        <h1>Travel Guide</h1>
        {this.displayResultsFunction()}
      </div>
    )
  }
}

export default App
