# 🍽️ Chef Claude

Chef Claude is an AI-powered recipe generator web application that allows users to input the ingredients they have and get a complete, AI-generated recipe in response. The application includes **secure authentication** with Auth0, **real-time AI integration** using Groq, and **persistent recipe storage** for each user.

---

## 🚀 Features

- 🔐 **Secure authentication using Auth0**
- 🤖 **AI-powered recipe generation** using Groq’s Llama 3.1 model
- 🧠 Recipe generation based on user-provided ingredients
- 📌 **Auto-saving of generated recipes** into a user-specific history
- 🗑️ Users can delete recipes from their history
- ⚡ Real-time interactive UI with ingredient management

---

## 📌 Demo

Add a link to your deployment or video demo here:


🌐 **Live App:** https://chef-claude-8zk2.vercel.app/

---

## 🧠 How it Works

1. The user logs in using Auth0.
2. The user enters their available ingredients.
3. The frontend sends the ingredients to the backend API.
4. The backend calls the Groq AI model to generate a structured recipe.
5. The recipe is stored in the database and displayed in the sidebar.
6. Users can view, and delete saved recipes.

---

## 🧩 Tech Stack

**🛠️ Backend:**  
- Node.js  
- Express.js  
- Auth0 for authentication  
- Groq AI integration  
- MongoDB with Mongoose ODM

**💻 Frontend:**  
- React.js  
- React Context / State Management  
- Auth0 React SDK

**📦 Other Tools:**  
- Axios for API calls  
- Lucide icons for UI

