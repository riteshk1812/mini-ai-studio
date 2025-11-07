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
import { registerSuccess } from "../redux/slices/registerSlice";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/signup", form);
            dispatch(registerSuccess(res.data));
            setMsg("Registration successful!");
            setSuccess(true);
            setOpen(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            console.log(err);

            setMsg(err.response?.data?.error || "Registration failed");
            setSuccess(false);
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
            <Paper elevation={3} sx={{ p: 4, width: 380 }}>
                <Typography variant="h5" align="center" mb={2}>
                    Register
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                    <Button
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert severity={success ? "success" : "error"}>{msg}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;
