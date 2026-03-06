'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';

export default function TestConnection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    // Display the API URL being used
    const url = (apiClient as any).baseURL;
    setApiUrl(url);
  }, []);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Try to fetch user trips - this will test the API connection
      const response = await apiClient.getUserTrips('test-user');
      setResult({
        success: true,
        message: `✓ Connected! Backend is responding. Got ${response.data.length || 0} trips.`,
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: `✗ Connection failed: ${error.message || 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Backend Connection</h3>
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
        <p><strong>API URL being used:</strong></p>
        <p className="font-mono text-xs break-all">{apiUrl}</p>
      </div>
      <button
        onClick={handleTest}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-medium text-white transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            result.success
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="font-medium">{result.message}</p>
        </div>
      )}
    </div>
  );
}
