import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactMarkdown from "react-markdown";

function App() {
  const [code, setCode] = useState("")
  const [bcode,setBcode]= useState("")
  const [style,setStyle]=useState("")
  function cleanMarkdown(text) {
  return text
    .replace(/```[a-zA-Z]*/g, "")  // remove ```jsx or ```ts
    .replace(/```/g, "")           // remove ending fences
    .replace(/^\s*\* /gm, "");     // remove leading * from lists
}
  const handleclick=async ()=>{
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer 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`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(
    {messages: [
        {
            role: "user",
            content: `add ${style} styling to this code: ${code}. Add tailwind css or give a normal css file if the code is html only. Just give the styled code and nothing else.`,
        },
    ],
    model: "openai/gpt-oss-120b:nebius",
})})
.then((res)=>res.json())
.then((res)=>{
  setBcode(res.choices[0].message.content)
  return res
})
.then((res)=>{
if(res){
  console.log("Successful fetch")
}
else{
  console.log("Failed")
}})
}
  return (
  <div className="min-h-screen w-screen flex justify-center bg-gray-900 text-white px-3 sm:px-6">
  <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
    
    <h1
      className="
        text-3xl sm:text-4xl md:text-5xl
        text-center
        font-extrabold
        tracking-wider
        bg-clip-text text-transparent
        bg-gradient-to-r from-fuchsia-400 to-pink-400
        drop-shadow-md
        transition-transform
        duration-300
        hover:scale-105
      "
    >
      Code-Beautifier
    </h1>

    <textarea
      className="
        bg-gray-900 rounded text-white border
        p-2 mt-4
        h-40 sm:h-48 md:h-52
        w-full text-sm sm:text-base
      "
      type="text"
      placeholder="Paste the code here"
      onChange={(e) => setCode(e.target.value)}
    ></textarea>
    <div className='flex justify-around'>
        <div>
          <input type='radio' name="choice" value="modern"  onChange={(e)=>{if(e.target.checked){setStyle(e.target.value)}}}/>
          <span>Modern</span>
        </div>
        <div>
          <input type='radio' name="choice" value="minimalist" onChange={(e)=>{if(e.target.checked){setStyle(e.target.value)}}}/>
          <span>Minimalist</span>
        </div>
        <div>
          <input type='radio' name="choice" value="soft" onChange={(e)=>{if(e.target.checked){setStyle(e.target.value)}}}/>
          <span>Soft</span>
        </div>
        <div>
          <input type='radio' name="choice" value="raw" onChange={(e)=>{if(e.target.checked){setStyle(e.target.value)}}}/>
          <span>Raw</span>
        </div>
    </div>

    <div className="flex justify-center items-center py-4">
      <button
        type="button"
        onClick={handleclick}
        className="
          h-11 w-28
          sm:h-12 sm:w-32
          md:h-14 md:w-36
          rounded-full
          bg-gradient-to-bl from-violet-500 to-fuchsia-500
          hover:from-sky-500 hover:to-sky-700
          text-white font-medium
          shadow-lg
          hover:scale-105 hover:shadow-xl
          transition-all duration-300 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
          disabled:opacity-50 disabled:cursor-not-allowed
          text-sm sm:text-base
        "
      >
        Beautify
      </button>
    </div>

    <pre
      className="
        whitespace-pre-wrap overflow-x-auto
        text-sm sm:text-base
      "
      style={{
        background: "#1e1e1e",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <code>{cleanMarkdown(bcode)}</code>
    </pre>
  </div>
</div>
  )
}

export default App
