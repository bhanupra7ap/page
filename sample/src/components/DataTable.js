import React, { useEffect, useState, useRef } from 'react';
import './DataTable.css';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExpiry, setSelectedExpiry] = useState('');
    const bottomRef = useRef(null);

    const fetchData = async () => {
        
        try {
            //const response = await fetch(`https://localhost:5000/api/data`);
            const response = await fetch(`http://51.21.220.215:5000/api/data`);
            const result = await response.json();
            console.log("Fetched data:", result);

            const transformedData = Object.keys(result).map(key => ({
                instrument: key,
                data: result[key],
                flag: result[key][0].flag // Assuming the flag is part of the first data point
            }));

            setData(transformedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getNextFetchDelay = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const nextFetchMinutes = Math.ceil(minutes / 5) * 5;
        const nextFetchTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), nextFetchMinutes, 0, 0);
        return nextFetchTime - now;
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        const initialDelay = getNextFetchDelay();
        const initialTimeout = setTimeout(() => {
            fetchData();
            setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes
        }, initialDelay);

        return () => clearTimeout(initialTimeout);
    }, []);

    const handleExpiryChange = (event) => {
        setSelectedExpiry(event.target.value);
    };

    const filteredData = data ? data.filter(item => item.flag === 'show' || item.instrument === 'NIFTY' || item.instrument === 'BANKNIFTY') : [];

    const sortedData = filteredData.sort((a, b) => {
        if (a.instrument === 'NIFTY' || a.instrument === 'BANKNIFTY') return -1;
        if (b.instrument === 'NIFTY' || b.instrument === 'BANKNIFTY') return 1;
        return 0;
    });

    return (
        <div className="data-table-container">
            {loading && data.length === 0 ? (
                <div className="card loading">
                    <h2>Loading...</h2>
                </div>
            ) : (
                <div className="grid-container">
                    {sortedData.map((item, index) => (
                        
                        <div className="card" key={index}>
                            <h2>{item.instrument}</h2>
                            {item.instrument === 'NIFTY' && (
                                <select value={selectedExpiry} onChange={handleExpiryChange}>
                                    {Object.keys(item.data).map((expiry, idx) => (
                                        <option key={idx} value={expiry}>{expiry}</option>
                                    ))}
                                </select>
                            )}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>ATM</th>
                                        <th>CALL LTP</th>
                                        <th>CALL Volume</th>
                                        <th>PUT LTP</th>
                                        <th>PUT Volume</th>
                                        <th>Call Action</th>
                                        <th>Put Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(item.data).map((key, idx) => (
                                        <tr key={idx}>
                                            <td>{item.data[key].time}</td>
                                            <td>{item.data[key].atm}</td>
                                            <td>{item.data[key].call_ltp}</td>
                                            <td>{item.data[key].call_volume}</td>
                                            <td>{item.data[key].put_ltp}</td>
                                            <td>{item.data[key].put_volume}</td>
                                            <td>{item.data[key].call_action}</td>
                                            <td>{item.data[key].put_action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    <div ref={bottomRef} className="loading">
                        {loading && <h2>Loading more...</h2>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
