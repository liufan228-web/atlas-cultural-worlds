export const artifacts = [
  {id:'berlin',title:'BERLIN',year:'1994',type:'CITY / WORLD',status:'DOCUMENTED',rights:'ATLAS DEMO',image:'/artifacts/berlin.svg',caption:'A city in transition becomes a cultural laboratory.',source:'Prototype visual — replace with rights-cleared archival material.',x:50,y:48},
  {id:'techno',title:'TECHNO',year:'1990s',type:'MOVEMENT',status:'DOCUMENTED',rights:'ATLAS DEMO',image:'/artifacts/techno.svg',caption:'Sound, space and social infrastructure converge.',source:'Prototype visual — historical claims require source-level citations.',x:27,y:28},
  {id:'tresor',title:'TRESOR',year:'1991—',type:'PLACE',status:'DOCUMENTED',rights:'ATLAS DEMO',image:'/artifacts/tresor.svg',caption:'A club becomes a bridge between Berlin and Detroit.',source:'Prototype visual — replace with licensed or open archival image.',x:63,y:24},
  {id:'flyer',title:'FLYER CULTURE',year:'1991—95',type:'OBJECT / MEDIA',status:'RECONSTRUCTED',rights:'GENERATED',image:'/artifacts/flyer.svg',caption:'Nightlife circulates through paper, photocopy and type.',source:'ATLAS-generated visual reconstruction; not a historical artifact.',x:73,y:61},
  {id:'type',title:'TYPOGRAPHY',year:'20TH C.',type:'VISUAL LANGUAGE',status:'RECONSTRUCTED',rights:'GENERATED',image:'/artifacts/type.svg',caption:'A visual grammar travels across scenes and decades.',source:'ATLAS-generated visual abstraction.',x:40,y:72},
  {id:'bauhaus',title:'BAUHAUS',year:'1919—33',type:'MOVEMENT / SCHOOL',status:'DOCUMENTED',rights:'ATLAS DEMO',image:'/artifacts/bauhaus.svg',caption:'Modernist systems become a distant but legible visual ancestor.',source:'Prototype visual — replace with public-domain/open licensed object.',x:12,y:61},
];

export const relations = [
  {from:'berlin',to:'techno',label:'scene',why:'Post-wall Berlin provided social and spatial conditions in which techno culture rapidly developed.',status:'RECONSTRUCTED'},
  {from:'techno',to:'tresor',label:'performed / circulated',why:'Tresor became one of the emblematic institutions through which Berlin techno was performed and circulated.',status:'DOCUMENTED'},
  {from:'tresor',to:'flyer',label:'announced by',why:'Club culture was made visible and distributed through ephemeral print: flyers, listings and posters.',status:'RECONSTRUCTED'},
  {from:'flyer',to:'type',label:'expressed through',why:'Typography, layout and reproduction techniques gave club communication its visual identity.',status:'RECONSTRUCTED'},
  {from:'type',to:'bauhaus',label:'visual lineage',why:'ATLAS proposes a path through modernist typographic systems rather than a claim of direct influence. This edge must be read as a research hypothesis.',status:'RECONSTRUCTED'},
  {from:'bauhaus',to:'berlin',label:'surprising connection',why:'The route closes by showing how visual systems can reappear in radically different cultural contexts.',status:'RECONSTRUCTED'},
];
