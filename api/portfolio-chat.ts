import {
  buildLocalPortfolioAnswer,
  retrievePortfolioKnowledge,
  suggestedPortfolioQuestions,
} from '../src/data/portfolioKnowledge';

type ChatMode = 'general' | 'role_match' | 'project_recommendation';

type ChatRequest = {
  message?: string;
  mode?: ChatMode;
  selectedRole?: string;
};

const json = (res: any, status: number, body: unknown) => {
  if (typeof res.status === 'function') {
    res.status(status);
  } else {
    res.statusCode = status;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

const readBody = async (req: any): Promise<ChatRequest> => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
};

const extractOutputText = (payload: any) => {
  if (typeof payload?.output_text === 'string') return payload.output_text;

  const parts: string[] = [];
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === 'string') parts.push(content.text);
    }
  }

  return parts.join('\n').trim();
};

const inferSuggestedQuestions = (mode: ChatMode, selectedRole?: string) => {
  if (mode === 'role_match' && selectedRole) {
    return [
      `Which projects best support ${selectedRole}?`,
      `What skills should I notice for ${selectedRole}?`,
      'What should I review first?',
    ];
  }

  if (mode === 'project_recommendation') {
    return [
      'Which project shows production AI skills?',
      'Which project shows backend depth?',
      'Which project shows data engineering?',
    ];
  }

  return suggestedPortfolioQuestions;
};

const buildPrompt = ({
  message,
  selectedRole,
  contextBlocks,
}: {
  message: string;
  selectedRole?: string;
  contextBlocks: ReturnType<typeof retrievePortfolioKnowledge>;
}) => {
  const context = contextBlocks
    .map(({ item }, index) => {
      return [
        `Source ${index + 1}: ${item.title}`,
        `Section: ${item.section}`,
        `Href: ${item.href}`,
        `Role tags: ${item.roleTags.join(', ')}`,
        `Skill tags: ${item.skillTags.join(', ')}`,
        `Summary: ${item.summary}`,
        `Details: ${item.details.join(' ')}`,
      ].join('\n');
    })
    .join('\n\n');

  return [
    selectedRole ? `Selected role: ${selectedRole}` : 'Selected role: not specified',
    `Recruiter question: ${message}`,
    'Portfolio context:',
    context,
    'Write a concise, recruiter-friendly answer in 2-4 short paragraphs or bullets. Mention only facts supported by the context. If the context does not support an answer, say that the portfolio does not provide enough evidence. Do not invent links, companies, metrics, or claims.',
  ].join('\n\n');
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  let body: ChatRequest;
  try {
    body = await readBody(req);
  } catch {
    return json(res, 400, { error: 'Invalid JSON body' });
  }

  const message = String(body.message || '').trim();
  const mode = body.mode || 'general';
  const selectedRole = body.selectedRole?.trim();

  if (!message) {
    return json(res, 400, { error: 'Message is required' });
  }

  if (message.length > 900) {
    return json(res, 400, { error: 'Please keep the question under 900 characters.' });
  }

  const matches = retrievePortfolioKnowledge(message, { mode, selectedRole, limit: 7 });
  const citations = matches.slice(0, 4).map(({ item }) => ({
    label: item.title,
    href: item.href,
  }));
  const matchedTopics = [...new Set(matches.flatMap(({ item }) => [...item.roleTags, ...item.skillTags]).slice(0, 10))];
  const suggestedQuestions = inferSuggestedQuestions(mode, selectedRole);

  if (matches.length === 0) {
    return json(res, 200, {
      answer:
        "I don't have enough portfolio evidence to answer that confidently. Try asking about Taran's AI projects, ML systems, experience, education, research, or relocation.",
      citations: [],
      matchedTopics: [],
      suggestedQuestions,
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(res, 503, {
      error: 'AI backend is not configured.',
      fallback: {
        answer: buildLocalPortfolioAnswer(message, matches, { selectedRole }),
        citations,
        matchedTopics,
        suggestedQuestions,
      },
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        instructions:
          'You are Ask Taran AI, a portfolio assistant for recruiters. Answer only from the supplied portfolio context. Be specific, concise, honest, and cite relevant portfolio sections conceptually without markdown footnote syntax.',
        input: buildPrompt({ message, selectedRole, contextBlocks: matches }),
        max_output_tokens: 700,
      }),
    });

    const payload: any = await response.json();
    if (!response.ok) {
      return json(res, 502, {
        error: payload?.error?.message || 'OpenAI request failed.',
        fallback: {
          answer: buildLocalPortfolioAnswer(message, matches, { selectedRole }),
          citations,
          matchedTopics,
          suggestedQuestions,
        },
      });
    }

    const answer = extractOutputText(payload) || buildLocalPortfolioAnswer(message, matches, { selectedRole });

    return json(res, 200, {
      answer,
      citations,
      matchedTopics,
      suggestedQuestions,
    });
  } catch {
    return json(res, 502, {
      error: 'AI service is temporarily unavailable.',
      fallback: {
        answer: buildLocalPortfolioAnswer(message, matches, { selectedRole }),
        citations,
        matchedTopics,
        suggestedQuestions,
      },
    });
  }
}
