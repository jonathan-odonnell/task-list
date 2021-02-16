import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlaceFinder from '../apis/PlaceFinder'
import { PlacesContext } from '../contexts/context'
import Reviews from '../components/reviews'
import AddReview from '../components/addReview'
import Rating from '../components/rating'

const Detail = () => {
    const { id } = useParams()
    const { selectedPlace, setSelectedPlace } = useContext(PlacesContext)

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await PlaceFinder.get(`/${id}`)
                setSelectedPlace(response.data.data)
            }
            fetchData()
        } catch (err) {
            console.log(err)
        }
    })
    return (
        <div>{selectedPlace && (
        <>
        <h1 className="text-center display-1">{selectedPlace.place.name}</h1>
        <div className="text-center">
            <Rating rating={selectedPlace.place.average_rating}/>
            <div className="span text-warning ms-1">
                {selectedPlace.place.count ? `(${selectedPlace.place.count})` : "(0)"}
            </div>
        </div>
            <div className="mt-3">
                <div className="row mb-2">
                    <Reviews reviews={selectedPlace.reviews} />
                </div>
                <div className="row mb-2">
                    <AddReview />
                </div>
            </div>
        </>
        )}</div>
    )
}

export default Detail