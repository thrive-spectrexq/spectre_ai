# Spectre Ai Assistant

A webui AI chatbot that request for your google gemini api key and then answers your questions according your prompt.

Access the webui from: [Spectre_AI](spectre-ai-pi.vercel.app)

A python cli chatbot that implements a voice-assisted conversational AI `chat.py`. The script leverages various libraries and Google's Gemini Pro 1.5 to create an engaging and interactive user experience.

## Setup Instructions

### Installation

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/thrive_spectrexq/spectre_ai.git
    cd spectre_ai
    ```

2. **Create and Activate a Virtual Environment:**

    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Required Packages:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Set Up Environment Variables:**
    Create a `.env` file in the root directory and add your Google API key:

    ```sh
    GOOGLE_API_KEY=your_google_api_key
    ```

5. **Download NLTK Data:**
   - The required NLTK data will be downloaded automatically when the scripts are run.

### Running the Scripts

#### Running `chat.py`

`chat.py` is a CLI-based interactive assistant. To run the script:

```bash
python chat.py
```

## Logging

The chat.py script is configured to log interactions and errors. Logs are written to the console and can be reviewed for debugging purposes.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements.

## License

These scripts are licensed under the [MIT License](LICENSE).

---
