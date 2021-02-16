import React from 'react'
import Header from '../components/header'
import AddPlace from '../components/addPlace'
import PlacesTable from '../components/places'

const Home = () => {
    return(
        <div>
            <Header/>
            <AddPlace/>
            <PlacesTable/>
        </div>
    )
}

export default Home