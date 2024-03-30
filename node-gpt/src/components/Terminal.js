import React from "react";
import Terminal from "react-bash";

const CustomTerminal = () => {
	return (
		<div style={{ height: "100vh", fontFamily: "monospace" }}>
			<Terminal
				prefix="user@host:~$"
				theme={{
					background: "#000000", // Set background color to black
					promptSymbolColor: "#00FF00", // Set prompt symbol color to green
					commandColor: "#00FF00", // Set command color to green
					outputColor: "#00FF00", // Set output color to green
					errorColor: "#FF0000", // Set error color to red
				}}
				structure={{
					files: {
						"about.txt": {
							content: `
I am a custom terminal built with react-bash!
You can customize me further as per your needs.
`,
						},
					},
				}}
			/>
		</div>
	);
};

export default CustomTerminal;
