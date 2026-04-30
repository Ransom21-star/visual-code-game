declare const process: {
  env: {
    SERPER_API_KEY?: string;
    GEMINI_API_KEY?: string;
  };
};

const SERPER_SEARCH_URL = 'https://google.serper.dev/search';
const GEMINI_MODEL = 'gemini-1.5-flash';

function createGeminiPrompt(topic: string, awareness: string, context: string, searchResults: any[]) {
  return `You are AEON, a highly evolved life system. A user is building a sovereign lifestyle in the category of ${topic}. Their awareness level is ${awareness}. Use the live video search results below to select the single most relevant YouTube video recommendation for this exact moment.

Context: ${context}

Search results:
${searchResults
    .map(
      (result, index) =>
        `${index + 1}. ${result.title || 'Untitled'} — ${result.link || result.url || ''} — ${result.snippet || result.description || ''}`
    )
    .join('\n')}

Return a JSON object with keys title, url, channel, and why. Keep it concise.`;
}

function buildVideoResponse(data: any) {
  if (!data?.output?.[0]?.content) return null;
  const text = data.output[0].content;
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (error) {
    return null;
  }
  return null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { topic, awareness, context } = req.body || {};
  const serperKey = (globalThis as any).process?.env?.SERPER_API_KEY;
  const geminiKey = (globalThis as any).process?.env?.GEMINI_API_KEY;

  if (!serperKey || !geminiKey) {
    res.status(200).json({
      title: 'Unable to build recommendation',
      url: '#',
      channel: 'AEON',
      why: 'SERPER_API_KEY and GEMINI_API_KEY must both be configured on the server.',
    });
    return;
  }

  try {
    const searchResponse = await fetch(SERPER_SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': serperKey,
      },
      body: JSON.stringify({ q: `${topic} ${awareness} level best YouTube video`, num: 6 }),
    });

    if (!searchResponse.ok) {
      throw new Error('Serper search failed');
    }

    const searchData = await searchResponse.json();
    const results = searchData?.video_results || searchData?.organic || [];
    const prompt = createGeminiPrompt(topic, awareness, context, results);

    const geminiResponse = await fetch(`https://gemini.googleapis.com/v1/models/${GEMINI_MODEL}:generate?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: { text: prompt }, temperature: 0.72, maxOutputTokens: 360 }),
    });

    if (!geminiResponse.ok) {
      throw new Error('Gemini selection failed');
    }

    const geminiData = await geminiResponse.json();
    const recommendation = buildVideoResponse(geminiData);

    if (recommendation) {
      res.status(200).json(recommendation);
      return;
    }

    res.status(200).json({
      title: 'AEON could not parse the best video',
      url: '#',
      channel: 'AEON',
      why: 'The response could not be extracted. Please retry later.',
    });
  } catch (error) {
    console.error('Video recommendation failed', error);
    res.status(200).json({
      title: 'Video recommendation unavailable',
      url: '#',
      channel: 'AEON',
      why: 'A server error occurred while generating your learning path recommendation.',
    });
  }
}
