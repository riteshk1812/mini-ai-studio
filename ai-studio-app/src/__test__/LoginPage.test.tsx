import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom"; // ✅ import Router
import { Provider } from "react-redux";
import { store } from "../redux/store";

// mock axios globally
jest.mock("axios");

describe("Login Page", () => {
    const renderWithProviders = () =>
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

    test("renders login form", () => {
        renderWithProviders();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("shows validation errors when fields empty", async () => {
        renderWithProviders();

        const loginButton = screen.getByRole("button", { name: /login/i });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    });
});
