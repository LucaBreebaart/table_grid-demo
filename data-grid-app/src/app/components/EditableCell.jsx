"use client"

import React, { useRef, useEffect } from 'react';

const EditableCell = ({ value, onChange }) => {
  const cellRef = useRef(null);

  // Function to handle Enter key and line breaks
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
      // Trigger height sync after adding a line break
      setTimeout(syncRowCellHeights, 0);
    }
  };

  // Function to handle input/content changes
  const handleInput = () => {
    // Call height sync after content change
    syncRowCellHeights();
  };

  // Function to sync heights of all editable cells in the same row
  const syncRowCellHeights = () => {
    if (!cellRef.current) return;
    
    // Find the parent row
    const parentRow = cellRef.current.closest('tr');
    if (!parentRow) return;
    
    // Find all editable cells in this row
    const editableCells = parentRow.querySelectorAll('.editable-cell');
    if (editableCells.length <= 1) return; // No need to sync if only one cell
    
    // Reset heights first to get natural heights
    editableCells.forEach(cell => {
      cell.style.height = 'auto';
    });
    
    // Find the tallest cell
    let maxHeight = 0;
    editableCells.forEach(cell => {
      maxHeight = Math.max(maxHeight, cell.scrollHeight);
    });
    
    // Set all cells to the maximum height
    if (maxHeight > 0) {
      editableCells.forEach(cell => {
        cell.style.height = `${maxHeight}px`;
      });
    }
  };

  // Initial height sync after component mounts and when value changes
  useEffect(() => {
    // Use a timeout to ensure the DOM has updated
    const timeoutId = setTimeout(() => syncRowCellHeights(), 0);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div
      ref={cellRef}
      contentEditable="true"
      className="editable-cell"
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onBlur={(e) => {
        onChange(e.target.textContent);
        // One final sync after blur
        syncRowCellHeights();
      }}
      suppressContentEditableWarning={true}
    >
      {value}
    </div>
  );
};

export default EditableCell;