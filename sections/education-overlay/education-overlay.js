    var eduViewStack = [];

    function openEduFlow() {
      document.getElementById('eduOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      eduReset();
    }

    function closeEduFlow() {
      document.getElementById('eduOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }

    function eduReset() {
      eduViewStack = [];
      eduShowView('ev-top');
      updateEduBc([]);
      document.getElementById('eduBackBtn').style.display = 'none';
    }

    function eduShowView(id) {
      document.querySelectorAll('.edu-view').forEach(v => v.classList.remove('active'));
      var el = document.getElementById(id);
      if (el) { el.classList.add('active'); document.getElementById('eduOverlay').querySelector('.edu-body').scrollTop = 0; }
    }

    function eduGoBack() {
      if (eduViewStack.length > 0) {
        var prev = eduViewStack.pop();
        eduShowView(prev.view);
        updateEduBc(prev.bc);
        document.getElementById('eduBackBtn').style.display = eduViewStack.length > 0 ? 'flex' : 'none';
      } else {
        eduReset();
      }
    }

    function updateEduBc(extra) {
      var bc = document.getElementById('eduBc');
      var html = '<span class="crumb" onclick="eduReset()">Education &amp; Career</span>';
      extra.forEach(function (label) { html += '<span class="sep">›</span><span>' + label + '</span>'; });
      bc.innerHTML = html;
    }

    function filterTopTab(btn, group) {
      document.querySelectorAll('#topTabs .seg-tab').forEach(function (t) { t.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('#topGrid .seg-card').forEach(function (c) {
        c.style.display = (group === 'all' || c.dataset.group === group) ? '' : 'none';
      });
    }

    // ─── Subsegment data ─────────────────────────────────────────────────────────
    var SEG_DATA = {
      'school': {
        group: 'Education',
        emoji: '🏫',
        title: 'School Admissions',
        tagline: 'Find the Right School for Your Child in Visakhapatnam',
        desc: 'We shortlist the best schools across CBSE, ICSE, State Board, and International curricula in Vizag — matched to your child\'s needs, location, and budget. 100% free guidance.',
        badges: ['CBSE · ICSE · State · International', 'Fee Guidance', 'Scholarship Help', 'Vizag Local Expert'],
        howWeHelp: 'Share your preferred board, location in Vizag, and fee budget — we\'ll come back with a curated shortlist of schools that truly fit your child\'s academic and personal needs.',
        what: [
          { ico: 'fa-school', c: 'blue', t: 'CBSE Schools', p: 'Central Board schools across all zones in Visakhapatnam.' },
          { ico: 'fa-book', c: 'orange', t: 'ICSE Schools', p: 'ICSE curriculum schools with strong academics in Vizag.' },
          { ico: 'fa-flag', c: 'blue', t: 'AP State Board', p: 'Andhra Pradesh State Board schools — affordable and accessible.' },
          { ico: 'fa-globe', c: 'orange', t: 'International Schools', p: 'IB, Cambridge & IGCSE schools in Visakhapatnam.' },
          { ico: 'fa-award', c: 'blue', t: 'Scholarship Guidance', p: 'Help identifying merit and need-based scholarship opportunities.' },
          { ico: 'fa-indian-rupee-sign', c: 'orange', t: 'Fee Comparison', p: 'Compare fee structures across schools to fit your budget.' }
        ],
        faqs: [
          { q: 'Which CBSE schools are available in Vizag?', a: 'Visakhapatnam has many reputed CBSE schools across localities like Madhurawada, MVP Colony, Waltair, Seethammadhara, and Gajuwaka — for all grades from nursery to Class 12. We shortlist 3–5 schools that best match your child\'s board preference, zone, fee range, and academic level.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Can you help with mid-year admissions?', a: 'Yes — mid-year transfers are possible in Vizag, and we know which schools are more flexible about it. We guide you on the documentation needed, timing, and how to approach the admission office.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Is there a charge for school admission guidance?', a: 'Absolutely not. Every service at Hallosethu is 100% free — no consultation fees, no registration charges, no hidden costs. We earn trust, not money from you.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' }
        ],
        steps: [
          { n: '01', t: 'Share Requirement', p: 'Tell us board, location preference, fee range, and child\'s grade.' },
          { n: '02', t: 'We Shortlist', p: 'We curate 3–5 best-matched schools in Vizag for you.' },
          { n: '03', t: 'Visit & Decide', p: 'We help coordinate school visits and answer your questions.' },
          { n: '04', t: 'Admission Support', p: 'We guide you through the admission process — free.' }
        ]
      },
      'college': {
        group: 'Education',
        emoji: '🏛️',
        title: 'College Admissions',
        tagline: 'Guidance for Every Stream & Every Entrance Exam in Vizag',
        desc: 'Engineering, Medical, MBA, Arts, Commerce — we help students and parents navigate college admissions, counselling rounds, and entrance exams with local expertise.',
        badges: ['JEE · NEET · EAMCET', 'All Streams', 'Counselling Rounds', 'Free Guidance'],
        howWeHelp: 'Tell us your stream, entrance exam result or expected rank, and preferred colleges — we\'ll help you understand the counselling rounds and the best options available in and around Vizag.',
        what: [
          { ico: 'fa-flask', c: 'blue', t: 'Engineering (JEE/EAMCET)', p: 'JEE Mains, Advanced & EAMCET counselling for B.Tech admissions.' },
          { ico: 'fa-stethoscope', c: 'orange', t: 'Medical (NEET)', p: 'MBBS, BDS, BAMS admission guidance through NEET counselling.' },
          { ico: 'fa-briefcase', c: 'blue', t: 'MBA & Management', p: 'CAT, MAT, ICET — college shortlisting and application guidance.' },
          { ico: 'fa-palette', c: 'orange', t: 'Arts & Humanities', p: 'BA, B.Com, BCA, B.Sc admissions across Vizag colleges.' },
          { ico: 'fa-graduation-cap', c: 'blue', t: 'PG Admissions', p: 'M.Tech, MBA, M.Sc, MA — PG entrance & admission support.' },
          { ico: 'fa-circle-question', c: 'orange', t: 'Stream Selection', p: 'Not sure which stream? We help you decide based on aptitude & goals.' }
        ],
        faqs: [
          { q: 'Can you help with EAMCET counselling in AP?', a: 'Yes — we guide students through all AP EAMCET web counselling phases, explain certificate verification, help you understand the seat allotment matrix, and suggest colleges based on your rank and preferred stream.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Do you help with deemed university admissions?', a: 'Yes — we can guide you on both management quota seats and counselling-based admissions. We explain the process, realistic fee expectations, and how to evaluate if it\'s the right choice for your budget and goals.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Is there any fee for this guidance?', a: 'No — completely free. Hallosethu is your local Vizag guide for all educational decisions. No consultation fees, ever.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' }
        ],
        steps: [
          { n: '01', t: 'Share Exam & Score', p: 'Tell us your entrance exam, rank or score, and preferred stream.' },
          { n: '02', t: 'We Explain Options', p: 'We map your score to realistic college options in Vizag and AP.' },
          { n: '03', t: 'Counselling Support', p: 'We guide you through counselling rounds and document requirements.' },
          { n: '04', t: 'Admission Confirmed', p: 'We\'re with you till your seat is confirmed — for free.' }
        ]
      },
      'coaching': {
        group: 'Education',
        emoji: '📝',
        title: 'Coaching & Tutoring',
        tagline: 'Find the Right Coaching or Tutor in Visakhapatnam',
        desc: 'JEE/NEET coaching centres, home tutors, online classes, Spoken English — we connect you with the right teaching support in Vizag matched to your exam, budget, and preferred mode.',
        badges: ['JEE · NEET Coaching', 'Home Tutors', 'Spoken English', 'Online & Offline'],
        howWeHelp: 'Share the exam or subject you need coaching for, your preferred mode (home/centre/online), and budget — we\'ll suggest the best-matched options in Visakhapatnam.',
        what: [
          { ico: 'fa-flask', c: 'blue', t: 'JEE Coaching Centres', p: 'IIT-JEE Mains & Advanced coaching institutes in Vizag.' },
          { ico: 'fa-stethoscope', c: 'orange', t: 'NEET Coaching', p: 'Medical entrance coaching with proven results in Visakhapatnam.' },
          { ico: 'fa-house-user', c: 'blue', t: 'Home Tutors', p: 'Qualified home tutors for Class 1–12 across all subjects in Vizag.' },
          { ico: 'fa-laptop', c: 'orange', t: 'Online Learning', p: 'Curated online course recommendations for all exams & skills.' },
          { ico: 'fa-comments', c: 'blue', t: 'Spoken English', p: 'Spoken English and communication skill institutes in Vizag.' },
          { ico: 'fa-pencil', c: 'orange', t: 'Crash Courses', p: 'Short-term intensive preparation for upcoming exams.' }
        ],
        faqs: [
          { q: 'Can you find a home tutor in my area in Vizag?', a: 'Yes — tell us your locality in Vizag, the subject or exam, class level, and your preferred schedule. We match you with verified, experienced tutors who are available in your area and fit your budget.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Do you recommend online coaching platforms?', a: 'Yes — we compare top platforms like Unacademy, Physics Wallah, Vedantu, BYJU\'s, and others based on your exam (JEE/NEET/SSC/Skills), budget, and learning style — and recommend the best fit for you.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Is your coaching referral service free?', a: 'Completely free. Whether it\'s finding a coaching centre, a home tutor, or an online platform — our entire guidance service is free of charge.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' }
        ],
        steps: [
          { n: '01', t: 'Tell Us Your Exam', p: 'Share exam, subject, class level, and preferred mode.' },
          { n: '02', t: 'We Match Options', p: 'We shortlist coaching centres or tutors in Vizag for you.' },
          { n: '03', t: 'Compare & Connect', p: 'We provide details and connect you directly.' },
          { n: '04', t: 'Start Learning', p: 'You start — we follow up to ensure a good experience.' }
        ]
      },
      'abroad': {
        group: 'Education',
        emoji: '🌍',
        title: 'Study Abroad',
        tagline: 'Your Vizag Guide to Studying Abroad — Step by Step',
        desc: 'Country selection, university shortlisting, SOP writing help, GRE/IELTS coaching connections, scholarship links, and visa guidance — all in one place.',
        badges: ['USA · UK · Canada · Australia', 'GRE · IELTS · TOEFL', 'SOP Help', 'Visa Guidance'],
        howWeHelp: 'Tell us your target country, course of interest, academic background, and budget — we\'ll guide you through the next steps and connect you with the right resources in Vizag.',
        what: [
          { ico: 'fa-flag-usa', c: 'blue', t: 'USA Study Guidance', p: 'University shortlisting, GRE prep links, F-1 visa basics.' },
          { ico: 'fa-sterling-sign', c: 'orange', t: 'UK Admissions', p: 'UCAS process, university selection, Tier 4 visa guidance.' },
          { ico: 'fa-leaf', c: 'blue', t: 'Canada & Australia', p: 'College and university options, PR pathway overview.' },
          { ico: 'fa-language', c: 'orange', t: 'IELTS / TOEFL Coaching', p: 'Connect with top IELTS & TOEFL coaching centres in Vizag.' },
          { ico: 'fa-file-pen', c: 'blue', t: 'SOP & LOR Help', p: 'Guidance on writing SOP and getting strong LORs.' },
          { ico: 'fa-award', c: 'orange', t: 'Scholarship Links', p: 'Identifying scholarships and funding options for your target country.' }
        ],
        faqs: [
          { q: 'Can you help me decide which country to study in?', a: 'Yes — we can walk you through the pros and cons of studying in USA, UK, Canada, and Australia based on your course, budget, and long-term goals.' },
          { q: 'Do you provide IELTS coaching in Vizag?', a: 'We connect you with trusted IELTS and TOEFL coaching institutes in Visakhapatnam — matched to your timeline and budget.' },
          { q: 'Is study abroad guidance free?', a: 'Yes — our guidance and referrals are completely free. We act as your local friend who helps you navigate the process.' }
        ],
        steps: [
          { n: '01', t: 'Share Your Profile', p: 'Tell us your academic background, target course, and country preference.' },
          { n: '02', t: 'We Guide Next Steps', p: 'We explain the process, exams needed, and timeline.' },
          { n: '03', t: 'Connect to Resources', p: 'We link you to coaching, SOP help, and consultants in Vizag.' },
          { n: '04', t: 'Application Support', p: 'We follow up and support through the process — free.' }
        ]
      },
      'skills': {
        group: 'Education',
        emoji: '🧑‍💻',
        title: 'Skills & Certifications',
        tagline: 'Job-Ready Skill Courses in Visakhapatnam — Find the Right One',
        desc: 'IT, Finance, Design, Healthcare, and more — we connect you with the right vocational and professional certification courses available in Vizag, matched to your career goal.',
        badges: ['IT & Coding', 'Finance & Accounts', 'Design & Media', 'Healthcare Vocational'],
        howWeHelp: 'Tell us your career goal or the skill you want to learn — we\'ll identify the best courses and institutes in Visakhapatnam that match your timeline and budget.',
        what: [
          { ico: 'fa-laptop-code', c: 'blue', t: 'IT & Software Skills', p: 'Python, Full Stack, Cloud, Data Science, AI — Vizag institutes.' },
          { ico: 'fa-chart-pie', c: 'orange', t: 'Finance & Accounting', p: 'Tally, GST, CA Foundation, Excel & MIS courses in Vizag.' },
          { ico: 'fa-pen-nib', c: 'blue', t: 'Design & Media', p: 'UI/UX, Graphic Design, Video Editing, Photography.' },
          { ico: 'fa-heartbeat', c: 'orange', t: 'Healthcare Vocational', p: 'Nursing assistant, medical coding, lab technician courses.' },
          { ico: 'fa-bullhorn', c: 'blue', t: 'Digital Marketing', p: 'SEO, social media, Google Ads certification courses.' },
          { ico: 'fa-certificate', c: 'orange', t: 'Industry Certifications', p: 'PMP, Six Sigma, Salesforce, Google certifications guidance.' }
        ],
        faqs: [
          { q: 'Can you help me choose between IT courses in Vizag?', a: 'Yes — tell us your background and goal (fresher/career switch/upskill) and we\'ll suggest the most relevant IT courses available in Visakhapatnam.' },
          { q: 'Do you offer placement support after skills training?', a: 'We connect you with institutes that have strong placement cells, and our Placement Assistance service can help you further after you complete training.' },
          { q: 'Is skills course guidance free?', a: 'Yes — completely free. We help you find the right course and institute at no cost.' }
        ],
        steps: [
          { n: '01', t: 'Share Your Goal', p: 'Tell us the skill domain and your career or learning objective.' },
          { n: '02', t: 'We Shortlist Courses', p: 'We identify best-matched institutes and courses in Vizag.' },
          { n: '03', t: 'Compare Options', p: 'We share details on duration, fees, mode, and placement record.' },
          { n: '04', t: 'Enroll with Confidence', p: 'We connect you to the right institute — free guidance throughout.' }
        ]
      },
      'career-guidance': {
        group: 'Career',
        emoji: '🧭',
        title: 'Career Guidance',
        tagline: 'Personalised Career Roadmap — Built for You in Vizag',
        desc: 'Aptitude assessment, career path mapping, industry insights — and dedicated support for women returning to work after a break. Your career, our guidance.',
        badges: ['Aptitude Assessment', 'Career Roadmap', 'Women Returners', 'Free Consultation'],
        howWeHelp: 'Share your background, interests, and where you are right now — we\'ll help you identify the right career direction and connect you with the right resources in Visakhapatnam.',
        what: [
          { ico: 'fa-brain', c: 'blue', t: 'Aptitude Assessment', p: 'Identify your strengths and suitable career paths through guided assessment.' },
          { ico: 'fa-map', c: 'orange', t: 'Career Roadmap', p: 'Step-by-step career plan from where you are to where you want to be.' },
          { ico: 'fa-woman', c: 'blue', t: 'Women Returning to Work', p: 'Dedicated support for women rejoining the workforce after a career break.' },
          { ico: 'fa-industry', c: 'orange', t: 'Industry Insights', p: 'Understand job markets, growth sectors, and in-demand roles in Vizag.' },
          { ico: 'fa-user-graduate', c: 'blue', t: 'Student Career Counselling', p: 'Stream selection, college choice, and career planning for students.' },
          { ico: 'fa-arrows-spin', c: 'orange', t: 'Career Switch Guidance', p: 'Planning a career change? We help you identify the right path.' }
        ],
        faqs: [
          { q: 'Can you help a fresher choose a career path?', a: 'Yes — we guide freshers through aptitude assessment and career mapping to identify paths that suit their strengths, interests, and the local Vizag job market.' },
          { q: 'Do you support women returning to work?', a: 'Absolutely. We understand the challenges of returning after a break and provide tailored guidance on upskilling, job options, and rebuilding confidence.' },
          { q: 'Is career counselling free?', a: 'Yes — 100% free. We are your local Vizag friend who helps you plan the right career move.' }
        ],
        steps: [
          { n: '01', t: 'Share Your Background', p: 'Tell us your education, experience, and career goals.' },
          { n: '02', t: 'We Assess & Map', p: 'We identify suitable career paths and priorities.' },
          { n: '03', t: 'Get Your Roadmap', p: 'Receive a practical career action plan.' },
          { n: '04', t: 'Ongoing Support', p: 'We follow up as you progress — free throughout.' }
        ]
      },
      'job-search': {
        group: 'Career',
        emoji: '🔍',
        title: 'Job Search Support',
        tagline: 'Find the Right Job in Vizag — or Work Remotely from Vizag',
        desc: 'Local Vizag job openings, remote work opportunities, and guidance on building a strong presence on LinkedIn and Naukri to attract the right employers.',
        badges: ['Vizag Local Jobs', 'Remote Roles', 'LinkedIn Guidance', 'Naukri Tips'],
        howWeHelp: 'Share your work experience, preferred role, sector, and salary expectations — we\'ll point you to the right opportunities and help you maximise your online job search profile.',
        what: [
          { ico: 'fa-building', c: 'blue', t: 'Local Vizag Jobs', p: 'Job openings across IT, healthcare, retail, education, and more in Vizag.' },
          { ico: 'fa-wifi', c: 'orange', t: 'Remote Work Opportunities', p: 'Remote and hybrid roles you can do from Visakhapatnam.' },
          { ico: 'fa-linkedin', c: 'blue', t: 'LinkedIn Profile Guidance', p: 'Tips to optimise your LinkedIn profile to attract recruiters.' },
          { ico: 'fa-search', c: 'orange', t: 'Naukri & Job Portal Tips', p: 'How to use Naukri, Indeed, and other portals effectively.' },
          { ico: 'fa-people-group', c: 'blue', t: 'Networking in Vizag', p: 'Local professional networks, events, and groups in Visakhapatnam.' },
          { ico: 'fa-clock', c: 'orange', t: 'Job Search Strategy', p: 'A structured approach to organise and accelerate your job hunt.' }
        ],
        faqs: [
          { q: 'Can you find me a job directly?', a: 'We guide you to the right opportunities and platforms, and our Placement Assistance service can directly connect you with employers in Vizag.' },
          { q: 'Do you help with remote jobs from Vizag?', a: 'Yes — we guide you on finding remote and hybrid roles that are realistic and accessible for candidates based in Visakhapatnam.' },
          { q: 'Is job search guidance free?', a: 'Yes — completely free. We help you navigate the job market smarter.' }
        ],
        steps: [
          { n: '01', t: 'Share Your Profile', p: 'Tell us your role, experience, and preferred sector.' },
          { n: '02', t: 'We Identify Options', p: 'We point you to the right job opportunities in Vizag.' },
          { n: '03', t: 'Profile Boost Tips', p: 'We give you actionable LinkedIn and portal tips.' },
          { n: '04', t: 'Start Applying', p: 'We support you through the process — free.' }
        ]
      },
      'resume': {
        group: 'Career',
        emoji: '📄',
        title: 'Resume & Interview Prep',
        tagline: 'Get Hired Faster — ATS Resumes, Mock Interviews & LinkedIn',
        desc: 'ATS-optimised resumes that clear filters, mock interview practice for real confidence, and LinkedIn profile optimisation to get noticed by recruiters.',
        badges: ['ATS Resume', 'Mock Interviews', 'LinkedIn Optimisation', 'Salary Negotiation'],
        howWeHelp: 'Share your current resume (if you have one), target role, and interview challenges — we\'ll guide you on building a stronger profile and practising the right way.',
        what: [
          { ico: 'fa-file-lines', c: 'blue', t: 'ATS Resume Writing', p: 'Resumes crafted to pass Applicant Tracking Systems and land interviews.' },
          { ico: 'fa-comments', c: 'orange', t: 'Mock Interview Practice', p: 'Realistic practice sessions to build confidence and polish answers.' },
          { ico: 'fa-linkedin', c: 'blue', t: 'LinkedIn Optimisation', p: 'Profile headline, summary, and experience written to attract recruiters.' },
          { ico: 'fa-indian-rupee-sign', c: 'orange', t: 'Salary Negotiation Tips', p: 'How to negotiate confidently and get the compensation you deserve.' },
          { ico: 'fa-envelope', c: 'blue', t: 'Cover Letter Guidance', p: 'Writing compelling cover letters that get read.' },
          { ico: 'fa-star', c: 'orange', t: 'Personal Branding', p: 'Build a consistent professional image across all platforms.' }
        ],
        faqs: [
          { q: 'What is an ATS resume and why does it matter?', a: 'ATS (Applicant Tracking System) is software that filters resumes before they reach a recruiter. Most companies use it. An ATS-optimised resume uses the right keywords and format to clear the filter.' },
          { q: 'Do you do mock interviews in Vizag?', a: 'We connect you with mock interview support — both in-person in Vizag and online. Practising realistic scenarios dramatically improves your success rate.' },
          { q: 'Is resume and interview guidance free?', a: 'Yes — our guidance is completely free.' }
        ],
        steps: [
          { n: '01', t: 'Share Current Resume', p: 'Send us your existing resume or describe your background.' },
          { n: '02', t: 'We Review & Advise', p: 'We identify gaps and provide specific improvement guidance.' },
          { n: '03', t: 'Mock Interview Setup', p: 'We connect you with interview practice resources.' },
          { n: '04', t: 'Apply with Confidence', p: 'Go into interviews prepared and ready.' }
        ]
      },
      'placement': {
        group: 'Career',
        emoji: '🤝',
        title: 'Placement Assistance',
        tagline: 'Direct Employer Connections & Walk-in Drives in Vizag',
        desc: 'We connect job seekers in Visakhapatnam with employers, walk-in drives, and sector-specific placement opportunities — giving you direct access to the local hiring network.',
        badges: ['Direct Employer Connect', 'Walk-in Drives', 'Sector Placement', 'Vizag Network'],
        howWeHelp: 'Share your job role, experience level, and sector preference — we\'ll match you with employers and walk-in opportunities in Vizag from our trusted local network.',
        what: [
          { ico: 'fa-building-user', c: 'blue', t: 'Direct Employer Connect', p: 'Direct referrals to employers actively hiring in Visakhapatnam.' },
          { ico: 'fa-person-walking', c: 'orange', t: 'Walk-in Drives', p: 'Information on upcoming walk-in interview drives in Vizag.' },
          { ico: 'fa-laptop-medical', c: 'blue', t: 'IT Sector Placement', p: 'Software, data, and IT services roles in Vizag.' },
          { ico: 'fa-hospital', c: 'orange', t: 'Healthcare Placement', p: 'Hospitals, clinics, and healthcare roles in Visakhapatnam.' },
          { ico: 'fa-shop', c: 'blue', t: 'Retail & Hospitality', p: 'Customer service, retail, and hospitality sector opportunities.' },
          { ico: 'fa-seedling', c: 'orange', t: 'Fresher Placement', p: 'Entry-level roles and trainee positions for fresh graduates in Vizag.' }
        ],
        faqs: [
          { q: 'Do you directly connect me with employers?', a: 'Yes — our Placement Assistance service connects you with employers in our trusted Vizag network who are actively hiring.' },
          { q: 'Can freshers use placement assistance?', a: 'Absolutely. We have specific connections for fresher and entry-level roles across sectors in Visakhapatnam.' },
          { q: 'Is placement assistance free?', a: 'Yes — completely free for job seekers.' }
        ],
        steps: [
          { n: '01', t: 'Share Your Profile', p: 'Tell us your role, sector, experience, and location in Vizag.' },
          { n: '02', t: 'We Match Employers', p: 'We identify relevant employers and opportunities in our network.' },
          { n: '03', t: 'Direct Introduction', p: 'We facilitate a direct connection or referral.' },
          { n: '04', t: 'Interview & Offer', p: 'We support you through the hiring process.' }
        ]
      },
      'govt-exams': {
        group: 'Career',
        emoji: '🏛️',
        title: 'Govt & Competitive Exams',
        tagline: 'Coaching Links, Exam Calendar & Prep Support for All Govt Exams',
        desc: 'UPSC, APPSC, SSC CGL, Banking (IBPS/SBI), Railways (RRB) — we connect you with the right coaching institutes in Vizag and keep you updated on exam calendars.',
        badges: ['UPSC · APPSC', 'SSC · Banking · Railways', 'Exam Calendar', 'Coaching Links'],
        howWeHelp: 'Tell us which exam you\'re targeting and your current preparation stage — we\'ll connect you with suitable coaching centres in Visakhapatnam and relevant study resources.',
        what: [
          { ico: 'fa-landmark', c: 'blue', t: 'UPSC / IAS Coaching', p: 'Civil services preparation institutes and guidance in Vizag.' },
          { ico: 'fa-flag', c: 'orange', t: 'APPSC Coaching', p: 'AP State PSC (Group 1, Group 2) coaching in Visakhapatnam.' },
          { ico: 'fa-file-contract', c: 'blue', t: 'SSC Exams', p: 'SSC CGL, CHSL, MTS — coaching and mock test guidance.' },
          { ico: 'fa-piggy-bank', c: 'orange', t: 'Banking (IBPS/SBI)', p: 'IBPS PO, Clerk, SBI — coaching institutes and online resources.' },
          { ico: 'fa-train', c: 'blue', t: 'Railways (RRB)', p: 'RRB NTPC, Group D, ALP — preparation support in Vizag.' },
          { ico: 'fa-calendar-days', c: 'orange', t: 'Exam Calendar', p: 'Stay updated on upcoming notification and exam dates.' }
        ],
        faqs: [
          { q: 'Can you help me find UPSC coaching in Vizag?', a: 'Yes — we connect you with UPSC/IAS coaching institutes in Visakhapatnam suited to your preparation stage (beginner, intermediate, or Prelims qualifier). We also guide you on optional subject selection and self-study resources.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Do you provide APPSC study material?', a: 'We guide you to the best APPSC coaching institutes in Vizag for Group 1 and Group 2, plus curated online resources for Telugu medium and English medium preparation. We also keep you updated on notification dates.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' },
          { q: 'Is exam guidance free?', a: 'Yes — completely free. Competitive exam preparation is a long journey and we\'re here to help you start right, find the best coaching, and stay on track.' + '<br><br><em style="color:#1565C0;font-size:.88em">📞 Call/WhatsApp: <a href="tel:9010973762" style="color:#1565C0;font-weight:700">9010973762</a> &nbsp;|&nbsp; ✉️ <a href="mailto:Support@hallosethu.com" style="color:#1565C0;font-weight:700">Support@hallosethu.com</a> — Free guidance, always.</em>' }
        ],
        steps: [
          { n: '01', t: 'Tell Us Your Exam', p: 'Share which exam you\'re targeting and current prep status.' },
          { n: '02', t: 'We Match Coaching', p: 'We identify suitable coaching institutes in Vizag.' },
          { n: '03', t: 'Share Exam Calendar', p: 'We share upcoming exam dates and notification timeline.' },
          { n: '04', t: 'Ongoing Guidance', p: 'We support your prep journey — free.' }
        ]
      }
    };

    var SEG_SEARCH_INDEX = [
      { key: 'school', keywords: ['school', 'cbse', 'icse', 'state board', 'international school', 'admission', 'scholarship', 'fee'] },
      { key: 'college', keywords: ['college', 'jee', 'neet', 'eamcet', 'mba', 'engineering', 'medical', 'arts', 'btech', 'mbbs', 'pg'] },
      { key: 'coaching', keywords: ['coaching', 'tutor', 'home tutor', 'spoken english', 'online learning', 'jee coaching', 'neet coaching', 'crash course'] },
      { key: 'abroad', keywords: ['abroad', 'usa', 'uk', 'canada', 'australia', 'ielts', 'gre', 'toefl', 'sop', 'visa', 'foreign university'] },
      { key: 'skills', keywords: ['skill', 'certification', 'it course', 'python', 'design', 'finance', 'tally', 'digital marketing', 'vocational'] },
      { key: 'career-guidance', keywords: ['career', 'aptitude', 'roadmap', 'women', 'career change', 'career switch', 'career counselling', 'guidance'] },
      { key: 'job-search', keywords: ['job', 'jobs', 'linkedin', 'naukri', 'remote', 'work from home', 'job search', 'employment'] },
      { key: 'resume', keywords: ['resume', 'cv', 'interview', 'ats', 'mock interview', 'linkedin profile', 'cover letter'] },
      { key: 'placement', keywords: ['placement', 'employer', 'walk-in', 'hiring', 'fresher job', 'sector', 'recruiter'] },
      { key: 'govt-exams', keywords: ['upsc', 'appsc', 'ssc', 'banking', 'ibps', 'sbi', 'railways', 'rrb', 'government exam', 'civil services'] }
    ];

    function eduOpenSeg(key) {
      var d = SEG_DATA[key];
      if (!d) return;
      // Open inquiry form immediately with category pre-filled
      _eduInqCategory = d.emoji + ' ' + d.title;
      document.getElementById('eduInqModal').style.display = 'flex';
      document.getElementById('eduInqName').value = '';
      document.getElementById('eduInqPhone').value = '';
      document.getElementById('eduInqMsg').value = '';
      document.getElementById('eduInqResult').style.display = 'none';
      document.getElementById('eduInqFormBody').style.display = 'block';
      document.getElementById('eduInqCategoryLabel').textContent = d.emoji + ' ' + d.title;
      return; // Show form first; user can still browse via Browse More
      // Save current view to stack
      eduViewStack.push({ view: 'ev-top', bc: [] });
      document.getElementById('eduBackBtn').style.display = 'flex';
      updateEduBc([d.group, d.emoji + ' ' + d.title]);

      // Build subsegment detail
      var html = '<div class="subseg-hero">'
        + '<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem;position:relative;z-index:1">'
        + '<div style="width:36px;height:36px;background:rgba(255,255,255,.18);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem"><i class="fa-solid fa-graduation-cap"></i></div>'
        + '<span style="font-family:var(--font-head);font-weight:600;font-size:.8rem;opacity:.8">' + d.group + '</span></div>'
        + '<h2>' + d.tagline + '</h2><p>' + d.desc + '</p>'
        + '<div class="subseg-badges">' + d.badges.map(function (b) { return '<span class="subseg-badge">' + b + '</span>'; }).join('') + '</div>'
        + '</div>';

      html += '<div class="helps-box"><div class="helps-label"><i class="fa-solid fa-lightbulb"></i> How Hallosethu Helps You</div><p>' + d.howWeHelp + '</p></div>';

      html += '<div style="font-family:var(--font-head);font-weight:800;font-size:1rem;color:var(--gray-900);margin-bottom:.85rem;display:flex;align-items:center;gap:.5rem"><i class="fa-solid fa-grid-2" style="color:var(--blue)"></i> What We Can Help With</div>';
      html += '<div class="what-grid">' + d.what.map(function (w) {
        var bg = w.c === 'blue' ? 'rgba(21,101,192,.1),rgba(30,136,229,.07)' : 'rgba(245,124,0,.1),rgba(255,152,0,.07)';
        var col = w.c === 'blue' ? 'var(--blue)' : 'var(--orange)';
        return '<div class="what-card"><div class="wc-ico" style="background:linear-gradient(135deg,' + bg + ');color:' + col + '"><i class="fa-solid ' + w.ico + '"></i></div><h5>' + w.t + '</h5><p>' + w.p + '</p></div>';
      }).join('') + '</div>';

      html += '<div style="font-family:var(--font-head);font-weight:800;font-size:1rem;color:var(--gray-900);margin-bottom:.85rem;display:flex;align-items:center;gap:.5rem"><i class="fa-solid fa-list-ol" style="color:var(--blue)"></i> How It Works</div>';
      html += '<div class="steps-row">' + d.steps.map(function (s) {
        return '<div class="step-box"><div class="step-num">' + s.n + '</div><h5>' + s.t + '</h5><p>' + s.p + '</p></div>';
      }).join('') + '</div>';

      html += '<div style="font-family:var(--font-head);font-weight:800;font-size:1rem;color:var(--gray-900);margin-bottom:.85rem;display:flex;align-items:center;gap:.5rem"><i class="fa-solid fa-circle-question" style="color:var(--blue)"></i> FAQs</div>';
      html += '<div class="subseg-faq">' + d.faqs.map(function (f) {
        return '<div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">' + f.q + '<span class="faq-q-icon"><i class="fa-solid fa-plus"></i></span></button><div class="faq-a"><div class="faq-a-inner">' + f.a + '</div></div></div>';
      }).join('') + '</div>';

      html += '<div class="free-cta"><div style="font-size:1.4rem;margin-bottom:.4rem">🤝</div>'
        + '<p><strong>100% Free Consultation — No commitments.</strong><br>Tell us your requirement and budget — we\'ll connect you with the right option in Vizag.</p>'
        + '<div class="free-cta-btns">'
        + '<button class="btn-primary" onclick="openEduInquiry()" style="font-size:.84rem;padding:.58rem 1.2rem"><i class=\"fa-solid fa-paper-plane\"></i> Send Inquiry — We\'ll Call Back</button>'
        + '<button onclick="eduGoBack()" style="background:#fff;color:var(--blue);border:1.5px solid var(--blue);border-radius:50px;padding:.58rem 1.2rem;font-family:var(--font-head);font-weight:700;font-size:.84rem;cursor:pointer"><i class="fa-solid fa-arrow-left"></i> Browse More</button>'
        + '</div></div>';

      document.getElementById('subsegContent').innerHTML = html;
      eduShowView('ev-detail');
    }

    function runEduSearch(val) {
      if (document.getElementById('eduSearchInput')) document.getElementById('eduSearchInput').value = val;
      var q = val.toLowerCase().trim();
      var results = [];
      SEG_SEARCH_INDEX.forEach(function (item) {
        if (item.keywords.some(function (k) { return k.includes(q) || q.includes(k); })) {
          results.push(item.key);
        }
      });
      if (!q) results = Object.keys(SEG_DATA);
      var container = document.getElementById('eduSearchResults');
      if (!container) return;
      if (results.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--gray-500)"><i class="fa-solid fa-magnifying-glass" style="font-size:2rem;margin-bottom:.7rem;display:block;opacity:.4"></i>No results found. Try different keywords.</div>';
        return;
      }
      container.innerHTML = '<div class="seg-grid">' + results.map(function (key) {
        var d = SEG_DATA[key];
        var isEdu = d.group === 'Education';
        var bg = isEdu ? 'rgba(21,101,192,.1),rgba(30,136,229,.07)' : 'rgba(245,124,0,.1),rgba(255,152,0,.07)';
        var col = isEdu ? 'var(--blue)' : 'var(--orange)';
        var ico = isEdu ? 'fa-graduation-cap' : 'fa-briefcase';
        return '<div class="seg-card" onclick="eduOpenSeg(\'' + key + '\')">'
          + '<div class="seg-card-ico" style="background:linear-gradient(135deg,' + bg + ');color:' + col + '"><i class="fa-solid ' + ico + '"></i></div>'
          + '<h4>' + d.emoji + ' ' + d.title + '</h4>'
          + '<div class="seg-sub">' + d.group + '</div>'
          + '<p>' + d.desc.substring(0, 80) + '...</p></div>';
      }).join('') + '</div>';
    }

    // Initialise search results
    document.addEventListener('DOMContentLoaded', function () {
      if (document.getElementById('eduSearchResults')) runEduSearch('');
    });

