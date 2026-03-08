
import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    suppressErrorRendering: true
})

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();

  // Strip markdown ```mermaid ... ``` blocks
  if (clean.startsWith('```mermaid')) {
    clean = clean.replace(/^```mermaid\n?/, '');
  }
  if (clean.endsWith('```')) {
    clean = clean.replace(/```$/, '');
  }
  
  clean = clean.trim();

  // Determine if it already starts with a valid Mermaid keyword
  const validKeywords = ["graph", "flowchart", "sequenceDiagram", "classDiagram", "stateDiagram", "erDiagram", "gantt", "pie", "journey", "gitGraph", "mindmap", "timeline"];
  const hasKeyword = validKeywords.some(keyword => clean.startsWith(keyword));

  if (!hasKeyword) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

function MermaidSetup({diagram}) {
const containerRef = useRef(null)

useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const safeChart = cleanMermaidChart(diagram);
        console.log("Rendering Mermaid Chart:", safeChart);

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid diagram is invalid:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div class="text-red-500 p-4 border border-red-200 rounded-md bg-red-50 flex items-center gap-2">
            ⚠️ <span>The AI generated an invalid diagram format. Try regenerating!</span>
          </div>`;
        }
      }
    };

    renderDiagram();
  }, [diagram]);




  return (
    <div className='bg-white border rounded-lg p-4 overflow-x-auto'>
      <div ref={containerRef}/>
    </div>
  )
}

export default MermaidSetup
