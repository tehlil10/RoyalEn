import axios from 'axios';
import {useState} from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EolTable from "../components/EolTable";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import {toast} from "react-toastify";


export default function EolTpms() {
    const [stage, setStage] = useState("ALL");
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);




    const handleGetData = async () => {
        if (!startDate || !endDate) {
            toast.warning("Please select start and end date");
            return;
        }
        try {
            setLoading(true);
            setHasFetched(true);
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/api/getEOLData`, {
                headers: {
                    token: token},
                    params: {
                        stage,
                        startDate: startDate ? startDate.toDate().toISOString() : "",
                        endDate: endDate ? endDate.toDate().toISOString() : ""
                    }
                }
            );
            console.log("Start:", startDate);
            console.log("End:", endDate);

            setData(res.data.data);

        } catch (err) {
            toast.error("Data not found ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="content-area">
                <Navbar />
                <div className="main-content">

                    {/*HEADER*/}
                    <h2 className="text-white mb-4"> EOL TPMS DATA</h2>

                    {/* DROPDOWN */}
                    <div className="d-flex align-items-center gap-3 mb-4" >
                        <span className="text-secondary">Select Stage:</span>

                        <select className="form-select w-auto bg-dark text-white border-warning" style={{ cursor: "pointer" }} value={stage} onChange={(e) => setStage(e.target.value)}>
                            <option value="ALL">ALL</option>
                            <option value="Stage 1">Stage 1</option>
                            <option value="Stage 2">Stage 2</option>
                        </select>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* START DATE */}
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                format="DD-MM-YYYY"
                                maxDate={dayjs()}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        sx: {
                                            backgroundColor: "#fff",
                                            borderRadius: "6px",

                                        }
                                    }
                                }}
                            />

                            {/* END DATE */}
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                format="DD-MM-YYYY"
                                minDate={startDate}
                                maxDate={dayjs()}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        sx: {
                                            backgroundColor: "#fff",
                                            borderRadius: "6px"
                                        }
                                    }
                                }}
                            />

                        </LocalizationProvider>

                        {/*GET DATA BUTTON*/}
                        <button className="btn btn-warning px-4" onClick={handleGetData} style={{ fontWeight: "500" }} >
                            Get Data
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-warning">Loading data...</p>
                    ) : hasFetched && data.length === 0 ? (
                        <p className="text-secondary">No data found</p>
                    ) : data.length > 0 ? (
                        <div className="table-responsive">
                            <EolTable data={data} stage={stage} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );

}