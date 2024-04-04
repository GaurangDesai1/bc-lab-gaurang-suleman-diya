import React from 'react';
import { useWriteContract, BaseError, useWaitForTransactionReceipt, useReadContracts, useReadContract } from 'wagmi';
import { abi } from '../contracts/abi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

const WriteContractComponent: React.FC = () => {
  const { 
    data: hash, 
    isPending, 
    error,
    writeContract 
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    });

    const { data: count } = useReadContract({
      address: "0x2150100C94d1873790bFd21D4bc4C8caa6A00E06",
      abi,
      functionName: 'getPropertyCount',
    });
console.log(count);
    const { data, isError, isLoading } = useReadContracts({
      contracts: Array.from({ length: Number(count) }, (_, i) => ({
        address: "0x2150100C94d1873790bFd21D4bc4C8caa6A00E06",
        abi: abi,
        functionName: 'getProperty',
        args: [i]
      }))
    });
console.log(data);
  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault(); 
    const formData = new FormData(e.target as HTMLFormElement); 
    const content = formData.get('content') as string; 
    // const name = formData.get('name') as string; 
    writeContract({
      address: '0x2150100C94d1873790bFd21D4bc4C8caa6A00E06',
      abi,
      functionName: 'createTask',
      args: [String(content), String(selectedItem)],
    });
  }

  const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <ConnectButton />
      </div>
      <form onSubmit={submit} className={styles.form}>
        {/* <input name="content" placeholder="asset" required className={styles.input} /> */}
        {/* <div>
          <select value={selectedItem} onChange={handleChange}>
            <option value="">Select an item</option>
            {data.map((item, index) => (
              <option key={index} value={item.property}>{item.property}</option>
            ))}
          </select>
          <p>Selected item: {selectedItem}</p>
        </div> */}
        <input name="name" placeholder="name" required className={styles.input} />
        <button 
          disabled={isPending} 
          type="submit"
          className={styles.button}
        >
          {error && ( 
            <div className={styles.error}>Error: {(error as BaseError).shortMessage || error.message}</div> 
          )} 
          Mint 
          {isPending ? 'Confirming...' : 'Mint'} 
        </button>
        {hash && <div className={styles.transactionInfo}>Transaction Hash: {hash}</div>}
        {isConfirming && <div className={styles.confirmingInfo}>Waiting for confirmation...</div>}
        {isConfirmed && <div className={styles.confirmedInfo}>Transaction confirmed.</div>}
      </form>
      <h1 className="title">WILL PRESERVATION SYSTEM</h1>
      {/* <img src="path_to_your_logo" alt="Logo" className="logo" /> */}
    </div>
  );
};

export default WriteContractComponent;
