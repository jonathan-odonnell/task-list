import React, { useContext, useState } from 'react'
import PlaceFinder from '../apis/PlaceFinder'
import { PlacesContext } from '../contexts/context'

const AddPlace = () => {
    const { addPlace } = useContext(PlacesContext) 
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceLevel, setPriceLevel] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await PlaceFinder.post('/', {
                name,
                location,
                price_level: priceLevel
            })
            addPlace(response.data.data.place)
        } catch (err) {

        }
    }
    return (
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder="name" />
                    </div>
                    <div className="col">
                        <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" type="text" placeholder="location" />
                    </div>
                    <div className="col">
                        <select value={priceLevel} onChange={(e) => setPriceLevel(e.target.value)} className="form-select mr-sm-2">
                            <option value="" disabled>Price Level</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPlace