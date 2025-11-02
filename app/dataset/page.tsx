'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Trash2, Save, X, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface DataRow {
  [key: string]: string | number;
}

export default function DatasetPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<DataRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null);
  const [editedData, setEditedData] = useState<DataRow[]>([]);
  const [labels, setLabels] = useState<{ [key: number]: string }>({});
  const [previewMode, setPreviewMode] = useState<'table' | 'stats'>('table');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    const extension = uploadedFile.name.split('.').pop()?.toLowerCase();

    if (extension === 'csv') {
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data as DataRow[];
          setData(parsedData.slice(0, 100)); // Limit to 100 rows for demo
          setEditedData(parsedData.slice(0, 100));
          setHeaders(Object.keys(parsedData[0] || {}));
        },
      });
    } else if (extension === 'xlsx' || extension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as DataRow[];
        setData(jsonData.slice(0, 100));
        setEditedData(jsonData.slice(0, 100));
        setHeaders(Object.keys(jsonData[0] || {}));
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  const handleCellEdit = (rowIndex: number, col: string, value: string) => {
    const updated = [...editedData];
    updated[rowIndex] = { ...updated[rowIndex], [col]: value };
    setEditedData(updated);
  };

  const saveCellEdit = () => {
    setData(editedData);
    setEditingCell(null);
  };

  const cancelCellEdit = () => {
    setEditedData(data);
    setEditingCell(null);
  };

  const handleLabelChange = (rowIndex: number, label: string) => {
    setLabels({ ...labels, [rowIndex]: label });
  };

  const removeRow = (index: number) => {
    const updated = editedData.filter((_, i) => i !== index);
    setEditedData(updated);
    setData(updated);
  };

  const getColumnStats = (col: string): 
    | { min: number; max: number; mean: number; median: number; nulls: number }
    | { unique: number; nulls: number } => {
    const values = editedData.map(row => row[col]).filter(v => v !== null && v !== undefined);
    const numericValues = values.map(v => Number(v)).filter(v => !isNaN(v));
    
    if (numericValues.length > 0) {
      const sorted = [...numericValues].sort((a, b) => a - b);
      return {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        median: sorted[Math.floor(sorted.length / 2)],
        nulls: values.length - numericValues.length,
      };
    }
    
    return {
      unique: new Set(values).size,
      nulls: editedData.length - values.length,
    };
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dataset Management
          </h1>
          <p className="text-gray-300 text-lg">
            Upload, preview, data cleaning, and labeling
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Upload Dataset</h2>
          <div className="flex items-center space-x-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Upload className="h-5 w-5" />
              <span>Upload File (CSV/XLSX)</span>
            </button>
            {file && (
              <div className="flex items-center space-x-2 text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>{file.name}</span>
                <span className="text-sm">({data.length} rows)</span>
              </div>
            )}
          </div>
        </div>

        {data.length > 0 && (
          <>
            {/* Controls */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setPreviewMode('table')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      previewMode === 'table'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Tabel Data
                  </button>
                  <button
                    onClick={() => setPreviewMode('stats')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      previewMode === 'stats'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Statistik
                  </button>
                </div>
                <div className="text-gray-300">
                  {editedData.length} rows × {headers.length} columns
                </div>
              </div>
            </div>

            {/* Table View */}
            {previewMode === 'table' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8 overflow-x-auto">
                <div className="min-w-full overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="px-4 py-3 text-white font-semibold">Label</th>
                        {headers.map((header) => (
                          <th key={header} className="px-4 py-3 text-white font-semibold min-w-[150px]">
                            {header}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-white font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedData.slice(0, 50).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-white/10 hover:bg-white/5">
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={labels[rowIndex] || ''}
                              onChange={(e) => handleLabelChange(rowIndex, e.target.value)}
                              placeholder="Label..."
                              className="w-24 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                          </td>
                          {headers.map((col) => (
                            <td
                              key={col}
                              className="px-4 py-3 text-gray-300"
                              onDoubleClick={() => setEditingCell({ row: rowIndex, col })}
                            >
                              {editingCell?.row === rowIndex && editingCell?.col === col ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={String(editedData[rowIndex][col] || '')}
                                    onChange={(e) => handleCellEdit(rowIndex, col, e.target.value)}
                                    className="flex-1 px-2 py-1 bg-white/20 border border-yellow-300 rounded text-white text-sm focus:outline-none"
                                    autoFocus
                                  />
                                  <button
                                    onClick={saveCellEdit}
                                    className="text-green-400 hover:text-green-300"
                                  >
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={cancelCellEdit}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="truncate max-w-[150px]">{String(row[col] || '')}</div>
                              )}
                            </td>
                          ))}
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removeRow(rowIndex)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Statistics View */}
            {previewMode === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {headers.map((col) => {
                  const stats = getColumnStats(col);
                  return (
                    <div
                      key={col}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">{col}</h3>
                      {'min' in stats && typeof stats.min === 'number' ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-300">
                            <span>Min:</span>
                            <span className="text-white">{stats.min.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Max:</span>
                            <span className="text-white">{stats.max.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Mean:</span>
                            <span className="text-white">{stats.mean.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Median:</span>
                            <span className="text-white">{stats.median.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Nulls:</span>
                            <span className="text-white">{stats.nulls}</span>
                          </div>
                        </div>
                      ) : 'unique' in stats ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-300">
                            <span>Unique Values:</span>
                            <span className="text-white">{stats.unique}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Nulls:</span>
                            <span className="text-white">{stats.nulls}</span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Data Cleaning Tools */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Pembersihan Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    const cleaned = editedData.filter(row => 
                      Object.values(row).some(v => v !== null && v !== undefined && String(v).trim() !== '')
                    );
                    setEditedData(cleaned);
                    setData(cleaned);
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-left"
                >
                  <div className="font-semibold mb-1">Hapus Baris Kosong</div>
                  <div className="text-sm opacity-90">Menghapus semua baris yang kosong</div>
                </button>
                <button
                  onClick={() => {
                    const cleaned = editedData.map(row => {
                      const cleanedRow: DataRow = {};
                      Object.keys(row).forEach(key => {
                        cleanedRow[key] = typeof row[key] === 'string' 
                          ? String(row[key]).trim() 
                          : row[key];
                      });
                      return cleanedRow;
                    });
                    setEditedData(cleaned);
                    setData(cleaned);
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-left"
                >
                  <div className="font-semibold mb-1">Bersihkan Whitespace</div>
                  <div className="text-sm opacity-90">Menghapus spasi di awal/akhir setiap cell</div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

