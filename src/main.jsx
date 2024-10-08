import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
// Import 'Flow Bite';
// </React.StrictMode>
const queryClient = new QueryClient();
// React Strict Mode 
ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<RouterProvider router={router} />
					<Toaster />
				</AuthProvider>
			</QueryClientProvider>
		</HelmetProvider>
	
);
