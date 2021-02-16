import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PlaceFinder from '../apis/PlaceFinder'
import { PlacesContext } from '../contexts/context'
import Rating from './rating';

const PlacesTable = (props) => {
    const { places, setPlaces } = useContext(PlacesContext);
    var history = useHistory()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PlaceFinder.get('/');
                setPlaces(response.data.data.places)
            } catch (err) { 
                console.log(err)
            }
        };
        fetchData()
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            await  PlaceFinder.delete(`/${id}`)
            setPlaces(places.filter(place => {
                return place.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        history.push(`places/${id}/update`)
    }

    const handlePlaceSelect = (id) => {
        history.push(`/places/${id}`);
      };

    const renderRating = (place) => {
        if (!place.count) {
            return (
                <>
                <span className="text-warning">0 reviews</span>
                </>
            )
        }
        return (
            <>
            <Rating rating={place.average_rating}/>
            <span className="text-warning ms-1">({place.count})</span>
            </>
        )
    }

    return (
        <div className="list-group">
            <table className="table table-hover">
                <thead className="bg-primary">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-dark">
                    {places && places.map(place => {
                        return (
                            <tr onClick={() => handlePlaceSelect(place.id)} key={place.id}>
                                <td>{place.name}</td>
                                <td>{place.location}</td>
                                <td>{"$".repeat(place.price_level)}</td>
                                <td>{renderRating(place)}</td>
                                <td><div onClick={(e) => handleUpdate(e, place.id)} className="btn btn-sm btn-warning">Edit</div></td>
                                <td><div onClick={(e) => handleDelete(e, place.id)} className="btn btn-sm btn-danger">Delete</div></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PlacesTable