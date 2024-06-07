import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {travelPackages: [], isLoading: false}

  componentDidMount() {
    this.getTravelPackagesFromApi()
  }

  getTravelPackagesFromApi = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.packages.map(pkgItem => ({
          id: pkgItem.id,
          name: pkgItem.name,
          imageUrl: pkgItem.image_url,
          description: pkgItem.description,
        }))
        this.setState({travelPackages: updatedData, isLoading: false})
      } else {
        console.error('Failed to fetch data')
        this.setState({isLoading: false})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({isLoading: false})
    }
  }

  render() {
    const {isLoading, travelPackages} = this.state

    return (
      <div className="travel-guide-container">
        <h1 className="travel-guide-heading">Travel Guide</h1>
        <div className="countries-container">
          {isLoading && (
            <div className="loader" data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          {!isLoading && (
            <ul className="packages-list">
              {travelPackages.map(pkgItem => (
                <li key={pkgItem.id} className="package-item">
                  <img
                    src={pkgItem.imageUrl}
                    alt={pkgItem.name}
                    className="package-image"
                  />
                  <h1 className="package-name">{pkgItem.name}</h1>
                  <p className="package-description">{pkgItem.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default TravelGuide
