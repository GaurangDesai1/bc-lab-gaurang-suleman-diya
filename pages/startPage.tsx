import React from 'react';
import { useWriteContract, BaseError, useWaitForTransactionReceipt } from 'wagmi';
import { abi } from '../contracts/abi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';

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

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault(); 
    const formData = new FormData(e.target as HTMLFormElement); 
    const content = formData.get('content') as string; 
    const name = formData.get('name') as string; 
    const email = formData.get('email') as string; 
    const contact = formData.get('contact') as string; 
    writeContract({
      address: '0x2150100C94d1873790bFd21D4bc4C8caa6A00E06',
      abi,
      functionName: 'listProperty',
      args: [String(content), String(name), email, contact],
    });
  }

  return (
    <div className={styles.container}>
      <div>
        <ConnectButton />
      </div>
      <form onSubmit={submit} className={styles.form}>
        <input name="content" placeholder="asset" required className={styles.input} />
        <input name="name" placeholder="name" required className={styles.input} />
        <input name="email" placeholder="email" required className={styles.input} />
        <input name="contact" placeholder="contact" required className={styles.input} />
        <button 
          disabled={isPending} 
          type="submit"
          className={styles.button}
        >
          {error && ( 
            <div className={styles.error}>Error: {(error as BaseError).shortMessage || error.message}</div> 
          )} 
          Submit Details 
          {isPending ? 'Confirming...' : ''} 
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
