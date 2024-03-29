import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NFT = () => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const route = useNavigate();

    const handleDeploy = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            route('/contract/demo');
        }, 2000);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Deploy NFT Contract</h2>
            <label className="block mb-2">
                Token Name:
                <input
                    type="text"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </label>
            <label className="block mb-4">
                Token Symbol:
                <input
                    type="text"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </label>
            <button
                onClick={handleDeploy}
                disabled={!tokenName || !tokenSymbol || loading}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
            >
                {loading ? 'Deploying...' : 'Deploy'}
            </button>
        </div>
    );
};

export default NFT;
