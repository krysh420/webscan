
const todo = () => {
    return (
        <>
            <div className="row mt-2 mb-5 row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card border-primary h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-wrap"><div className="card text-bg-primary mb-3" style={{width:"11rem"}}>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h5 className="card-title ">Todo Title</h5>
                                </div>
                            </div>
                            <div className="card border-primary mb-3" style={{width:"11rem",color:"#0d6efd"}}>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h5 className="card-title text-center">Todo Description</h5>
                                </div>
                            </div>
                            </div>

                            <div className="d-flex flex-column">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="submit" className="btn btn-primary mt-2">Delete</button>
                            </div>
                        </div>
                        <div className="card-footer" style={{borderTop:"1px solid #0d6efd"}}>
                            <small className="text-body-primary">To be finished by Todo Deadline</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default todo