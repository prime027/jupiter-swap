'use client'

import { useCallback, useEffect } from 'react';
import styles from './page.module.css';

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function Page() {

  useEffect(() => {
    // Dynamically load the Jupiter script
    const script = document.createElement('script');
    script.src = "https://terminal.jup.ag/main-v2.js";
    script.onload = () => debouncedLaunchJupiter(); // Initialize Jupiter after the script loads
    document.head.appendChild(script);
  }, []);

  function launchJupiter() {
    if (window.Jupiter) {
      window.Jupiter.init({ 
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: "https://devnet.helius-rpc.com/?api-key=ad99805d-0ce2-4769-96ef-3d68a34efb2d",
        strictTokenList: false,
        defaultExplorer: "SolanaFM",
        // formProps: {
        //   initialAmount: "888888880000",
        //   initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        //   initialOutputMint: "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
        // },
      });
    } else {
      console.error("Jupiter script not loaded yet");
    }
  }

  const debouncedLaunchJupiter = useCallback(debounce(launchJupiter, 300), []);

  return (
    <div className={styles.body}>

      <div id="integrated-terminal"></div>

    </div>
  );
}

export default Page;