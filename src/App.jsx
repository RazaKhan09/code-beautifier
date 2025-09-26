import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactMarkdown from "react-markdown";

function App() {
  const [code, setCode] = useState("")
  const [bcode,setBcode]= useState("")
  const [style,setStyle]=useState("")
  const [file,setFile]= useState("")
  const [copied,setCopied]=useState(false)
  const divref=useRef();
  function cleanMarkdown(text) {
  return text
    .replace(/```[a-zA-Z]*/g, "")  // remove ```jsx or ```ts
    .replace(/```/g, "")           // remove ending fences
    .replace(/^\s*\* /gm, "");     // remove leading * from lists
}
function handlecopy(){
  navigator.clipboard.writeText(bcode)
  .then(()=>{
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  })
}
  const handleclick=async ()=>{
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(
    {messages: [
        {
            role: "user",
            content: `You are a code beautifier.

INPUT CODE:
${code}

REQUIREMENTS:
- Styling type: ${file}
- Style theme: ${style}

RULES:
1. If styling type is "TailwindCSS":
   - Return the SAME code with Tailwind CSS classes applied.
   - Apply the chosen theme (${style}) to control color palette, spacing, shadows, borders, and hover effects.
   - If the code is React/JSX, return JSX with Tailwind classes. If plain HTML, return HTML with Tailwind classes.

2. If styling type is "CSS":
   - Keep the original HTML structure unchanged.
   - Return only an external CSS stylesheet that applies the chosen theme (${style}).
   - Do NOT include <style> tags.

3. If style is "raw":
   - Return the input code exactly as provided, without changes.

OUTPUT RULES:
- Do NOT wrap the answer in Markdown backticks.
- Do NOT add explanations or comments.
- Return only the final styled code.
`,
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
  // divref.current.style.display="flex"
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
    <div className="flex justify-around p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <input
          value="CSS"
          type="radio"
          name="file"
          onChange={(e) => {
            if (e.target.checked) {
            setFile(e.target.value);
            }
          }}
        className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      <span className="text-sm text-gray-800">CSS</span>
    </div>
  <div className="flex items-center space-x-2">
    <input
      value="TailwindCSS"
      type="radio"
      name="file"
      onChange={(e) => {
        if (e.target.checked) {
          setFile(e.target.value);
        }
      }}
      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
    />
    <span className="text-sm text-gray-800">TailwindCSS</span>
  </div>
</div>

<div className="flex justify-around p-4 bg-white rounded-lg shadow-md mt-4">
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      name="choice"
      value="modern"
      onChange={(e) => {
        if (e.target.checked) {
          setStyle(e.target.value);
        }
      }}
      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
    />
    <span className="text-sm text-gray-800">Modern</span>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      name="choice"
      value="minimalist"
      onChange={(e) => {
        if (e.target.checked) {
          setStyle(e.target.value);
        }
      }}
      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
    />
    <span className="text-sm text-gray-800">Minimalist</span>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      name="choice"
      value="soft"
      onChange={(e) => {
        if (e.target.checked) {
          setStyle(e.target.value);
        }
      }}
      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
    />
    <span className="text-sm text-gray-800">Soft</span>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      name="choice"
      value="raw"
      onChange={(e) => {
        if (e.target.checked) {
          setStyle(e.target.value);
        }
      }}
      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
    />
    <span className="text-sm text-gray-800">Raw</span>
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
        disabled={style==="" || file==="" || code===""}
      >
        Beautify
      </button>
    </div>
    <div className='flex justify-between hidden' style={{
        background: "#1e1e1e",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        display: bcode===""?"none":"flex"
      }}
      ref={divref}
      >
        <span className='text-xl'>{file}</span>
        <button className='border rounded p-0.5' onClick={handlecopy}>{copied==false?"Copy Code":"Copied"}</button>
    </div>
    <div className='h-px bg-white' style={{display: bcode===""?"none":"block"}}></div>
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
        display: bcode===""?"none":"block"
      }}
    >
      <code>{cleanMarkdown(bcode)}</code>
    </pre>
  </div>
</div>
  )
}

export default App
