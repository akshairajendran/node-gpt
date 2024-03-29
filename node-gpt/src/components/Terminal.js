import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const fitAddon = useRef(null);
  const terminalInstance = useRef(null);
  const onDataHandlerAttached = useRef(false); // Flag to track whether onData handler is attached

  useEffect(() => {
    console.log("Initializing terminal...");

    const initializeTerminal = () => {
      console.log("Inside initializeTerminal");
      try {
        const terminal = new XTerminal();
        fitAddon.current = new FitAddon();
        terminal.loadAddon(fitAddon.current);
        terminal.open(terminalRef.current);
        terminal.focus();

        terminalInstance.current = terminal;

        const fitTerminal = () => fitAddon.current.fit();
        window.addEventListener('resize', fitTerminal);
        fitTerminal();

        console.log("Terminal initialized successfully.");

        if (!onDataHandlerAttached.current) { // Check if event handler is already attached
          console.log("Setting up onData handler...");
          const onDataHandler = (e) => {
            console.log("Inside onDataHandler");
            console.log("Received event:", e);

            if (terminalInstance.current && e.keyCode) {
              const char = String.fromCharCode(e.keyCode);
              terminalInstance.current.write(char);
              setInput(prevInput => prevInput + char);
            }
          };

          terminal.attachCustomKeyEventHandler(onDataHandler);
          onDataHandlerAttached.current = true; // Set flag to true after attaching event handler
        }

        // Cleanup function
        return () => {
          console.log("Cleaning up onData handler...");
          if (terminalInstance.current) {
            terminalInstance.current.dispose();
            console.log("Removed terminal instance.");
          }
        };
      } catch (error) {
        console.error("Terminal initialization failed:", error);
      }
    };

    const timeoutId = setTimeout(initializeTerminal, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default Terminal;

