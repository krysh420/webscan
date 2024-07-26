import React from 'react'

const Loading = () => {
    return (
        <>
        <h2>Results</h2>
            <button className="btn btn-primary" type="button" disabled style={{width:"120px"}}>
                <div className="d-flex align-items-center justify-content-between">
                <div className="spinner-grow spinner-grow-sm" aria-hidden="true"></div>
                <div role="status">Loading...</div>
                </div>
            </button>
        </>
    )
}

export default Loading