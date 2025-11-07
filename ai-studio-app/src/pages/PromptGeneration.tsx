import { useState, useEffect, FormEvent } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../redux/hooks/typedHook";
import { useNavigate } from "react-router-dom";
import {
    createGenerationSuccess,
    fetchGenerationSuccess,
    generationFailure,
} from "../redux/slices/promptGenerationSlice";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { Grid } from "@mui/material";



export default function PromptGeneration() {
    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("Realistic");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ prompt?: string; image?: string }>({});

    const { generations } = useAppSelector((state) => state.promptGeneration);
    const { token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error("Please login!");
            navigate("/login");
            return;
        }

        const fetchGenerations = async () => {
            try {
                const { data } = await API.get("/generations");
                const normalized = (data.generations || []).map((gen: any) => ({
                    id: gen.id,
                    prompt: gen.prompt,
                    style: gen.style,
                    imageUrl: gen.imageUrl || gen.image_url, // ✅ handles both
                    createdAt: gen.createdAt || gen.created_at, // ✅ handles both
                }));
                console.log("on reload w", normalized);

                dispatch(fetchGenerationSuccess(normalized));
            } catch (err: any) {
                dispatch(generationFailure());
                toast.error(err.response?.data?.error || "Failed to fetch generations");
            }
        };
        fetchGenerations();
    }, [dispatch, navigate, token]);

    const handlePromptSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newErr: { prompt?: string; image?: string } = {};
        if (!prompt.trim()) newErr.prompt = "Please enter a prompt!";
        if (!image) newErr.image = "Please upload an image!";
        setErrors(newErr);

        if (Object.keys(newErr).length > 0) return;

        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("style", style);
        if (image) formData.append("image", image);

        try {
            setLoading(true);
            const { data } = await API.post("/generations", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const newGen = {
                id: data.data.id,
                prompt: data.data.prompt,
                style: data.data.style,
                imageUrl: data.data.image_url,
                createdAt: data.data.created_at,
            };
            dispatch(createGenerationSuccess(newGen));
            toast.success("Generation created successfully!");
            setPrompt("");
            setImage(null);
        } catch (error: any) {
            dispatch(generationFailure());
            toast.error(error.response?.data?.error || "Failed to create generation!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f5f6fa",
                minHeight: "100vh",
                py: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 600,
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h5" align="center" fontWeight={600} mb={3}>
                    ✨ Prompt Generator
                </Typography>

                <Box
                    component="form"
                    onSubmit={handlePromptSubmit}
                    noValidate
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                    <Button
                        variant="outlined"
                        component="label"
                        // startIcon={<UploadFileIcon />}
                        color={errors.image ? "error" : "primary"}
                    >
                        {image ? image.name : "Upload Image"}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e: any) => setImage(e.target.files?.[0] || null)}
                        />
                    </Button>
                    {errors.image && (
                        <Typography color="error" variant="caption">
                            {errors.image}
                        </Typography>
                    )}

                    <FormControl fullWidth>
                        <InputLabel>Style</InputLabel>
                        <Select
                            value={style}
                            onChange={(e: any) => setStyle(e.target.value)}
                            label="Style"
                        >
                            <MenuItem value="Realistic">Realistic</MenuItem>
                            <MenuItem value="Cartoon">Cartoon</MenuItem>
                            <MenuItem value="Cyberpunk">Cyberpunk</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Prompt"
                        multiline
                        rows={4}
                        value={prompt}
                        onChange={(e: any) => setPrompt(e.target.value)}
                        error={Boolean(errors.prompt)}
                        helperText={errors.prompt}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ py: 1.2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
                    </Button>
                </Box>
            </Paper>

            {generations.length > 0 && (
                <Box mt={6} width="100%" maxWidth={900}>
                    <Typography variant="h6" fontWeight={600} mb={3}>
                        🕒 Recent Generations
                    </Typography>

                    <Grid container spacing={3}>
                        {generations.map((gen, idx) => (
                            // @ts-ignore
                            <Grid item xs={12} sm={6} md={4} key={gen.id || idx}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        "&:hover": { boxShadow: 6 },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={gen.imageUrl || "/placeholder.jpg"}
                                        alt={gen.prompt || "Generated Image"}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {gen.prompt}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Style: {gen.style}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(gen.createdAt).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}
