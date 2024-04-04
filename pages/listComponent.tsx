import React, { useEffect, useState } from 'react';
import { useAccount, useReadContracts, useReadContract } from 'wagmi';
import { abi } from '../contracts/abi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function BuyComponent() {
  const { data: count } = useReadContract({
    address: "0x2150100C94d1873790bFd21D4bc4C8caa6A00E06",
    abi,
    functionName: 'getTaskCount',
  });

  const { data, isError, isLoading } = useReadContracts({
    contracts: Array.from({ length: Number(count) }, (_, i) => ({
      address: "0x2150100C94d1873790bFd21D4bc4C8caa6A00E06",
      abi: abi,
      functionName: 'getTask',
      args: [i]
    }))
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      {/* ConnectButton component */}
      <ConnectButton />

      {/* Content container */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Will Preservation System</h1>

        <div className="grid grid-cols-1 gap-4">
          {data?.map((item, index) => (
            <div key={index} className="bg-blue-200 p-4 rounded-md">
              <p className="text-base">{item.result[1]} will be given to {item.result[2]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyComponent;