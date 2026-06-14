export function initChatbot() {
  const fab = document.getElementById('chatFab');
  const win = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const msgs = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const toggleMenuBtn = document.getElementById('toggleMenuBtn');
  const presetMenu = document.getElementById('presetMenu');

  if (!fab) return;

  let open = false;

  // Knowledge base
  const kb = {
    name: 'Sujon Ganguly',
    location: 'Kolkata, West Bengal, India',
    email: 'sujonganguly01@gmail.com',
    phone: '+91 6291867792',
    availability: 'Yes, actively seeking part-time IT roles and internships',
    education: 'Higher Secondary (Class XII, Science) — NIOS 2026, First Division. Computer Science: 86',
    certifications: [
      'Diploma in Digital Techniques Application (HPE/Govt WB, Apr2024-Mar2025, Grade A)',
      'Advanced Excel Assessment (HPE, May2025, Grade B+)',
      'Smart English Beginners (Aug2024, Grade A+)',
      'Smart English Advanced (Apr2026, Grade A)'
    ],
    skills: [
      'C',
      'C++',
      'Python',
      'Java',
      'JavaScript',
      'HTML5',
      'CSS3',
      'MySQL',
      'MS Office',
      'Advanced Excel',
      'AI & ML basics',
      'Cybersecurity'
    ],
    softSkills: ['English communication', 'Creative writing', 'Content writing', 'Problem solving', 'Team collaboration'],
    languages: ['Bengali (native)', 'English (proficient)', 'Hindi (conversational)'],
    projects: [
      'Personal Portfolio Site (HTML/CSS/JS)',
      'Python Problem Solver',
      'Student Record System (Java+MySQL)'
    ]
  };

  // Response patterns
  const responses = {
    'about|who|name|introduce|yourself': `Hi! I'm Sujon Ganguly's portfolio assistant. 🎯\n\nSujon is a motivated fresher from Kolkata with a strong foundation in programming, web development, and AI exploration. He completed his Higher Secondary (Science, 2026) and holds a Government-certified Diploma in Digital Techniques Application from HPE & Govt. of West Bengal.\n\n✨ He's actively seeking part-time IT roles and internships!\n\nUse the 📋 Quick Q&A menu to learn more!`,
    'available|hiring|internship|position|job': `Yes! ✅ ${kb.name} is actively seeking:\n• Part-time IT roles\n• Internships\n• Remote opportunities\n\n📧 Email: ${kb.email}\n📞 Phone: ${kb.phone}\n🔗 LinkedIn: linkedin.com/in/sujon-ganguly-0bb22631a`,
    'skills|technical|technology|programming|languages': `Technical Skills (${kb.skills.length}):\n${kb.skills.map((s, i) => ((i + 1) % 2 === 1 ? '\n' : '') + (i + 1) + '. ' + s).join(' | ')}\n\nSoft Skills:\n${kb.softSkills.join(' • ')}\n\n🌐 Languages: ${kb.languages.join(', ')}`,
    'education|degree|diploma|certification|certified': `Education & Certifications (${kb.certifications.length}):\n\n${kb.certifications.map((cert, i) => `${i + 1}. ${cert}`).join('\n\n')}`,
    'location|where|city|address|kolkata': `📍 ${kb.name} is based in ${kb.location} and available for remote opportunities.`,
    'contact|email|phone|reach|message|call': `Get in Touch:\n\n📧 Email: ${kb.email}\n📞 Phone: ${kb.phone}\n🔗 LinkedIn: linkedin.com/in/sujon-ganguly-0bb22631a\n\nBased in Kolkata, available for remote work!`,
    'project|portfolio|github|build|work': `Projects Built:\n\n${kb.projects.map((proj, i) => `${i + 1}. ${proj}`).join('\n\n')}`,
    'english|writing|soft skill|communication|language': `Soft Skills & Languages:\n\nSoft Skills:\n${kb.softSkills.map((s, i) => `• ${s}`).join('\n')}\n\nLanguages:\n${kb.languages.map((l, i) => `• ${l}`).join('\n')}`,
    'experience|fresher|fresh graduate|new|junior': `Sujon is a motivated fresher with strong foundational knowledge. 🎓\n\n✓ Government-certified Diploma (Grade A)\n✓ 86 in Class XII Computer Science\n✓ Strong foundation in C, Java, Python, Web Dev\n✓ Hands-on projects in databases and web apps\n\nWhile he lacks professional experience, he's eager to learn and contribute!`,
    'ai|ml|machine learning|artificial|ai lab': `Sujon is exploring AI & ML fundamentals! 🤖\n\nCurrent AI Lab Projects:\n• This Portfolio Chatbot\n• ML prediction tools\n• Cyber security quiz\n• Writing assistant experiments\n\nHe's learning by doing — building real tools to understand AI!`,
    'help|question|ask me|what can|features': `I can help you learn about Sujon's:\n\n💼 Skills & expertise\n🔨 Projects & work\n🏆 Education & certifications\n💬 Availability & contact\n🌐 Languages & soft skills\n\nEither ask me questions or use the 📋 Quick Q&A menu!`
  };

  // Eye tracking
  document.addEventListener('mousemove', (e) => {
    const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');

    if (!eye1 || !eye2) return;

    const fabRect = fab.getBoundingClientRect();
    const fabCenterX = fabRect.left + fabRect.width / 2;
    const fabCenterY = fabRect.top + fabRect.height / 2;

    const angle = Math.atan2(e.clientY - fabCenterY, e.clientX - fabCenterX);
    const distance = 5;

    [eye1, eye2].forEach((eye) => {
      const pupil = eye.querySelector('.ball-pupil');
      if (pupil) {
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      }
    });
  });

  // Blink animation
  setInterval(() => {
    const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');

    if (eye1 && eye2) {
      eye1.style.scaleY = 0.1;
      eye2.style.scaleY = 0.1;
      setTimeout(() => {
        eye1.style.scaleY = 1;
        eye2.style.scaleY = 1;
      }, 100);
    }
  }, 4000);

  // Toggle chat window
  fab.addEventListener('click', () => {
    open = !open;
    win.classList.toggle('open', open);
    if (open) {
      input.focus();
      fab.classList.remove('pulse');
    }
  });

  closeBtn.addEventListener('click', () => {
    open = false;
    win.classList.remove('open');
  });

  // Toggle preset menu
  toggleMenuBtn.addEventListener('click', () => {
    if (presetMenu.style.display === 'none') {
      presetMenu.style.display = 'grid';
      toggleMenuBtn.textContent = '✕ Close';
    } else {
      presetMenu.style.display = 'none';
      toggleMenuBtn.textContent = '📋 Quick Q&A';
    }
  });

  // Answer question
  function answerQuestion(q) {
    const lower = q.toLowerCase();
    for (const [keywords, answer] of Object.entries(responses)) {
      const pattern = new RegExp(keywords.split('|').join('|'), 'i');
      if (pattern.test(lower)) return answer;
    }
    return `Great question! For details about Sujon that I might not have, you can contact him directly at ${kb.email} or check his LinkedIn. I'm still learning! 🧠`;
  }

  // Send message
  async function sendMsg() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // User message
    const uDiv = document.createElement('div');
    uDiv.className = 'msg user';
    uDiv.textContent = text;
    msgs.appendChild(uDiv);

    // Typing indicator
    const tDiv = document.createElement('div');
    tDiv.className = 'chat-typing';
    tDiv.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(tDiv);
    msgs.scrollTop = msgs.scrollHeight;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    tDiv.remove();

    // Bot response
    const reply = answerQuestion(text);
    const bDiv = document.createElement('div');
    bDiv.className = 'msg bot';
    bDiv.textContent = reply;
    msgs.appendChild(bDiv);
    msgs.scrollTop = msgs.scrollHeight;

    // Add pulse to FAB on new message
    fab.classList.add('pulse');
    setTimeout(() => fab.classList.remove('pulse'), 2000);
  }

  // Select preset question
  window.selectPreset = function (question) {
    input.value = question;
    sendMsg();
    presetMenu.style.display = 'none';
    toggleMenuBtn.textContent = '📋 Quick Q&A';
  };

  // Send on button click
  send.addEventListener('click', sendMsg);

  // Send on Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMsg();
  });
}
