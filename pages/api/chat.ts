import type { NextApiRequest, NextApiResponse } from 'next';

const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// Modelos disponibles de Kimi (Moonshot)
// moonshot-v1-8k, moonshot-v1-32k, moonshot-v1-128k
// kimi-k2-5 (si está disponible)
const MODEL = 'moonshot-v1-8k';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!KIMI_API_KEY) {
      console.error('KIMI_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'API key not configured', details: 'KIMI_API_KEY is missing' });
    }

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
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in chat API:', error);
    return res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}
