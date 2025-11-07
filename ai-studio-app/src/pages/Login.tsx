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
