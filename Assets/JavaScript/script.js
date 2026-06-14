const canvas=document.getElementById('particle-canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[],mouse={x:-1000,y:-1000};
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();
window.addEventListener('resize',resize);
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
class Particle{
  constructor(){this.reset()}
  reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.r=Math.random()*1.5+.5;this.alpha=Math.random()*.5+.1}
  update(){
    this.x+=this.vx;this.y+=this.vy;
    const dx=mouse.x-this.x,dy=mouse.y-this.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<120){this.vx-=dx/d*.04;this.vy-=dy/d*.04}
    if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
  }
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(108,99,255,${this.alpha})`;ctx.fill()}
}
for(let i=0;i<120;i++)particles.push(new Particle());
function drawConnections(){
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
    const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<100){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(108,99,255,${(1-d/100)*.12})`;ctx.lineWidth=.5;ctx.stroke()}
  }
}
function animate(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw()});drawConnections();requestAnimationFrame(animate)}
animate();

const observer=new IntersectionObserver(e=>e.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const fab=document.getElementById('chatFab'),win=document.getElementById('chatWindow'),closeBtn=document.getElementById('chatClose'),msgs=document.getElementById('chatMessages'),input=document.getElementById('chatInput'),send=document.getElementById('chatSend');
let open=false;
fab.addEventListener('click',()=>{open=!open;win.classList.toggle('open',open)});
closeBtn.addEventListener('click',()=>{open=false;win.classList.remove('open')});

const SYSTEM=`You are a friendly, helpful AI assistant embedded in Sujon Ganguly's personal portfolio website. Here is everything you know about Sujon:
NAME: Sujon Ganguly | LOCATION: Kolkata, West Bengal, India | EMAIL: sujonganguly01@gmail.com | PHONE: +91 6291867792 | LINKEDIN: linkedin.com/in/sujon-ganguly-0bb22631a | STATUS: Fresher — available for part-time roles and internships
EDUCATION: Higher Secondary (Class XII), Science Stream — NIOS, 2026, First Division. English: 81, Computer Science: 86.
CERTIFICATIONS: 1) Diploma in Digital Techniques Application — Govt. of West Bengal / HPE India, Apr 2024–Mar 2025, Grade A. Covers MS Office, C, Java OOP, HTML5, MySQL, Cybersecurity. 2) Advanced Excel Assessment — HPE, May 2025, Grade B+. 3) Smart English Beginners — SmartEnglish, Aug 2024, Grade A+. 4) Smart English Advanced — SmartEnglish, Apr 2026, Grade A.
TECHNICAL SKILLS: C, C++, Python, Java, JavaScript, HTML5, CSS3, MySQL, MS Office, Advanced Excel, AI & ML fundamentals, Cybersecurity basics.
SOFT SKILLS: English communication, creative writing, content writing, problem solving, quick learner, team collaboration.
LANGUAGES: Bengali (native), English (proficient), Hindi (conversational).
PROJECTS: Portfolio site (HTML/CSS/JS), Python Problem Solver scripts, Student Record System (Java + MySQL). All WIP.
Be warm, concise, and helpful. If asked about availability: yes, Sujon is actively seeking part-time IT roles and internships.`;

async function sendMsg(){
  const text=input.value.trim();if(!text)return;
  input.value='';
  const uDiv=document.createElement('div');uDiv.className='msg user';uDiv.textContent=text;msgs.appendChild(uDiv);
  const tDiv=document.createElement('div');tDiv.className='chat-typing';tDiv.innerHTML='<span></span><span></span><span></span>';msgs.appendChild(tDiv);
  msgs.scrollTop=msgs.scrollHeight;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,system:SYSTEM,messages:[{role:'user',content:text}]})});
    const data=await res.json();
    tDiv.remove();
    const reply=data.content?.[0]?.text||"I couldn't get a response right now. Try again!";
    const bDiv=document.createElement('div');bDiv.className='msg bot';bDiv.textContent=reply;msgs.appendChild(bDiv);
  }catch(e){
    tDiv.remove();
    const bDiv=document.createElement('div');bDiv.className='msg bot';bDiv.textContent="Sorry, something went wrong. Try again!";msgs.appendChild(bDiv);
  }
  msgs.scrollTop=msgs.scrollHeight;
}
send.addEventListener('click',sendMsg);
input.addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg()});