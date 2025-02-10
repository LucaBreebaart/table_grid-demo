'use client';

import React, { useState, useCallback, useRef } from 'react';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/solid';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Input,
  Select,
  SelectItem,
  Button,
  Card,
} from "@nextui-org/react";

interface DataGridProps {
  data: any[][];
  headers?: string[];
}

export const DataGrid = ({ data: initialData, headers = [] }: DataGridProps) => {
  const [data, setData] = useState(initialData);
  const [editCell, setEditCell] = useState<{ row: number; col: number } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setEditCell({ row: rowIndex, col: colIndex });
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const newData = data.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) => (cIndex === colIndex ? e.target.value : cell))
        : row
    );
    setData(newData);
  };

  const handleBlur = () => {
    setEditCell(null);
  };

  const toggleFullScreen = useCallback(() => {
    const element = tableContainerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  }, []);

  const handleZoomChange = (value: string) => {
    setZoom(Number(value));
  };

  const zoomLevels = [25, 50, 75, 90, 100, 110, 125, 150, 175, 200];

  const columns = headers.map((header) => ({
    key: header.toLowerCase().replace(/\s+/g, '_'),
    label: header,
  }));

  const formattedData = data.map((row, index) => {
    const rowData: Record<string, any> = {};
    headers.forEach((header, colIndex) => {
      rowData[header.toLowerCase().replace(/\s+/g, '_')] = row[colIndex];
    });
    rowData.id = index;
    return rowData;
  });

  return (
    <Card
      ref={tableContainerRef}
      className="flex flex-col h-full border border-default-200 rounded-large overflow-hidden"
    >
      <div className="relative w-full h-full">

        <div 
          className="relative w-full overflow-auto"
          style={{ 
            height: isFullScreen ? '100vh' : '70vh',
          }}
        >
  
          <div
            className="min-w-full"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
              minWidth: '100%',
              width: 'fit-content'
            }}
          >
            <Table 
              aria-label="Example table with dynamic content"
              classNames={{
                wrapper: "min-h-[200px]",
                th: "bg-default-100 text-default-800 sticky top-0",
                td: "text-default-800",
              }}
              selectionMode="none"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn 
                    key={column.key} 
                    className="bg-default-100"
                  >
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={formattedData}>
                {(item) => (
                  <TableRow key={item.id}>
                    {headers.map((header, colIndex) => (
                      <TableCell 
                        key={colIndex}
                        onClick={() => handleCellClick(item.id, colIndex)}
                        className="hover:bg-default-100 transition-colors"
                      >
                        {editCell?.row === item.id && editCell?.col === colIndex ? (
                          <Input
                            type="text"
                            value={item[header.toLowerCase().replace(/\s+/g, '_')]}
                            onChange={(e) => handleCellChange(e, item.id, colIndex)}
                            onBlur={handleBlur}
                            autoFocus
                            size="sm"
                            variant="bordered"
                            classNames={{
                              input: "text-default-800",
                              inputWrapper: "h-8 bg-background",
                            }}
                          />
                        ) : (
                          <span className="text-default-800">
                            {item[header.toLowerCase().replace(/\s+/g, '_')]}
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

     
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-2 bg-default-100 border-t border-default-200">
          <div></div>
          <div className="flex items-center gap-4">
            <Select
              defaultSelectedKeys={[zoom.toString()]}
              onChange={(e) => handleZoomChange(e.target.value)}
              size="sm"
              variant="bordered"
              className="w-32 bg-background"
              classNames={{
                trigger: "bg-background",
                value: "text-default-800",
              }}
            >
              {zoomLevels.map((level) => (
                <SelectItem 
                  key={level.toString()} 
                  value={level.toString()}
                  className="text-default-800"
                >
                  {level}%
                </SelectItem>
              ))}
            </Select>

            <Button
              isIconOnly
              variant="light"
              onClick={toggleFullScreen}
              size="sm"
              className="text-default-800"
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon className="w-5 h-5" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DataGrid;