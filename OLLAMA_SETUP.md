# Using Ollama with Codebuff

This guide explains how to use local Ollama models with Codebuff, which allows you to run models without consuming credits.

## Setup

### 1. Install Ollama

First, install Ollama on your system:

```bash
# macOS
curl -fsSL https://ollama.ai/install.sh | sh

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download
```

### 2. Pull the Model

Pull the `gpt-oss:20b` model (or any other model you want to use):

```bash
ollama pull gpt-oss:20b
```

### 3. Start Ollama Server

Make sure the Ollama server is running:

```bash
ollama serve
```

By default, Ollama runs on `http://localhost:11434`.

### 4. Configure Codebuff

Add these environment variables to your `.env` file:

```bash
# Ollama Configuration (optional - these are the defaults)
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_API_KEY=ollama
```

If you're running Ollama on a different host or port, update the `OLLAMA_BASE_URL` accordingly.

## Usage

### Using in Agents

To use the Ollama model in your custom agents, set the model in your agent definition:

```typescript
export default {
  id: 'my-agent',
  displayName: 'My Agent',
  model: 'gpt-oss:20b',  // Use the Ollama model
  // ... other configuration
}
```

### Using in CLI

You can specify the Ollama model when running Codebuff:

```bash
codebuff --model gpt-oss:20b
```

### Available Ollama Models

The following Ollama models are configured in Codebuff:

- `gpt-oss:20b` - GPT-OSS 20B parameter model

To add more Ollama models, you can:

1. Pull the model with Ollama: `ollama pull <model-name>`
2. Use the model name directly in Codebuff

## Benefits

- **No Credits Used**: Ollama models run locally and don't consume Codebuff credits
- **Privacy**: Your code and data stay on your machine
- **Offline Usage**: Work without an internet connection
- **Cost-Effective**: Free to use once you have the model downloaded

## Troubleshooting

### Connection Refused

If you see connection errors:

1. Make sure Ollama is running: `ollama serve`
2. Verify the port is correct (default: 11434)
3. Check that the model is pulled: `ollama list`

### Model Not Found

If the model isn't found:

1. Pull the model: `ollama pull gpt-oss:20b`
2. Verify it's available: `ollama list`

### Performance Issues

If the model is slow:

1. Ensure you have enough RAM (20B models need ~16GB)
2. Consider using a smaller model
3. Check CPU/GPU usage

## Adding Custom Ollama Models

To add support for additional Ollama models:

1. Edit `common/src/old-constants.ts` and add the model to `ollamaModels`:

```typescript
export const ollamaModels = {
  gptOss20b: 'gpt-oss:20b',
  yourModel: 'your-model-name',  // Add your model here
} as const
```

2. Update `backend/src/llm-apis/message-cost-tracker.ts` to set the cost to 0:

```typescript
// In TOKENS_COST_PER_M.input, .output, and .cache_read sections:
[models.yourModel]: 0,
```

3. The model will now be available for use without charging credits.
