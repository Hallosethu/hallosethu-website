    (function () {
      // ===== CONVERSATION DATA =====
      // Every L1 has a set of L2 "topics". A topic is either:
      //  - a question flow (has `questions`: array of {short, q, choices?, ph?, optional?})
      //  - a direct-content answer (type:'content', content: html string)
      //  - a direct hand-off (type:'agent')
      var EDU_TOPICS = {
        school: {
          label: '🏫 School Admissions',
          questions: [
            { short: 'Grade', q: 'Which class/grade are you looking for admission to?', choices: ['Pre-School', 'Primary (1–5)', 'Middle (6–8)', 'High School (9–10)', 'Intermediate (11–12)'] },
            { short: 'Location', q: 'Which city/location are you looking for?', ph: 'e.g. MVP Colony, Vizag' },
            { short: 'Board', q: 'What type of school are you interested in?', choices: ['CBSE', 'ICSE', 'State Board', 'International'] },
            { short: 'Preference / Budget', q: 'Do you have a preferred school or budget range?', ph: 'Type it in, or Skip', optional: true },
            { short: 'Timeline', q: 'When are you planning to take admission?', choices: ['Immediately', 'Within 3 months', 'Next academic year', 'Just exploring'] }
          ]
        },
        college: {
          label: '🏛️ College Admissions',
          questions: [
            { short: 'Course', q: 'What course/degree are you interested in?', ph: 'e.g. B.Tech, MBA, B.Com' },
            { short: 'Stream', q: 'Which stream/specialization?', ph: 'e.g. CSE, Mechanical — or Skip', optional: true },
            { short: 'Location', q: 'Which city/location do you prefer?', ph: 'e.g. Vizag' },
            { short: 'Budget / Type', q: 'What is your expected budget or preferred college type?', choices: ['Government', 'Private', 'Either', 'Not sure yet'] },
            { short: 'Timeline', q: 'When are you planning to join?', choices: ['This year', 'Next year', 'Just exploring'] }
          ]
        },
        coaching: {
          label: '📝 Coaching & Tutoring',
          questions: [
            { short: 'Subject', q: 'What subject/course do you need help with?', ph: 'e.g. Maths, JEE, Spoken English' },
            { short: 'Level', q: 'What is your current education level?', choices: ['School', 'Intermediate', 'Undergraduate', 'Postgraduate', 'Working professional'] },
            { short: 'Mode', q: 'Are you looking for online or offline coaching?', choices: ['Online', 'Offline', 'Either'] },
            { short: 'Location', q: 'Which location do you prefer?', ph: 'Skip if online', optional: true },
            { short: 'Timeline / Budget', q: 'What is your preferred learning timeline/budget?', ph: 'Optional', optional: true }
          ]
        },
        studyAbroad: {
          label: '🌍 Study Abroad',
          questions: [
            { short: 'Country', q: 'Which country are you interested in?', choices: ['USA', 'UK', 'Australia', 'Canada', 'Other'] },
            { short: 'Program', q: 'What course/program do you want to pursue?', ph: 'e.g. MS Computer Science' },
            { short: 'Qualification', q: 'What is your current qualification?', choices: ['12th / Intermediate', 'Undergraduate', 'Postgraduate'] },
            { short: 'Budget', q: 'What is your approximate budget?', ph: 'Optional', optional: true },
            { short: 'Timeline', q: 'When are you planning to study abroad?', choices: ['This year', 'Next year', '1–2 years from now'] }
          ]
        },
        skills: {
          label: '💻 Skills & Certifications',
          questions: [
            { short: 'Skill', q: 'Which skill do you want to learn?', ph: 'e.g. Digital Marketing, Excel, UI/UX' },
            { short: 'Level', q: 'What is your current experience/education level?', choices: ['Beginner', 'Some experience', 'Experienced professional'] },
            { short: 'Reason', q: 'Why do you want to learn the skill?', choices: ['Career switch', 'Upskilling for current job', 'Personal interest', 'Job requirement'] },
            { short: 'Mode', q: 'Do you prefer online or offline learning?', choices: ['Online', 'Offline', 'Either'] },
            { short: 'Timeline / Budget', q: 'What is your preferred timeline/budget?', ph: 'Optional', optional: true }
          ]
        }
      };

      var CAREER_TOPICS = {
        guidance: {
          label: '🧭 Career Guidance',
          questions: [
            { short: 'Profile', q: 'Are you a fresher or experienced professional?', choices: ['Fresher', 'Experienced'] },
            { short: 'Qualification', q: 'What is your education/qualification?', ph: 'e.g. B.Tech, MBA' },
            { short: 'Role interest', q: 'What career/role are you interested in?', ph: 'e.g. Software Developer' },
            { short: 'Location / Industry', q: 'Which location/industry do you prefer?', ph: 'Optional', optional: true },
            { short: 'Goal', q: 'What is your current career goal?', ph: 'Optional', optional: true }
          ]
        },
        jobSearch: {
          label: '🔍 Job Search Support',
          questions: [
            { short: 'Role', q: 'What job role are you looking for?', ph: 'e.g. Business Analyst' },
            { short: 'Experience', q: 'What is your experience level?', choices: ['Fresher', '0–2 years', '2–5 years', '5+ years'] },
            { short: 'Location', q: 'Which location do you prefer?', ph: 'e.g. Vizag' },
            { short: 'Industry', q: 'Which industry/company type are you targeting?', ph: 'Optional', optional: true },
            { short: 'Timeline', q: 'When are you looking to switch/start a job?', choices: ['Immediately', 'Within 1–3 months', 'Just exploring'] }
          ]
        },
        resumeInterview: {
          label: '📄 Resume & Interview',
          questions: [
            { short: 'Help needed', q: 'Are you looking for resume help or interview preparation?', choices: ['Resume help', 'Interview preparation', 'Both'] },
            { short: 'Role', q: 'What role are you applying for?', ph: 'e.g. Marketing Executive' },
            { short: 'Experience', q: 'How many years of experience do you have?', choices: ['Fresher', '0–2 years', '2–5 years', '5+ years'] },
            { short: 'Has resume?', q: 'Do you already have a resume?', choices: ['Yes', 'No'] },
            { short: 'Timing', q: 'When is your interview/job application?', ph: 'Optional', optional: true }
          ]
        },
        placement: {
          label: '🤝 Placement Assistance',
          questions: [
            { short: 'Profile', q: 'Are you a fresher or experienced candidate?', choices: ['Fresher', 'Experienced'] },
            { short: 'Qualification', q: 'What qualification/course have you completed?', ph: 'e.g. B.Com, Diploma' },
            { short: 'Role', q: 'What role are you looking for?', ph: 'e.g. Accountant' },
            { short: 'Location', q: 'Which location do you prefer?', ph: 'e.g. Vizag' },
            { short: 'Availability', q: 'When are you available to join?', choices: ['Immediately', 'Within a month', '1–3 months'] }
          ]
        },
        govtExams: {
          label: '🏛️ Govt & Competitive Exams',
          questions: [
            { short: 'Exam', q: 'Which exam are you preparing for?', choices: ['UPSC', 'APPSC', 'SSC', 'Banking', 'Railways', 'Other'] },
            { short: 'Qualification', q: 'What is your qualification?', ph: 'e.g. Graduate' },
            { short: 'Target', q: 'What is your target exam/year?', ph: 'e.g. 2027' },
            { short: 'Support needed', q: 'Are you looking for coaching, study material, or preparation guidance?', choices: ['Coaching', 'Study material', 'Preparation guidance', 'All of the above'] },
            { short: 'Mode', q: 'What is your preferred learning mode?', choices: ['Online', 'Offline', 'Either'] }
          ]
        }
      };

      var GENERAL_TOPICS = {
        about: {
          label: 'ℹ️ About Hallosethu', type: 'content',
          content: "Hallosethu is your trusted local friend in Visakhapatnam (Vizag) — we guide you to the right <strong>Education</strong> and <strong>Career</strong> opportunities, completely free. We help with school &amp; college admissions, coaching, study abroad, skills training, job search, resume &amp; interview prep, placement assistance, and government exam guidance — all personalised to you. Anyone in or around Vizag looking for education or career guidance can use Hallosethu! 🌟"
        },
        how: {
          label: '⚙️ How It Works', type: 'content',
          content: "It's simple:<br>1️⃣ Tell us what you need — Education or Career.<br>2️⃣ Answer a few quick questions so we understand your goals.<br>3️⃣ Our local Hallosethu team reviews your requirement and shortlists the best-matched options from our trusted network.<br>4️⃣ We reach out to you directly with recommendations — 100% free, no commitments.<br><br>You can also talk to a real person any time. ⚙️"
        },
        contact: {
          label: '📞 Contact & Support', type: 'content',
          content: "You can reach our support team anytime:<br>📞 Call: +91 9010973762<br>💬 WhatsApp: +91 9010973762<br>✉️ Email: support@hallosethu.com<br><br>Or just tap <strong>Talk to an Agent</strong> below and we'll connect you right away."
        },
        agent: { label: '🟢 Talk to an Agent', type: 'agent' }
      };

      var L1 = {
        education: { label: '🎓 Education', shortLabel: 'Education', intro: 'Great choice! 🎓 I can help you find the right education path in Vizag. What are you looking for?', topics: EDU_TOPICS },
        career: { label: '💼 Career', shortLabel: 'Career', intro: 'Great! 💼 I can help you with your career journey. What do you need help with?', topics: CAREER_TOPICS },
        general: { label: '💬 General', shortLabel: 'General', intro: 'Sure! 💬 Here are a few common topics, or feel free to type your question anytime.', topics: GENERAL_TOPICS }
      };

      // ===== STATE =====
      var state = { screen: 'l1', l1: null, l2: null, qIndex: 0, answers: [] };

      var mEl = document.getElementById('_hs_msgs'),
        cEl = document.getElementById('_hs_chips'),
        iEl = document.getElementById('_hs_inp'),
        open = false;

      function ts() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
      function es(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
      function add(r, h, id) { var d = document.createElement('div'); d.className = '_hs_msg ' + r; if (id) d.id = id; d.innerHTML = '<div class="_hs_bub">' + h + '</div><span class="_hs_ts">' + ts() + '</span>'; mEl.appendChild(d); mEl.scrollTop = mEl.scrollHeight; }
      function rm(id) { var e = document.getElementById(id); if (e) e.remove(); }
      function typing() { add('bot', '<span class="_hs_dots"><span></span><span></span><span></span></span>', '_hs_typ'); }

      document.getElementById('_hs_close').addEventListener('click', toggle);
      document.getElementById('_hs_launcher').addEventListener('click', toggle);
      function toggle() {
        open = !open;
        document.getElementById('_hs_win').classList.toggle('open', open);
        // Toggle launcher icon between X and HS logo
        var svgIcon = document.getElementById('_hs_svg_icon');
        var ltext = document.getElementById('_hs_lico_text');
        if (open) {
          if (svgIcon) svgIcon.style.opacity = '0.4';
          if (ltext) ltext.textContent = 'CLOSE';
        } else {
          if (svgIcon) svgIcon.style.opacity = '1';
          if (ltext) ltext.textContent = 'SETHU';
        }
        document.getElementById('_hs_notif').style.display = open ? 'none' : 'flex';
        // Same body-scroll lock the site's other overlays (login, education,
        // coming-soon) already use — without it the page scrolls invisibly
        // behind the fixed chat panel, most noticeable on mobile where the
        // panel covers most of the screen.
        document.body.style.overflow = open ? 'hidden' : '';
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && open) toggle();
      });

      // ===== SHARED CHIP-ROW HELPERS =====
      function renderBack(label, onClick) {
        var bk = document.createElement('button');
        bk.className = '_hs_back';
        bk.innerHTML = '<i class="ti ti-arrow-left" style="font-size:13px"></i> ' + label;
        bk.addEventListener('click', onClick);
        cEl.appendChild(bk);
      }

      function agentChipRow() {
        var w = document.createElement('div'); w.className = '_hs_qw'; w.style.marginTop = '2px';
        var agent = document.createElement('button'); agent.className = '_hs_qc hs-agent-chip';
        agent.innerHTML = '🟢 Talk to an Agent';
        agent.addEventListener('click', showAgent);
        w.appendChild(agent);
        cEl.appendChild(w);
      }

      function renderNextSteps(exploreLabel, onExplore) {
        cEl.innerHTML = '';
        var w = document.createElement('div'); w.className = '_hs_qw';
        var e = document.createElement('button'); e.className = '_hs_qc'; e.innerHTML = '🔄 ' + exploreLabel;
        e.addEventListener('click', onExplore);
        w.appendChild(e);
        var home = document.createElement('button'); home.className = '_hs_qc'; home.innerHTML = '🏠 Main Menu';
        home.addEventListener('click', renderL1);
        w.appendChild(home);
        var agent = document.createElement('button'); agent.className = '_hs_qc hs-agent-chip'; agent.innerHTML = '🟢 Talk to an Agent';
        agent.addEventListener('click', showAgent);
        w.appendChild(agent);
        cEl.appendChild(w);
      }

      // ===== AGENT CONNECT =====
      function agentCardHtml(context) {
        var msg = 'Hi Hallosethu Team, I need help with my ' + (context || 'Education/Career') + ' query.';
        var wa = 'https://wa.me/919010973762?text=' + encodeURIComponent(msg);
        var mail = 'mailto:support@hallosethu.com?subject=' + encodeURIComponent((context || 'General') + ' Query');
        return '<div class="hs-agent-card">' +
          '<div class="hs-agent-title">Connect with our team</div>' +
          '<a class="hs-agent-btn call" href="tel:+919010973762"><i class="ti ti-phone"></i> Call Now</a>' +
          '<a class="hs-agent-btn whatsapp" href="' + wa + '" target="_blank" rel="noopener"><i class="ti ti-brand-whatsapp"></i> WhatsApp Chat</a>' +
          '<a class="hs-agent-btn email" href="' + mail + '"><i class="ti ti-mail"></i> Email Us</a>' +
          '</div>';
      }

      function showAgent() {
        add('bot', agentCardHtml(state.l1 ? L1[state.l1].shortLabel : 'Education/Career'));
        renderNextSteps('Explore more', function () { state.l1 ? renderL2(state.l1) : renderL1(); });
      }

      // ===== L1 (Home) =====
      function renderL1() {
        state.screen = 'l1'; state.l1 = null; state.l2 = null; state.qIndex = 0; state.answers = [];
        iEl.placeholder = 'Or type your question…';
        cEl.innerHTML = '';
        var g = document.createElement('div'); g.className = '_hs_sgrid';
        Object.keys(L1).forEach(function (k) {
          var s = L1[k], b = document.createElement('button'); b.className = '_hs_sc';
          b.innerHTML = '<span>' + s.label + '</span>';
          b.addEventListener('click', function () { selectL1(k); });
          g.appendChild(b);
        });
        cEl.appendChild(g);
        agentChipRow();
      }

      function selectL1(k) {
        state.l1 = k;
        add('user', es(L1[k].label));
        add('bot', L1[k].intro);
        renderL2(k);
      }

      // ===== L2 (topics within an L1) =====
      function renderL2(l1key) {
        var l1 = L1[l1key];
        state.screen = 'l2'; state.l1 = l1key; state.l2 = null;
        cEl.innerHTML = '';
        renderBack('Back to main menu', renderL1);
        var g = document.createElement('div'); g.className = '_hs_sgrid';
        Object.keys(l1.topics).forEach(function (k) {
          var t = l1.topics[k], b = document.createElement('button'); b.className = '_hs_sc';
          b.innerHTML = '<span>' + t.label + '</span>';
          b.addEventListener('click', function () { selectTopic(k); });
          g.appendChild(b);
        });
        cEl.appendChild(g);
        agentChipRow();
      }

      function selectTopic(topicKey) {
        var l1 = L1[state.l1], topic = l1.topics[topicKey];
        state.l2 = topicKey;
        add('user', es(topic.label));
        if (topic.type === 'agent') { showAgent(); return; }
        if (topic.type === 'content') {
          add('bot', topic.content);
          renderNextSteps('Explore more ' + l1.shortLabel + ' topics', function () { renderL2(state.l1); });
          return;
        }
        state.screen = 'questions'; state.qIndex = 0; state.answers = [];
        add('bot', "Great! Let's find the right options for you — just a few quick questions. 😊");
        askQuestion();
      }

      // ===== Question flow =====
      function askQuestion() {
        var topic = L1[state.l1].topics[state.l2];
        var q = topic.questions[state.qIndex];
        add('bot', q.q);
        cEl.innerHTML = '';
        renderBack('Back to ' + L1[state.l1].shortLabel + ' options', function () { renderL2(state.l1); });
        if (q.choices) {
          var w = document.createElement('div'); w.className = '_hs_qw';
          q.choices.forEach(function (c) {
            var b = document.createElement('button'); b.className = '_hs_qc'; b.textContent = c;
            b.addEventListener('click', function () { submitAnswer(c); });
            w.appendChild(b);
          });
          if (q.optional) {
            var sk = document.createElement('button'); sk.className = '_hs_qc muted'; sk.textContent = 'Skip';
            sk.addEventListener('click', function () { submitAnswer(''); });
            w.appendChild(sk);
          }
          cEl.appendChild(w);
          iEl.placeholder = 'Or type your own answer…';
        } else {
          if (q.optional) {
            var w2 = document.createElement('div'); w2.className = '_hs_qw';
            var sk2 = document.createElement('button'); sk2.className = '_hs_qc muted'; sk2.textContent = 'Skip';
            sk2.addEventListener('click', function () { submitAnswer(''); });
            w2.appendChild(sk2);
            cEl.appendChild(w2);
          }
          iEl.placeholder = q.ph || 'Type your answer…';
          iEl.focus();
        }
      }

      function submitAnswer(val) {
        add('user', es(val || 'Skip'));
        state.answers.push(val);
        state.qIndex++;
        iEl.placeholder = 'Or type your question…';
        var topic = L1[state.l1].topics[state.l2];
        if (state.qIndex < topic.questions.length) {
          setTimeout(askQuestion, 350);
        } else {
          setTimeout(finishTopic, 400);
        }
      }

      function finishTopic() {
        var l1 = L1[state.l1], topic = l1.topics[state.l2];
        var recap = topic.questions.map(function (q, i) {
          return state.answers[i] ? ('• <strong>' + es(q.short) + ':</strong> ' + es(state.answers[i])) : null;
        }).filter(Boolean).join('<br>');
        var topicName = topic.label.replace(/^\S+\s/, '');
        typing();
        setTimeout(function () {
          rm('_hs_typ');
          add('bot', "Thanks for sharing that! Here's what I noted for <strong>" + es(topicName) + '</strong>:<br><br>' + recap +
            "<br><br>Based on this, our local Hallosethu team will put together the best-matched, 100% free recommendations and reach out to you shortly. 🌟");
          renderNextSteps('Explore more ' + l1.shortLabel + ' topics', function () { renderL2(state.l1); });
        }, 700);
      }

      // ===== Free-text input (typed instead of clicking a chip) =====
      function routeFreeText(txt) {
        var lower = txt.toLowerCase();
        typing();
        setTimeout(function () {
          rm('_hs_typ');
          if (/\b(agent|human|call me|talk to (someone|a person)|representative|real person)\b/.test(lower)) { showAgent(); return; }
          if (/\b(school|college|admission|coaching|tuition|tutor|study abroad|ielts|gre|toefl|skill|certif|course|degree|jee|neet|eamcet)\b/.test(lower)) {
            add('bot', "It sounds like this is about Education — let's dive in! 🎓");
            selectL1('education'); return;
          }
          if (/\b(job|career|resume|cv|interview|placement|upsc|appsc|ssc|govt exam|government exam|hiring|naukri|linkedin)\b/.test(lower)) {
            add('bot', "It sounds like this is about Career — let's dive in! 💼");
            selectL1('career'); return;
          }
          if (/\b(hallosethu|about you|about us|contact|support|whatsapp|email|how does it work|how it works|free|fee|charge)\b/.test(lower)) {
            add('bot', "Let me point you to some general info. 💬");
            selectL1('general'); return;
          }
          add('bot', "I'm sorry, I couldn't quite understand that. Could you please choose one of the options below? 🙏");
          renderL1();
        }, 600);
      }

      function handleSend() {
        var txt = iEl.value.trim();
        if (!txt) return;
        iEl.value = ''; iEl.style.height = 'auto';
        if (state.screen === 'questions') { submitAnswer(txt); return; }
        add('user', es(txt));
        routeFreeText(txt);
      }

      document.getElementById('_hs_sbtn').addEventListener('click', handleSend);
      iEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });
      iEl.addEventListener('input', function () { iEl.style.height = 'auto'; iEl.style.height = Math.min(iEl.scrollHeight, 72) + 'px'; });

      add('bot', 'Hello! &#128075; Welcome to <strong>Hallosethu</strong> — your trusted local friend in Vizag!<br><br>How can I help you today?');
      renderL1();
    })();
