'use client'
import {useMemo,useState} from 'react'
import {nodes,edges} from '../data/atlas'

const byId=id=>nodes.find(n=>n.id===id)
function neighborhood(root){
 const one=edges.filter(e=>e.source===root||e.target===root).map(e=>e.source===root?e.target:e.source)
 const two=[...new Set(one.flatMap(id=>edges.filter(e=>e.source===id||e.target===id).map(e=>e.source===id?e.target:e.source)))]
 return {one:[...new Set(one)],two:two.filter(id=>id!==root&&!one.includes(id))}
}
function layout(root){
 const {one,two}=neighborhood(root), pos={[root]:{x:50,y:50}}
 const ring=(ids,radius,offset=0)=>ids.forEach((id,i)=>{let a=(Math.PI*2*i/Math.max(ids.length,1))+offset;pos[id]={x:50+Math.cos(a)*radius,y:50+Math.sin(a)*radius*.72}})
 ring(one,27,-Math.PI/2); ring(two.slice(0,14),43,-Math.PI/2+.18)
 nodes.filter(n=>!pos[n.id]).forEach((n,i)=>{let a=Math.PI*2*i/Math.max(nodes.length-one.length-two.length-1,1);pos[n.id]={x:50+Math.cos(a)*48,y:50+Math.sin(a)*47}})
 return pos
}
export default function Home(){
 const [selected,setSelected]=useState('berlin'),[panel,setPanel]=useState('overview'),[query,setQuery]=useState('')
 const current=byId(selected), positions=useMemo(()=>layout(selected),[selected]), near=useMemo(()=>neighborhood(selected),[selected])
 const visible=new Set([selected,...near.one,...near.two.slice(0,14)])
 const connected=edges.filter(e=>e.source===selected||e.target===selected)
 const filtered=query?nodes.filter(n=>(n.name+' '+n.type+' '+n.desc).toLowerCase().includes(query.toLowerCase())).slice(0,8):[]
 const choose=id=>{setSelected(id);setPanel('overview')}
 return <main>
  <header><div className="brand">ATLAS<span>CULTURAL WORLD MODELS</span></div><div className="edition">BERLIN / 1989—1995<br/><small>PROTOTYPE 0.2</small></div></header>
  <section className="hero"><div><p className="eyebrow">EXPLORE A CULTURAL WORLD</p><h1>Culture is not a list.<br/>It is a <i>network.</i></h1></div><p className="intro">Move through a city by relation rather than category. Select any entity and the cultural world reorganizes around it.</p></section>
  <section className="workspace">
   <div className="graph">
    <div className="graphTop"><span>CONSTELLATION / FOCUS: {current.name}</span><span>{nodes.length} ENTITIES / {edges.length} RELATIONS</span></div>
    <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">{edges.map(e=>{let A=positions[e.source],B=positions[e.target],on=e.source===selected||e.target===selected,show=visible.has(e.source)&&visible.has(e.target);return show?<line key={e.id} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={on?'activeLine':''}/>:null})}</svg>
    {nodes.map(n=>{let p=positions[n.id],level=n.id===selected?'selected':near.one.includes(n.id)?'related':visible.has(n.id)?'second':'hidden';return <button aria-label={n.name} key={n.id} onClick={()=>choose(n.id)} className={`node ${level}`} style={{left:p.x+'%',top:p.y+'%'}}><b>{n.name}</b><small>{n.type}</small></button>})}
    <div className="legend"><span><i className="dot documented"/>DOCUMENTED</span><span><i className="dot reconstructed"/>RECONSTRUCTED</span></div>
    <div className="hint">SELECT AN ENTITY · THE WORLD REORIENTS AROUND IT</div>
   </div>
   <aside>
    <p className="meta">{current.type} · {current.year}</p><h2>{current.name}</h2><p className="desc">{current.desc}</p><div className={`status ${current.status.toLowerCase()}`}><span></span>{current.status}</div>
    <div className="actions"><button className={panel==='why'?'on':''} onClick={()=>setPanel('why')}>WHY</button><button className={panel==='source'?'on':''} onClick={()=>setPanel('source')}>SOURCE</button><button className={panel==='overview'?'on':''} onClick={()=>setPanel('overview')}>EXPLORE</button></div>
    {panel==='overview'&&<><div className="source"><small>CONTEXT</small><p>{connected.length} direct relations in the current cultural graph. Choose a connected entity to continue through the world.</p></div><div className="connections"><small>CONNECTED TO</small>{connected.slice(0,7).map(e=>{let id=e.source===selected?e.target:e.source,n=byId(id);return <button key={e.id} onClick={()=>choose(id)}><span><b>{n.name}</b><em>{e.relation}</em></span><strong>↗</strong></button>})}</div></>}
    {panel==='why'&&<div className="evidence"><small>RELATION PATHS</small>{connected.slice(0,5).map(e=>{let n=byId(e.source===selected?e.target:e.source);return <div key={e.id}><p className="path">{current.name} <i>→ {e.relation} →</i> {n.name}</p><p>{e.why}</p></div>})}</div>}
    {panel==='source'&&<div className="evidence"><small>SOURCE LAYER</small><p>{current.source}</p><div className="sourceCard"><span>ATLAS STATUS</span><b>{current.status}</b><p>{current.status==='DOCUMENTED'?'This entity is grounded in public historical record. Precise archival citations are the next research layer.':'This entity is an ATLAS synthesis derived from documented context. It must remain visibly distinct from direct historical fact.'}</p></div></div>}
   </aside>
  </section>
  <section className="search"><span>ASK / SEARCH ATLAS</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try: Detroit, typography, club fashion, temporary space…"/>{query&&<div className="results">{filtered.map(n=><button key={n.id} onClick={()=>{choose(n.id);setQuery('')}}><b>{n.name}</b><span>{n.type} · {n.year}</span></button>)}</div>}</section>
  <footer><span>ATLAS / CULTURAL WORLD MODELS</span><span>WHAT WE KNOW · WHAT WE INFER · WHAT WE IMAGINE</span></footer>
 </main>
}
