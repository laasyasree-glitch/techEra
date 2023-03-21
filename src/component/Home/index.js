import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    list: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTechies()
  }

  getTechies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({list: updatedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTechies = () => {
    const {list} = this.state
    return (
      <ul>
        {list.map(each => (
          <li key={each.id}>
            <Link to={`/courses/${each.id}`}>
              <p>{each.name}</p>
              <img src={each.logoUrl} alt={each.name} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getTechies()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrongs</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderFunctionality = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTechies()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </Link>

        {this.renderFunctionality()}
      </div>
    )
  }
}

export default Home
