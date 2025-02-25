"use client"

import React, { useState, useEffect } from 'react';
import { loadQualityControlData, saveQualityControlData } from '../services/dataService.js';
import './QualityControlTable.css';
import EditableCell from './EditableCell.jsx';


const QualityControlTable = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inspectionInfo, setInspectionInfo] = useState({});
    const [qualityData, setQualityData] = useState([]);
    const [totals, setTotals] = useState({});

    // Load data from the JSON file
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await loadQualityControlData();
                setInspectionInfo(data.inspectionInfo);
                setQualityData(data.items);
                setTotals(data.totals);
                setLoading(false);
            } catch (err) {
                setError('Failed to load quality control data');
                setLoading(false);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    // Function to update editable fields
    const updateField = (index, field, value) => {
        const updatedData = [...qualityData];
        updatedData[index][field] = value;
        setQualityData(updatedData);

        // In a real application, you might want to debounce this or save on form submit
        saveQualityControlData(updatedData).catch(err => {
            console.error('Error saving data:', err);
        });
    };

    if (loading) {
        return (
            <div className="data-grid-container">
                <div className="loading-spinner">Loading quality control data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="data-grid-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="data-grid-container">
            <div className="header-section">
                <h1 className="text-2xl text-white mb-4">ARRIVAL REPORT / QUALITY CONTROL</h1>
                <div className="inspection-info">
                    <div className="info-item">
                        <span className="info-label">Order No:</span>
                        <span className="info-value">{inspectionInfo.orderNoNiche}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Date:</span>
                        <span className="info-value">{inspectionInfo.date}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Vessel:</span>
                        <span className="info-value">{inspectionInfo.vesselName}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Inspected by:</span>
                        <span className="info-value">{inspectionInfo.inspectedBy}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Claim Status:</span>
                        <span className="info-value">{inspectionInfo.claimStatus}</span>
                    </div>
                </div>
            </div>

            <div className="table-wrapper rounded-lg overflow-auto h-[600px]">
                <table className="data-grid-table" style={{ width: 'max-content', borderCollapse: 'separate', borderSpacing: 0 }}>
                    <thead className="data-grid-header">
                        <tr className="table-row">
                            <th className="table-heading">PalletID</th>
                            <th className="table-heading">Variety</th>
                            <th className="table-heading">Farm</th>
                            <th className="table-heading">Commodity</th>
                            <th className="table-heading">Grade</th>
                            <th className="table-heading">Count</th>
                            <th className="table-heading">TempRecord</th>
                            <th className="table-heading">Total Cartons</th>
                            <th className="table-heading">Sampled</th>
                            <th className="table-heading">Total pieces</th>
                            <th className="table-heading">Pieces Decay</th>
                            <th className="table-heading">Pieces soft</th>
                            <th className="table-heading">Pieces with cosmetic defects</th>
                            <th className="table-heading">Average Brix</th>
                            <th className="table-heading">REMARKS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {qualityData.map((row, index) => (
                            <tr key={index} className="table-row">
                                <td className="table-col">{row.palletID}</td>
                                <td className="table-col">{row.variety}</td>
                                <td className="table-col">{row.farm}</td>
                                <td className="table-col">{row.commodity}</td>
                                <td className="table-col">{row.grade}</td>
                                <td className="table-col">{row.count}</td>
                                <td className="table-col">
                                    <EditableCell
                                        value={row.tempRecord}
                                        onChange={(value) => updateField(index, 'tempRecord', value)}
                                    />
                                </td>
                                <td className="table-col">{row.totalCartons}</td>
                                <td className="table-col">{row.totalPiecesSampled}</td>
                                <td className="table-col">{row.piecesSampled}</td>
                                <td className="table-col">
                                    <EditableCell
                                        value={row.piecesDecay}
                                        onChange={(value) => updateField(index, 'piecesDecay', value)}
                                    />
                                </td>
                                <td className="table-col">
                                    <EditableCell
                                        value={row.piecesSoft}
                                        onChange={(value) => updateField(index, 'piecesSoft', value)}
                                    />
                                </td>
                                <td className="table-col">
                                    <EditableCell
                                        value={row.piecesCosmetic}
                                        onChange={(value) => updateField(index, 'piecesCosmetic', value)}
                                    />
                                </td>
                                <td className="table-col">
                                    <EditableCell
                                        value={row.averageBrix}
                                        onChange={(value) => updateField(index, 'averageBrix', value)}
                                    />
                                </td>
                                <td className="table-col">
                                    <EditableCell
                                        value={row.remarks}
                                        onChange={(value) => updateField(index, 'remarks', value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="table-row total-row">
                            <td colSpan="7" className="table-col text-right font-bold">Grand Total:</td>
                            <td className="table-col font-bold">{totals.grandTotal}</td>
                            <td colSpan="7" className="table-col"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default QualityControlTable;