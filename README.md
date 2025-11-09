# 💻 RAGnosis Frontend  

*AI-Powered Medical Diagnosis Assistant — Frontend built for the RAGnosis backend*  

![RAGnosis Banner](https://img.shields.io/badge/AI%20Healthcare-RAGnosis-dc2626?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Overview  

The **RAGnosis Frontend** is a sleek web interface for interacting with the **RAGnosis FastAPI backend**.  
It allows users to chat with an AI-powered medical assistant that combines **Cohere LLMs** and **Neo4j Knowledge Graphs** to suggest possible medical insights based on user symptoms.  

---

## 🧩 Tech Stack  

| Layer        | Technology             |
|--------------|------------------------|
| **Frontend** | HTML, CSS, JavaScript  |
| **Backend**  | FastAPI (Python)       |
| **Deployment** | Vercel               |
| **API Integration** | Cohere + Neo4j (via backend) |

---

## 🧠 Features  

✅ Real-time chat interface for doctor–patient simulation  
✅ Smooth API integration with FastAPI backend  
✅ Responsive design for desktop and mobile  
✅ Secure communication via HTTPS (Vercel-hosted)  

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the Repository  
bash
git clone https://github.com/yourusername/ragnosis-frontend.git
cd ragnosis-frontend

2️⃣ Configure the Backend API URL

In your script.js (or .env if you’re using a build setup):

const BACKEND_URL = "https://ragnosis.vercel.app";


This should match your FastAPI backend URL on Vercel.

🧪 Run Locally

If your project uses plain HTML/CSS/JS:

# Just open index.html in your browser


If using a local server (recommended for API calls):

npx live-server


or

python -m http.server 8080


Then open http://localhost:8080

🌐 Deployment on Vercel

Push your frontend code to GitHub.

Go to https://vercel.com
 → New Project.

Import your GitHub repo.

Click Deploy — that’s it! 🚀

Vercel will automatically assign a public domain, for example:

https://ragnosis-frontend.vercel.app


If you want, you can rename it under Settings → General → Project Name, e.g.

https://ragnosis.vercel.app

🔗 Backend Connection

Ensure your backend is deployed and running at:

https://ragnosis.vercel.app


Your frontend makes requests like:

const response = await fetch(`${BACKEND_URL}/predict`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: userInput,
    conversation: conversationHistory
  })
});

🧠 Example

User: “I have a sore throat and fever.”
AI: “Do you also experience difficulty swallowing or body aches?”

⚠️ Disclaimer

RAGnosis is designed for educational and research purposes only.
It should not be used as a replacement for professional medical advice or diagnosis.

👩‍💻 Contributor

Sai Deepak — Frontend Developer & Designer

📄 License

MIT License © 2025 RAGnosis Team
You may freely use, modify, and distribute this project for learning and research.
