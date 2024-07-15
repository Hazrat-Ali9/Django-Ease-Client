import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		// setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signInWithGoogle = () => {
		// setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const resetPassword = (email) => {
		// setLoading(true);
		return sendPasswordResetEmail(auth, email);
	};

	const logOut = async () => {
		// setLoading(true);
		return signOut(auth);
	};

	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			const userEmail = currentUser?.email || user?.email;
			const loggedUser = { email: userEmail };
			setUser(currentUser);
			console.log("current user", currentUser);
			// setLoading(false);
			// if User Exists
			if (currentUser) {
				axios
					.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser)
					.then((res) => {
						console.log(res.data.token);
						if (res.data.token) {
							localStorage.setItem("access-token", res.data.token);
							setLoading(false);
						}
					});
			} else {
				localStorage.removeItem("access-token");
				setLoading(false);
				// axios
				// 	.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser, {
				// 		withCredentials: true,
				// 	})
				// 	.then((res) => {
				// 		// console.log(res.data);
				// 	});
			}
		});
		return () => {
			unSubscribe();
		};
	}, [user?.email]);

	const authInfo = {
		user,
		loading,
		setLoading,
		createUser,
		signIn,
		signInWithGoogle,
		resetPassword,
		logOut,
		updateUserProfile,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

AuthProvider.propTypes = {
	children: PropTypes.node,
};
