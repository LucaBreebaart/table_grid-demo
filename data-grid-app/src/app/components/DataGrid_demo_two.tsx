"use client"

import React, { useRef } from 'react';
import './DataGrid_demo.css';

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
    <table className='table'>
      <thead>
        <tr className='table-row'>
          <th className='table-heading'>Heading</th>
          <th className='table-heading'>Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr className='table-row'>
          <td className='table-col'>loooooong text loooooong text loooooong text loooooong text loooooong text text text text</td>
          <td className='table-col'>
            <EditableCell />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataGrid_demo2;