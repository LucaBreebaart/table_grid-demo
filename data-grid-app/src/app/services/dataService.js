// dataService.js
// This file contains utility functions for handling the quality control data

/**
 * Loads the quality control data from the JSON file
 * @returns {Promise<Object>} The quality control data
 */
export const loadQualityControlData = async () => {
    try {
      // In a real app, this would be a fetch to your API endpoint
      // For now, we're importing the JSON directly
      const response = await import('../data/qualityControlData.json');
      return response.default;
    } catch (error) {
      console.error('Error loading quality control data:', error);
      throw error;
    }
  };
  
  /**
   * Saves updated quality control data
   * @param {Array} updatedItems - The updated items array
   * @returns {Promise<void>}
   */
  export const saveQualityControlData = async (updatedItems) => {
    try {
      // In a real app, this would be a POST/PUT to your API endpoint
      console.log('Data saved:', updatedItems);
      // Simulate a successful save
      return Promise.resolve({ success: true });
    } catch (error) {
      console.error('Error saving quality control data:', error);
      throw error;
    }
  };
  
  /**
   * Exports the quality control data to CSV
   * @param {Array} items - The items to export
   * @returns {string} CSV string
   */
  export const exportToCSV = (items) => {
    if (!items || items.length === 0) {
      return '';
    }
  
    // Get headers from the first item
    const headers = Object.keys(items[0]);
    
    // Create CSV header row
    let csv = headers.join(',') + '\n';
    
    // Add data rows
    items.forEach(item => {
      const row = headers.map(header => {
        // Wrap values with commas in quotes
        const value = item[header] || '';
        return value.includes(',') ? `"${value}"` : value;
      }).join(',');
      csv += row + '\n';
    });
    
    return csv;
  };
  
  /**
   * Generates a summary report from the quality control data
   * @param {Array} items - The quality control items
   * @returns {Object} Summary statistics
   */
  export const generateSummaryReport = (items) => {
    if (!items || items.length === 0) {
      return {};
    }
    
    // Count total items
    const totalItems = items.length;
    
    // Count items with issues
    const itemsWithIssues = items.filter(item => 
      item.piecesDecay || item.piecesSoft || item.piecesCosmetic || item.remarks
    ).length;
    
    // Calculate average Brix
    const brixValues = items
      .map(item => parseFloat(item.averageBrix))
      .filter(value => !isNaN(value));
      
    const averageBrix = brixValues.length > 0 
      ? brixValues.reduce((sum, value) => sum + value, 0) / brixValues.length
      : 0;
    
    // Group by farm
    const farmGroups = items.reduce((groups, item) => {
      const farm = item.farm;
      if (!groups[farm]) {
        groups[farm] = [];
      }
      groups[farm].push(item);
      return groups;
    }, {});
    
    // Calculate percentages
    const percentWithIssues = (itemsWithIssues / totalItems) * 100;
    
    return {
      totalItems,
      itemsWithIssues,
      percentWithIssues: percentWithIssues.toFixed(2),
      averageBrix: averageBrix.toFixed(2),
      farmGroups
    };
  };