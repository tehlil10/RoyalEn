const EolTable = ({ data, stage }) => {

    return (
        <table className="table table-dark table-bordered mt-3">

            <thead>
            <tr>
                <th>Mac Address</th>
                <th>Pressure</th>
                <th>Temperature</th>
                <th>Battery</th>
                <th>Status</th>
                <th>Tested By</th>
            </tr>
            </thead>

            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {/*MAC ADDRESS*/}
                    <td>{item.macAddress}</td>
                    {/* PRESSURE */}
                    <td>
                        {stage === "ALL" ? (
                            <div className="d-flex justify-content-between">
                                <div className="text-center">
                                    <small className="text-secondary d-block">Stage 1</small>
                                    <span>{item.pressure}</span>
                                </div>

                                <div className="text-center">
                                    <small className="text-secondary d-block">Stage 2</small>
                                    <span>{item.pressure2}</span>
                                </div>
                            </div>
                        ) : stage === "Stage 1" ? (item.pressure) : (item.pressure2)}
                    </td>

                    {/* TEMPERATURE */}
                    <td>
                        {stage === "ALL" ? (
                            <div className="d-flex justify-content-between">
                                <div className="text-center">
                                    <small className="text-secondary d-block">Stage 1</small>
                                    <span>{item.temperature}</span>
                                </div>

                                <div className="text-center">
                                    <small className="text-secondary d-block">Stage 2</small>
                                    <span>{item.temperature2}</span>
                                </div>
                            </div>
                        ) : stage === "Stage 1" ? (item.temperature) : (item.temperature2)}
                    </td>

                    {/* BATTERY */}
                    <td>
                        {stage === "ALL" ? (
                            <div className="d-flex justify-content-between">
                                <div className="text-center">
                                    <small className="text-secondary d-block">Stage 1</small>
                                    <span>{item.battery}</span>
                                </div>

                                <div className="text-center">
                                    <small className="text-secondary d-block">Stage 2</small>
                                    <span>{item.battery2}</span>
                                </div>
                            </div>
                        ) : stage === "Stage 1" ? (item.battery) : (item.battery2)}
                    </td>

                    {/* STATUS COLUMN */}
                    <td>
                        <div className="d-flex justify-content-between">

                            <div>
                                <small className="text-secondary d-block">Before</small>
                                <span
                                    className={item.beforeAssembly ? "text-success" : "text-danger"}>{item.beforeAssembly ? "OK" : "NOT OK"}</span>
                            </div>
                            <div>
                                <small className="text-secondary d-block">After</small>
                                <span
                                    className={item.afterAssembly ? "text-success" : "text-danger"}>{item.afterAssembly ? "OK" : "NOT OK"}</span>
                            </div>

                        </div>
                    </td>

                    {/* TESTED BY */}
                    <td>{item.oemStage}</td>
                </tr>
            ))}
            </tbody>

        </table>
    )
}

export default EolTable;