// import React, { FormEvent, useRef, useState } from "react";
// import { useAppDispatch } from "../redux/hooks/typedHook";
// import { login } from "../redux/slices/loginSlice";
// import API from "../utils/api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     console.log("token in login page", localStorage.getItem('token'));
//     const [emailOrPhone, setEmailOrPhone] = useState("");
//     const [password, setPassword] = useState("")
//     const [errors, setErrors] = useState<{ emailOrPhone?: string; password?: string }>({});
//     const [formErr, setFormErr] = useState('');
//     const [loading, setLoading] = useState(false);

//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const emailOrPhoneRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null)

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         const newErr: { emailOrPhone?: string; password?: string } = {};

//         let hasErr = false;

//         if (!emailOrPhone.trim()) {
//             newErr.emailOrPhone = "Please enter email id or phone number";
//             hasErr = true;
//         }

//         if (!password.trim()) {
//             newErr.password = "Please enter password";
//             hasErr = true;
//         }

//         if (!emailOrPhone && !password) {
//             setFormErr("All fields are required!!");
//             emailOrPhoneRef.current?.focus();
//             hasErr = true;
//         } else if (!emailOrPhone.trim()) {
//             setFormErr("");
//             emailOrPhoneRef.current?.focus();
//         } else if (!password.trim()) {
//             setFormErr("");
//             passwordRef.current?.focus();
//         } else {
//             setFormErr("");
//         }

//         setErrors(newErr);
//         if (hasErr) {
//             if (!emailOrPhone.trim()) emailOrPhoneRef.current?.focus();
//             else passwordRef.current?.focus();
//             if (!emailOrPhone.trim() && !password.trim())
//                 setFormErr("All fields are required!");
//             return;
//         }

//         try {
//             setLoading(true);
//             const requestPayload = emailOrPhone.includes("@") ?
//                 { email: emailOrPhone, password } :
//                 { phone: emailOrPhone, password }

//             const { data } = await API.post("/auth/login", requestPayload);

//             dispatch(login({ user: data.user, token: data.token }));

//             localStorage.setItem("user", JSON.stringify(data.user));
//             localStorage.setItem("token", data.token);
//             console.log(data);

//             toast.success(data?.message)
//             navigate('/home')
//         } catch (err: any) {
//             const message = err.response?.data?.error || 'Login failed, please try again!!'
//             setFormErr(message)
//             toast.error(message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
//                 <h2 className="text-xl font-semibold mb-4 text-center">Login to Mini AI Studio</h2>
//                 {formErr && (
//                     <div className="bg-red-100 text-red-600 border border-red-300 rounded-md p-2 mb-4 text-sm text-center">{formErr}</div>
//                 )}
//                 <div className="mb-3">
//                     <input
//                         ref={emailOrPhoneRef}
//                         className={`border p-2 w-full rounded outline-none ${errors.emailOrPhone ? "border-red-500" : "border-gray-300"}`}
//                         type="text"
//                         placeholder="Email | Phone"
//                         value={emailOrPhone}
//                         onChange={(e) => setEmailOrPhone(e.target.value)}
//                     />
//                     {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>}
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         ref={passwordRef}
//                         className={`border p-2 w-full rounded outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className={`${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white w-full py-2 rounded transition-colors`}
//                 >{loading ? <div className="spinner">Spinner</div> : 'Login'}</button>
//             </form>
//             <button onClick={() => navigate('/register')}>Signup</button>
//         </div>
//     )
// }


import React, { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAppDispatch } from "../redux/hooks/typedHook";
import { login } from "../redux/slices/loginSlice";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [open, setOpen] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            const { user, token } = res.data;

            dispatch(login({ user, token }));
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            navigate("/home");
        } catch (err: any) {
            setErrorMsg(err.response?.data?.message || "Invalid credentials");
            setOpen(true);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: 360 }}>
                <Typography variant="h5" align="center" mb={2}>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate("/register")}
                    >
                        Create an account
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
