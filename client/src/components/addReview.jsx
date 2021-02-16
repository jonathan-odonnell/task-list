import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PlaceFinder from "../apis/PlaceFinder";

const AddReview = () => {
    const { id } = useParams()
    const location = useLocation()
    const history = useHistory()
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await PlaceFinder.post(`/${id}/add-review`, {
                name,
                rating,
                review
            })
            console.log(response)
            history.push('/')
            history.push(location.pathname)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="col mb-3">
            <form>
                <div className="row mb-3">
                    <div className="col-8">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="name" />
                    </div>
                    <div className="col-4">
                        <label className="form-label" htmlFor="rating">Rating</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select" id="rating">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                    <label className="form-label" htmlFor="review"></label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-control" id="review" rows="5"></textarea>
                    </div>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview