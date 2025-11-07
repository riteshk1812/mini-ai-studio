import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks/typedHook";
import { logout } from "../redux/slices/loginSlice";
import { toggleTheme } from '../redux/slices/themeSlice';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const dark = useAppSelector((state) => state.theme.dark);

    return (
        <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">Mini AI Studio</Typography>
                {user && (
                    <div>
                        <Typography component="span" sx={{ mr: 2 }}>
                            Hello, {user.name}
                        </Typography>
                        <button onClick={() => dispatch(toggleTheme())} >{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
                        <Button
                            color="inherit"
                            onClick={() => dispatch(logout())}
                            variant="outlined"
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}