'use client'
import {useMemo,useState} from 'react'
import {nodes,edges} from '../data/atlas'
export default function Home(){
 const [selected,setSelected]=useState(nodes[0]); const [query,setQuery]=useState('');
 const related=useMemo(()=>new Set(edges.filter(e=>e[0]===selected.id||e[1]===selected.id).flatMap(e=>[e[0],e[1]])),[selected]);
 const filtered=nodes.filter(n=>n.name.toLowerCase().includes(query.toLowerCase()));
 return <main>
  <header><div className="brand">ATLAS<span>CULTURAL WORLD MODELS</span></div><div className="edition">BERLIN / 1994<br/><small>PROTOTYPE 0.1</small></div></header>
  <section className="hero"><div><p className="eyebrow">EXPLORE A CULTURAL WORLD</p><h1>Culture is not a list.<br/>It is a <i>network.</i></h1></div><p className="intro">Trace how places, objects, people and ideas move through time. Every connection can be explored, questioned and sourced.</p></section>
  <section className="workspace">
   <div className="graph">
    <div className="graphTop"><span>CONSTELLATION</span><span>{nodes.length} ENTITIES / {edges.length} RELATIONS</span></div>
    <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">{edges.map(([a,b],i)=>{let A=nodes.find(n=>n.id===a),B=nodes.find(n=>n.id===b);return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={selected.id===a||selected.id===b?'activeLine':''}/>})}</svg>
    {nodes.map(n=><button key={n.id} onClick={()=>setSelected(n)} className={`node ${selected.id===n.id?'selected':''} ${related.has(n.id)?'related':''}`} style={{left:n.x+'%',top:n.y+'%'}}><b>{n.name}</b><small>{n.type}</small></button>)}
    <div className="hint">CLICK ANY ENTITY TO REORIENT THE WORLD</div>
   </div>
   <aside><p className="meta">{selected.type} · {selected.year||'BERLIN 1994'}</p><h2>{selected.name}</h2><p className="desc">{selected.desc}</p><div className="status"><span></span>{selected.status}</div>
    <div className="actions"><button>WHY</button><button>SOURCE</button><button>EXPLORE</button></div>
    <div className="source"><small>SOURCE LAYER</small><p>{selected.source}</p></div>
    <div className="connections"><small>CONNECTED TO</small>{edges.filter(e=>e[0]===selected.id||e[1]===selected.id).slice(0,5).map((e,i)=>{let id=e[0]===selected.id?e[1]:e[0], n=nodes.find(x=>x.id===id);return <button key={i} onClick={()=>setSelected(n)}>{n.name}<span>↗</span></button>})}</div>
   </aside>
  </section>
  <section className="search"><span>ASK ATLAS</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Berlin 1994 — e.g. techno, photography, flyers"/>{query&&<div className="results">{filtered.map(n=><button key={n.id} onClick={()=>{setSelected(n);setQuery('')}}>{n.name}<span>{n.type}</span></button>)}</div>}</section>
  <footer><span>ATLAS / CULTURAL WORLD MODELS</span><span>WE SHOW WHAT WE KNOW, WHAT WE INFER, AND WHAT WE IMAGINE.</span></footer>
 </main>
}
