"use client"

import React, { useState, useEffect } from 'react';
import './DataGrid_demo.css';

interface DataRow {
  id: number;
  company: string;
  name: string;
  sellDate: string;
  inStock: boolean;
}

const DataGrid_demo: React.FC = () => {
  const initialData: DataRow[] = [
    { id: 1, company: 'Blognation', name: 'LL Headset', sellDate: '10/01/2025', inStock: true },
    { id: 2, company: 'Dynabox', name: 'HL Touring Seat/Saddle', sellDate: '10/01/2025', inStock: false },
    { id: 3, company: 'Roodel', name: 'Full-Finger Gloves', sellDate: '13/01/2025', inStock: true },
    { id: 4, company: 'Browsebug', name: 'ML Mountain Front Wheel', sellDate: '14/01/2025', inStock: true },
    { id: 5, company: 'Vinte', name: 'ML Road Frame-W', sellDate: '22/01/2025', inStock: true },
    { id: 6, company: 'Jetwire', name: 'LL Touring Frame', sellDate: '01/02/2025', inStock: true },
    { id: 7, company: 'Gigabox', name: 'Sport-100', sellDate: '03/02/2025', inStock: true },
    { id: 8, company: 'Jetpulse', name: 'Road-550', sellDate: '08/02/2025', inStock: true },
    { id: 9, company: 'Katz', name: 'Road-350', sellDate: '15/02/2025', inStock: true },
    { id: 10, company: 'Tambee', name: 'ML Touring Seat/Saddle', sellDate: '22/02/2025', inStock: true },
    { id: 11, company: 'Quinu', name: '425-777-7829', sellDate: '22/02/2025', inStock: false },
    { id: 12, company: 'Divavu', name: 'Touring Rear Wheel', sellDate: '24/02/2025', inStock: true },
    { id: 13, company: 'Ainyx', name: 'Touring Pedal', sellDate: '27/02/2025', inStock: true },
    { id: 14, company: 'Katz', name: 'Mountain-300', sellDate: '05/03/2025', inStock: false }
  ];

  const [data, setData] = useState<DataRow[]>(initialData);

  const handleCellEdit = (id: number, field: keyof DataRow, value: string) => {
    setData(data.map(row => {
      if (row.id === id) {
        if (field === 'id') {
          const numericValue = parseInt(value, 10);
          return { ...row, [field]: isNaN(numericValue) ? row.id : numericValue };
        }
        if (field === 'inStock') {
          return { ...row, [field]: value === 'true' };
        }
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  const handleCheckboxToggle = (id: number) => {
    setData(data.map(row =>
      row.id === id ? { ...row, inStock: !row.inStock } : row
    ));
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, [data]);

  return (
    <div className="data-grid-container">
      <h1 className="text-4xl text-white mb-4">Demo</h1>
      <p className="text-gray-400 mb-8">Play around with a demo of Handsontable, in your favorite framework.</p>

      <div className="table-wrapper bg-white inline-flex rounded-lg overflow-scroll h-[400px] max-w-[400px] w-auto">
        <table className="data-grid-table" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead className="data-grid-header">
            <tr>
              <th className="data-grid-cell col-id">ID</th>
              <th className="data-grid-cell col-width">Company Name</th>
              <th className="data-grid-cell col-width">Name</th>
              <th className="data-grid-cell col-width">Sell date</th>
              <th className="data-grid-cell col-width">In stock</th>
              <th className="data-grid-cell col-width">Sell date</th>
              <th className="data-grid-cell col-width">Sell date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="data-grid-cell-two">
                  {row.id}
                </td>
                <td className="data-grid-cell-two">
                  <textarea
                    value={row.company}
                    onChange={(e) => handleCellEdit(row.id, 'company', e.target.value)}
                    onInput={handleInput}
                    className="data-grid-input"
                    rows={1}
                  />
                </td>
                <td className="data-grid-cell-two">
                  <textarea
                    value={row.name}
                    onChange={(e) => handleCellEdit(row.id, 'name', e.target.value)}
                    onInput={handleInput}
                    className="data-grid-input"
                    rows={1}
                  />
                </td>
                <td className="data-grid-cell-two">
                  <textarea
                    value={row.sellDate}
                    onChange={(e) => handleCellEdit(row.id, 'sellDate', e.target.value)}
                    onInput={handleInput}
                    className="data-grid-input"
                    rows={1}
                  />
                </td>
                <td className="data-grid-cell-two">
                  <div>
                    <input
                      type="checkbox"
                      checked={row.inStock}
                      onChange={() => handleCheckboxToggle(row.id)}
                      className="data-grid-checkbox"
                    />
                  </div>
                </td>
                <td className="data-grid-cell-two">
                  <textarea
                    value={row.sellDate}
                    onChange={(e) => handleCellEdit(row.id, 'sellDate', e.target.value)}
                    onInput={handleInput}
                    className="data-grid-input"
                    rows={1}
                  />
                </td>
                <td className="data-grid-cell-two">
                  <div>
                    hello
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='py-10'>
        <div className='prac-grid'>
          testing 12 testingtesting 12 testingtesting 12 testing
        </div>
      </div>
    </div>
  );
};

export default DataGrid_demo;