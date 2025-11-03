import path from "path";
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { pool } from "../config/db";
import { ENV } from "../config/env";


interface GenerationInput {
    userId: number;
    prompt: string;
    style?: string;
    imageUpload?: Express.Multer.File;
}

export const imageGenerationService = async ({ userId, prompt, style, imageUpload }: GenerationInput) => {

    // --- Simulate network delay response with ~1-2 seconds ---
    const delay = Math.floor(Math.random() * 1000) + 1000;
    await new Promise((res) => setTimeout(res, delay));

    // --- Simulate 20% failure chances ---
    if (Math.random() < 0.2) {
        throw new Error("Model Overloaded")
    }
    
    // --- Image Upload Fn ---
    let imageUrl: string | null = null;

    if (!imageUpload || !imageUpload.buffer) {
        throw new Error("Image file missing or invalid");
    }

    if (imageUpload) {
        const uploadDir = path.join(__dirname, '../assets/uploads')

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileExt = path.extname(imageUpload.originalname);
        const fileName = `${uuidv4()}${fileExt}`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, imageUpload.buffer)

        imageUrl = `${ENV.BASE_URL || 'http://localhost:5000'}/uploads/${fileName}`
    }

    // database query
    const query = `INSERT INTO generations (user_id, prompt, style, image_url, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const values = [userId, prompt, style || null, imageUrl, "success"]
    const {rows} = await pool.query(
        query,
        values
    );
    return rows[0];
}

export const getUserGenerations = async (userId: number, limit: number) => {

    const delay = Math.floor(Math.random() * 1000) + 500;
    await new Promise((res) => setTimeout(res, delay))

    const query = `
        SELECT id, prompt, style, image_url AS "imageUrl", created_at AS "createdAt", status FROM generations WHERE user_id = $1 ORDER by created_at DESC LIMIT $2
    `
    const {rows} = await pool.query(query, [userId, limit]);
    return rows;
}