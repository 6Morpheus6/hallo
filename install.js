module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/cocktailpeanut/hallo app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          xformers: true,   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install gradio==5.34.2 devicetorch",
          "{{platform === 'darwin' ? 'pip install eva-decord' : 'pip install decord'}}",
          "uv pip install -r ../requirements.txt",
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "fudan-generative-ai/hallo" ],
        "exclude": "*.md",
        "local-dir": "pretrained_models",
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
