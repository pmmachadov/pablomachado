import type { NextApiRequest, NextApiResponse } from 'next';

const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_API_URL = 'https://api.moonshot.ai/v1/chat/completions';

// Modelo base de Kimi
const MODEL = 'moonshot-v1-8k';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    console.log('API called with messages count:', messages?.length);
    console.log('API Key exists:', !!KIMI_API_KEY);

    if (!KIMI_API_KEY) {
      console.error('KIMI_API_KEY not found');
      return res.status(500).json({ 
        error: 'API key not configured', 
        details: 'KIMI_API_KEY is missing from environment variables' 
      });
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: 'Messages array is required' 
      });
    }

    console.log('Calling Kimi API with model:', MODEL);

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Kimi API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Error from Kimi API', 
        status: response.status,
        details: errorData 
      });
    }

    const data = await response.json();
    console.log('Kimi API response received');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in chat API:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
}
