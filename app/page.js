'use client';
import {useMemo,useState} from 'react';
import {artifacts,relations} from '../data/atlas';

const byId = Object.fromEntries(artifacts.map(a=>[a.id,a]));

export default function Page(){
 const [active,setActive]=useState('berlin');
 const [trail,setTrail]=useState(['berlin']);
 const [panel,setPanel]=useState('WHY');
 const [zoom,setZoom]=useState(0);
 const item=byId[active];
 const related=relations.filter(r=>r.from===active||r.to===active);
 const nextSurprise = active==='bauhaus'?'berlin':(related[0] ? byId[related[0].from===active?related[0].to:related[0].from] : byId.berlin);
 const visible=useMemo(()=>artifacts.map((a,i)=>({...a,dx:(a.x-50)*(1+zoom*.22),dy:(a.y-50)*(1+zoom*.22),scale:a.id===active?1.18:1})),[active,zoom]);
 function visit(id){setActive(id);setTrail(t=>t[t.length-1]===id?t:[...t,id].slice(-8));setPanel('WHY');}
 function takeMe(){const idx=artifacts.findIndex(a=>a.id===active); visit(artifacts[(idx+1)%artifacts.length].id);}
 return <main>
  <header><div className="brand">ATLAS <span>/ CULTURAL WORLD MODELS</span></div><div>VISUAL PROTOTYPE 0.3</div></header>
  <section className="intro"><div><p className="eyebrow">BERLIN / CULTURAL ROUTE 01</p><h1>Explore how<br/>culture connects.</h1></div><div className="manifesto">Start with something you know.<br/><b>End somewhere you never expected.</b><br/><button onClick={takeMe}>TAKE ME SOMEWHERE ↗</button></div></section>

  <section className="universe">
   <div className="hud"><span>FAR</span><input aria-label="semantic zoom" type="range" min="0" max="2" step="1" value={zoom} onChange={e=>setZoom(+e.target.value)}/><span>CLOSE</span><b>SEMANTIC ZOOM {zoom+1}/3</b></div>
   <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">{relations.map((r,i)=>{const a=byId[r.from],b=byId[r.to];return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={(r.from===active||r.to===active)?'hot':''}/>})}</svg>
   {visible.map((a,i)=><button key={a.id} onClick={()=>visit(a.id)} className={'artifact '+(a.id===active?'active ':'')+(a.id===nextSurprise.id?'surprise ':'')} style={{left:`${50+a.dx}%`,top:`${50+a.dy}%`,transform:`translate(-50%,-50%) scale(${a.scale})`,zIndex:a.id===active?8:2}}>
      <img src={a.image} alt=""/><span className="artifactMeta"><b>{a.title}</b><small>{a.year} · {a.type}</small></span>{a.id===nextSurprise.id&&a.id!==active?<em>WHY IS THIS HERE?</em>:null}
   </button>)}
   <div className="worldLabel"><small>YOU ARE HERE</small><strong>{item.title}</strong><span>{item.year}</span></div>
  </section>

  <section className="inspector">
   <div className="heroArtifact"><img src={item.image} alt=""/><span className={'badge '+item.status.toLowerCase()}>{item.status}</span><span className="rights">{item.rights}</span></div>
   <div className="info"><p className="eyebrow">{item.type} / {item.year}</p><h2>{item.title}</h2><p className="caption">{item.caption}</p><nav>{['WHY','SOURCE','EXPLORE'].map(x=><button className={panel===x?'selected':''} onClick={()=>setPanel(x)} key={x}>{x}</button>)}</nav>
    {panel==='WHY'&&<div className="panel"><p className="panelTitle">WHY IT CONNECTS</p>{related.map((r,i)=><button className="relation" key={i} onClick={()=>visit(r.from===active?r.to:r.from)}><span>{r.from===active?byId[r.to].title:byId[r.from].title}</span><b>{r.label} ↗</b><small>{r.why}</small></button>)}</div>}
    {panel==='SOURCE'&&<div className="panel source"><p className="panelTitle">PROVENANCE / RIGHTS</p><p>{item.source}</p><dl><dt>Knowledge status</dt><dd>{item.status}</dd><dt>Visual rights</dt><dd>{item.rights}</dd><dt>Prototype rule</dt><dd>Never infer reuse rights from availability. Verify object-level rights before publishing archival media.</dd></dl></div>}
    {panel==='EXPLORE'&&<div className="panel"><p className="panelTitle">CONNECTED WORLDS</p>{related.map((r,i)=>{const id=r.from===active?r.to:r.from;return <button className="explore" onClick={()=>visit(id)} key={i}><img src={byId[id].image} alt=""/><span>{byId[id].title}<small>{r.label}</small></span><b>↗</b></button>})}</div>}
   </div>
  </section>

  <section className="journey"><div><p className="eyebrow">YOUR JOURNEY</p><h3>{trail.length} cultural stops</h3></div><div className="filmstrip">{trail.map((id,i)=><button key={i} onClick={()=>setActive(id)}><img src={byId[id].image} alt=""/><span>{String(i+1).padStart(2,'0')} {byId[id].title}</span></button>)}</div><button className="save" onClick={()=>alert('Journey saved — prototype interaction')}>SAVE JOURNEY</button></section>
  <footer><span>ATLAS 0.3</span><span>LOOK → NOTICE → APPROACH → ENTER → EMERGE SOMEWHERE ELSE</span><span>© PROTOTYPE</span></footer>
 </main>
}
