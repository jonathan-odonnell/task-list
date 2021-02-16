import React, { useEffect, useState, } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PlaceFinder from '../apis/PlaceFinder'

const UpdatePlace = (props) => {
    const { id } = useParams()
    var history = useHistory()
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceLevel, setPriceLevel] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await PlaceFinder.get(`/${id}`)
            console.log(response)
            setName(response.data.data.place.name)
            setLocation(response.data.data.place.location)
            setPriceLevel(response.data.data.place.price_level)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await PlaceFinder.put(`/${id}`, {
            name,
            location,
            price_level: priceLevel
        })
        history.push('/')
    } 

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)}  type="text" className="form-control" id="location" />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="price_level">Location</label>
                    <select value={priceLevel} onChange={e => setPriceLevel(e.target.value)}  className="form-select" id="price_level">
                        <option value="" disabled>Price Level</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdatePlace