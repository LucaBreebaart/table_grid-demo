"use client"

import React, { useRef } from 'react';
import './DataGrid_demo_two.css';

const EditableCell: React.FC = () => {
  const cellRef = useRef<HTMLDivElement>(null);

  // Only handle the Enter key - no state updates for typing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  return (
    <div
      ref={cellRef}
      contentEditable="true"
      className="editable-cell"
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning={true}
    >
      Short
    </div>
  );
};

const DataGrid_demo2: React.FC = () => {
  return (
    <div className="data-grid-container">
      <h1 className="text-4xl text-white mb-4">Demo 2</h1>

      <div className="table-wrapper rounded-lg overflow-auto h-[400px] w-full max-w-[800px]">
        <table className="data-grid-table" style={{ width: 'max-content', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead className="data-grid-header">
            <tr className='table-row'>
              <th className='table-heading'>Heading</th>
              <th className='table-heading'>Heading</th>
              <th className='table-heading'>Heading</th>
              <th className='table-heading'>Heading</th>
              <th className='table-heading'>Heading</th>
              <th className='table-heading'>Heading</th>
            </tr>
          </thead>

          <tbody>
            <tr className='table-row'>
              <td className='table-col'>loooooong text loooooong text loooooong text loooooong text loooooong text text text text</td>
              <td className='table-col'>loooooong text loooooong text loooooong text loooooong text loooooong text text text text</td>
              <td className='table-col'>loooooong text loooooong text loooooong text loooooong text loooooong text text text text</td>
              <td className='table-col'>
                <EditableCell />
              </td>
              <td className='table-col'>
                <EditableCell />
              </td>
              <td className='table-col'>
                <EditableCell />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid_demo2;