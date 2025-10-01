import { createOpenAI } from '@ai-sdk/openai'
import { env } from '@codebuff/internal/env'

/**
 * Create Ollama provider using OpenAI-compatible API
 * Ollama provides an OpenAI-compatible API endpoint at http://localhost:11434/v1
 */
export const ollama = createOpenAI({
  name: 'ollama',
  apiKey: env.OLLAMA_API_KEY || 'ollama', // Ollama doesn't require an API key, but the SDK needs a value
  baseURL: env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
})
