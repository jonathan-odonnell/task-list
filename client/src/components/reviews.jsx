import React from "react";
import Rating from '../components/rating'

const Reviews = ({ reviews }) => {
    return (
        reviews.map((review) => {
            return (
                <div key={review.id} className="col col-sm-6 col-lg-4">
                    <div className="card text-white bg-primary mb-3 mx-auto" style={{ maxWidth: "20rem" }}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span><Rating rating={review.rating} /></span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                {review.review}
                            </p>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default Reviews