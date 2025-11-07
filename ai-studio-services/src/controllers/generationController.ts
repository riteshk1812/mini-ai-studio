import { z } from 'zod';

import { getUserGenerations, imageGenerationService } from '../services/generationService';
import { IApiController, IMiddlewareParams } from '../types/types';

const getGenerationSchemas = z.object({
  query: z.object({
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((num) => !isNaN(num) && num <= 5, {
        message: 'Limit must be between 1 and 5',
      })
      .optional(),
  }),
});

export const promptGenerationContoller: Pick<IApiController, 'get' | 'post'> = {

  post: async function ({ req, res }: IMiddlewareParams): Promise<void> {
    try {
      const { prompt, style } = req.body;
      const user = (req as any).user;
      const imageUpload = (req as any).file;

      if (!user) {
        res.status(401).json({ message: 'Unauthorized, please login!!' });
        return;
      }

      if (!prompt) {
        res.status(400).json({ message: 'Prompt is required!!' });
        return;
      }

      const result = await imageGenerationService({
        userId: user.id,
        prompt,
        style,
        imageUpload,
      });
      res.status(201).json({
        success: true,
        message: 'Prompt generated successfully',
        data: result,
      });
      return;
    } catch (error: any) {
      if (res.headersSent) return;

    if (error.message === "Model Overloaded") {
      res.status(429).json({ message: "Model Overloaded" });
      return;
    }

    console.error("Error fetching generations list:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
    }
  },

  get: async function ({ req, res }: IMiddlewareParams): Promise<void> {
    try {
      const parsedSchemas = getGenerationSchemas.safeParse({ query: req.query });

      if (!parsedSchemas.success) {
        console.log('error;', parsedSchemas);
        const err = parsedSchemas.error?.issues?.[0]?.message || 'Invalid query parameters';
        res.status(400).json({ success: false, error: err });
        return;
      }

      const user = (req as any).user?.id;

      if (!user) {
        res.status(401).json({ message: 'Unauthorized, please login!!' });
        return;
      }

      const limit = parsedSchemas.data.query.limit || 5;

      const generations = await getUserGenerations(user, limit);

      if (generations.length === 0) {
        res.status(200).json({ message: 'No generations found', generations: [] });
        return;
      }

    res.status(200).json({
        message: `Last ${limit} generations fetched successfully`,
        count: generations.length,
        generations,
      });
      return;
    } catch (error) {
      console.error(`Error fetching generations list: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};