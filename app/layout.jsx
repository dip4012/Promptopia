import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import "@/styles/globals.css"

export const metaData = {
	title: "Promptopia",
	description: "Discover and share AI prompts",
}

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>

					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	)
}
