import React, { useEffect, useRef, useState } from "react";
import { Terminal as XTerminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import CommandHistory from "./CommandHistory"; // Import CommandHistory component
import "./Terminal.css"; // Import CSS file for styling

const Terminal = () => {
	const [commands, setCommands] = useState([]); // State to store command history
	const [currentCommandIndex, setCurrentCommandIndex] = useState(-1); // State to track current command index
	const terminalRef = useRef(null);
	const fitAddon = useRef(null);
	const terminalInstance = useRef(null);
	let inputBuffer = ""; // Input buffer to store user input

	useEffect(() => {
		console.log("Initializing terminal...");

		const initializeTerminal = () => {
			console.log("Inside initializeTerminal");
			try {
				const terminal = new XTerminal({
					cursorBlink: true, // Enable blinking cursor
				});
				fitAddon.current = new FitAddon();
				terminal.loadAddon(fitAddon.current);
				terminal.open(terminalRef.current);
				terminal.focus();

				terminalInstance.current = terminal;

				// Add ">" character to the first line
				terminalInstance.current.write("> ");

				const fitTerminal = () =>
					fitAddon.current.fit();
				window.addEventListener("resize", fitTerminal);
				fitTerminal();

				console.log(
					"Terminal initialized successfully."
				);

				terminal.onKey((e) => {
					console.log("Received key event:", e);
					if (e.key === "\r") {
						// Check if Enter key is pressed
						console.log(
							"Input value:",
							inputBuffer
						);
						const trimmedInput =
							inputBuffer.trim();
						if (trimmedInput) {
							// Check if the input is not empty after trimming
							setCommands(
								(
									prevCommands
								) => {
									console.log(
										"Previous commands:",
										prevCommands
									);
									const updatedCommands =
										[
											...prevCommands,
											trimmedInput,
										];
									console.log(
										"Updated commands:",
										updatedCommands
									);
									return updatedCommands;
								}
							); // Add full input text as command to history
							terminalInstance.current.write(
								`\r\n> `
							); // Write a new line with ">" character
						}
						inputBuffer = ""; // Clear the input buffer after executing the command
					} else if (e.key === "\x7F") {
						// Check if Backspace key is pressed
						console.log(
							"Backspace key pressed"
						);
						if (inputBuffer.length > 0) {
							terminalInstance.current.write(
								"\b \b"
							); // Write backspace to clear the character in the terminal
							inputBuffer =
								inputBuffer.slice(
									0,
									-1
								); // Remove the last character from the input buffer
						}
					} else if (e.key === "\x1B[A") {
						// Check if Up arrow key is pressed
						console.log(
							"Up arrow key pressed"
						);
						setCommands((prevCommands) => {
							console.log(
								"Current commands:",
								prevCommands
							);
							const newIndex =
								Math.max(
									0,
									currentCommandIndex -
										1
								);
							setCurrentCommandIndex(
								newIndex
							);
							return prevCommands;
						});
					} else if (e.key === "\x1B[B") {
						// Check if Down arrow key is pressed
						console.log(
							"Down arrow key pressed"
						);
						setCommands((prevCommands) => {
							console.log(
								"Current commands:",
								prevCommands
							);
							const newIndex =
								Math.min(
									commands.length -
										1,
									currentCommandIndex +
										1
								);
							setCurrentCommandIndex(
								newIndex
							);
							return prevCommands;
						});
					} else if (e.key) {
						terminalInstance.current.write(
							e.key
						);
						inputBuffer += e.key; // Add the key to the input buffer
					}
				});

				// Cleanup function
				return () => {
					console.log("Cleaning up terminal...");
					if (terminalInstance.current) {
						terminalInstance.current.dispose();
						console.log(
							"Removed terminal instance."
						);
					}
				};
			} catch (error) {
				console.error(
					"Terminal initialization failed:",
					error
				);
			}
		};

		const timeoutId = setTimeout(initializeTerminal, 0);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className="terminal-container">
			<div className="terminal-pane" ref={terminalRef}></div>
			<div className="command-history-pane">
				<CommandHistory commands={commands} />
			</div>
		</div>
	);
};

export default Terminal;
