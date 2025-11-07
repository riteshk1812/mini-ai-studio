import { render, screen, fireEvent } from "@testing-library/react";
import PromptGeneration from "../pages/PromptGeneration";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("Prompt Generation Page", () => {
    test("renders upload, style, and prompt components", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PromptGeneration />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Style/i)[0]).toBeInTheDocument();
        expect(screen.getByLabelText(/Prompt/i)).toBeInTheDocument();
    });
    test("handles file upload event", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PromptGeneration />
                </BrowserRouter>
            </Provider>
        );

        const file = new File(["dummy"], "test.png", { type: "image/png" });
        const input = screen.getByLabelText(/Upload Image/i) as HTMLInputElement;
        fireEvent.change(input, { target: { files: [file] } });

        expect(input.files?.[0].name).toBe("test.png");
    });
});
