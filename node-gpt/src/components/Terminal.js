import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const fitAddon = useRef(null);
  const terminalInstance = useRef(null);

  useEffect(() => {
    console.log("Initializing terminal...");

    const initializeTerminal = () => {
      console.log("Inside initializeTerminal");
      try {
        const terminal = new XTerminal({
          cursorBlink: true // Enable blinking cursor
        });
        fitAddon.current = new FitAddon();
        terminal.loadAddon(fitAddon.current);
        terminal.open(terminalRef.current);
        terminal.focus();

        terminalInstance.current = terminal;

        const fitTerminal = () => fitAddon.current.fit();
        window.addEventListener('resize', fitTerminal);
        fitTerminal();

        console.log("Terminal initialized successfully.");

        terminal.onKey(e => {
          console.log("Received key event:", e);
          if (e.key === '\r') { // Check if Enter key is pressed
            terminalInstance.current.write('\r\n'); // Write a new line
            // Handle the command execution here
            console.log("Executing command:", input);
            setInput(''); // Clear the input buffer after executing the command
          } else if (e.key) {
            terminalInstance.current.write(e.key);
            setInput(prevInput => prevInput + e.key);
          }
        });

        // Cleanup function
        return () => {
          console.log("Cleaning up terminal...");
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

  return <div ref={terminalRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Terminal;

