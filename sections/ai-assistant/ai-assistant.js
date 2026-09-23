    // AI CHAT
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    // ===== LOCAL FAQ KNOWLEDGE BASE =====
    const faqKnowledge = [
      // About Us
      { keys: ['where', 'located', 'location', 'city', 'vizag', 'visakhapatnam', 'operate', 'based', 'service area', 'areas covered', 'coverage', 'which areas', 'which cities'], answer: "Hallosethu is exclusively based in Visakhapatnam (Vizag), Andhra Pradesh. All our services and local expertise are centred around the Vizag region. We currently serve customers only within Visakhapatnam. 📍" },
      { keys: ['other cities', 'other states', 'bangalore', 'hyderabad', 'chennai', 'delhi', 'mumbai'], answer: "Currently we serve customers only within Visakhapatnam (Vizag). Our in-depth local knowledge helps us provide the best possible experience right here in Vizag. We plan to expand to more cities in the future! 😊" },

      // Why Hallosethu
      { keys: ['why hallosethu', 'why choose', 'benefit', 'advantage', 'trust', 'trusted', 'about hallosethu', 'about us', 'about you', 'who are you', 'what is hallosethu'], answer: "Hallosethu is your trusted local friend in Visakhapatnam who already knows the city and guides you straight to the right service. We offer 100% free consultation — no charges, no hidden fees, no commitments. We give personalised suggestions based on your specific needs and budget from our trusted local network. 🌟" },
      { keys: ['free', 'cost', 'charge', 'fee', 'price', 'paid', 'register', 'registration'], answer: "Our consultation is completely FREE of charge! There are no hidden fees, no registration charges, and no commitment required. You only decide to move forward if and when you are fully satisfied with our recommendations. 😊" },

      // Services Overview
      { keys: ['what services', 'all services', 'list services', 'what do you offer', 'what you offer', 'services available'], answer: "We offer a wide range of services in Vizag: Education & Career Consultancy ✅ (fully live), Travels ✈️, Hospitality 🏨, Vizag Tour Plans 🗺️, Medical 🏥, Real Estate 🏠, and Health & Wellness 💪. Which area would you like help with?" },
      { keys: ['tour plan', 'vizag tour', 'sightseeing', 'tourist', 'visit vizag', 'tour of vizag'], answer: "Yes! We offer personalised Vizag Tour Plans tailored to your interests, schedule, and budget. Just share your group size, preferred dates, and interests and we will curate the best experience for you. Call us at +91 9010973762 or email support@hallosethu.com! 🗺️" },

      // Education & Career
      { keys: ['education', 'career', 'school', 'college', 'course', 'coaching', 'jee', 'neet', 'eamcet', 'study', 'admission', 'degree', 'study abroad', 'usa', 'uk', 'australia', 'gre', 'ielts', 'toefl', 'visa'], answer: "Our Education & Career service is fully live! ✅ We help with school admissions (CBSE/ICSE/State/International), college admissions with JEE/NEET/EAMCET counselling, coaching centres for competitive exams, skills & certifications (IT, Design, Finance), study abroad guidance (GRE/IELTS, SOP, visa), career guidance, job search, resume prep, and placement assistance in Vizag. Share your requirement and we'll connect you with the best options! Call +91 9010973762." },
      { keys: ['resume', 'cv', 'interview', 'job', 'placement', 'employment', 'hiring', 'naukri', 'linkedin'], answer: "We offer career support including ATS-friendly resume writing, mock interview prep, LinkedIn profile optimisation, and placement assistance with local Vizag employers and walk-in drives. Call us at +91 9010973762 or email support@hallosethu.com to get started! 💼" },
      { keys: ['upsc', 'appsc', 'ssc', 'banking', 'railway', 'government exam', 'govt exam', 'competitive exam'], answer: "We guide you to the best government and competitive exam coaching centres in Vizag for UPSC, APPSC, SSC, Banking, and Railways. Share your target exam and budget and we'll recommend the right coaching. Call +91 9010973762! 📚" },

      // Travels
      { keys: ['travel', 'trip', 'cab', 'taxi', 'transport', 'intercity', 'outstation', 'group tour', 'itinerary', 'solo', 'family tour'], answer: "Our Travels service helps with local sightseeing, intercity trips, outstation travel, cab bookings, group tours, and custom itineraries in and from Visakhapatnam. We cater to solo travellers, couples, families, and groups. Share your group size, preferred dates, and budget and we'll plan the perfect trip! Call +91 9010973762. ✈️" },
      { keys: ['hotel', 'accommodation', 'hospitality', 'pg', 'hostel', 'furnished', 'apartment', 'short stay', 'long stay'], answer: "Through our Hospitality service we suggest hotels, short-stay and long-term accommodations, and furnished apartments across Vizag matched to your budget and preferences. We can also coordinate accommodation as part of a full travel plan. Call +91 9010973762! 🏨" },

      // Medical
      { keys: ['medical', 'hospital', 'clinic', 'doctor', 'specialist', 'diagnostic', 'treatment', 'patient', 'health care', 'healthcare'], answer: "Our Medical service helps you find the right hospitals, clinics, specialists, and diagnostic centres in Visakhapatnam based on your specific needs and budget. We also assist patients travelling to Vizag for treatment — including hospital referrals, accommodation near medical facilities, and local transport. For emergencies, please call 108. 🏥" },
      { keys: ['emergency', 'urgent', 'ambulance', '108'], answer: "For life-threatening emergencies please call 108 (emergency services) immediately. We can guide you to the nearest emergency hospitals in Vizag. Our team is also reachable at +91 9010973762 for non-emergency medical assistance. 🚑" },

      // Real Estate
      { keys: ['real estate', 'property', 'flat', 'house', 'apartment', 'rent', 'buy', 'lease', 'leasing', 'land', 'commercial', 'nri', 'invest', 'outstation buyer'], answer: "Our Real Estate service assists with buying, renting, and leasing residential and commercial properties in Visakhapatnam. We regularly help NRIs and outstation buyers explore property options remotely. Share your requirement and budget and we'll connect you with trusted local options. Call +91 9010973762 or email support@hallosethu.com. 🏠" },

      // Health & Wellness
      { keys: ['gym', 'yoga', 'fitness', 'nutrition', 'wellness', 'physiotherapy', 'mental health', 'stress', 'weight loss', 'diet', 'lifestyle', 'wellness centre'], answer: "Our Health & Wellness service connects you with gyms, yoga centres, wellness retreats, nutrition consultants, physiotherapy clinics, and mental wellness services in Vizag — all matched to your goals and budget. Whether your goal is weight loss, stress management, physiotherapy recovery, or general fitness, we'll point you in the right direction. Call +91 9010973762! 💪" },
      { keys: ['difference', 'medical vs wellness', 'health vs medical'], answer: "Our Health & Wellness service focuses on preventive care, fitness, and lifestyle improvement (gyms, yoga, nutrition, physiotherapy), while our Medical service helps you find hospitals, specialists, and clinical care for treatment needs. Both are available in Vizag! 😊" },

      // How We Work
      { keys: ['how does it work', 'how it works', 'process', 'how do you work', 'how to use', 'listing', 'directory'], answer: "We take a personalised approach — you select the service you need, share your requirements and budget, and our team gives you curated recommendations from our trusted local network. No generic directory, just a shortlist that truly fits your needs. And it's 100% free! Call +91 9010973762 or use our Contact Us form. 🤝" },
      { keys: ['recommend', 'suggestion', 'curated', 'personalised', 'budget'], answer: "Once you share your requirement and budget, our team reviews your needs and provides curated recommendations from our trusted local network in Vizag. You get a tailored shortlist — not a generic directory. The entire consultation is free! 😊" },

      // Support & Contact
      { keys: ['contact', 'email', 'phone', 'call', 'reach', 'support', 'help', 'address', 'office', 'whatsapp'], answer: "You can reach our support team through: 📞 Phone: +91 9010973762 | 📧 Email: support@hallosethu.com or hallosethu9@gmail.com | 📍 Location: Visakhapatnam (Vizag), Andhra Pradesh. We're always happy to help!" },
      { keys: ['hours', 'timing', 'when', 'open', 'available', 'response time'], answer: "Our team aims to respond to all queries promptly. Feel free to drop us a message or call us at +91 9010973762 and we'll get back to you as soon as possible. You can also email support@hallosethu.com. 🕐" },

      // Greetings / General
      { keys: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening'], answer: "Hello! 👋 Welcome to Hallosethu — your trusted local friend in Visakhapatnam (Vizag)! We offer free consultations for Education & Career, Travels, Medical, Real Estate, Health & Wellness, and more. How can I help you today?" },
      { keys: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'helpful'], answer: "You're welcome! 😊 We're always happy to help. Feel free to reach out anytime — call +91 9010973762 or email support@hallosethu.com. Is there anything else I can help you with?" },
    ];

    function getFaqAnswer(text) {
      // Normalise hyphens/underscores to spaces and collapse repeated
      // whitespace so phrasing like "short-stay" still matches a key written
      // as "short stay" (a hyphen vs. space mismatch was silently sending
      // several quick-question chips to the generic fallback below).
      const lower = text.toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
      for (const entry of faqKnowledge) {
        if (entry.keys.some(k => lower.includes(k))) return entry.answer;
      }
      return "I'd be happy to help! We offer free consultations for Education & Career ✅, Travels ✈️, Medical 🏥, Real Estate 🏠, and Health & Wellness 💪 in Visakhapatnam. For specific queries, please call +91 9010973762 or email support@hallosethu.com. 😊";
    }

    function sendAIMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';

      const userMsg = document.createElement('div');
      userMsg.className = 'msg user';
      userMsg.textContent = text;
      chatMessages.appendChild(userMsg);

      const typing = document.createElement('div');
      typing.className = 'msg bot';
      typing.innerHTML = '<i class="fa-solid fa-ellipsis" style="animation:typing 1s infinite"></i> Thinking...';
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        typing.textContent = getFaqAnswer(text);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 600);
    }

    chatSendBtn.addEventListener('click', sendAIMessage);
    chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendAIMessage(); });
    // #tryAI's own inline onclick already opens the floating chat widget —
    // no separate listener here, since a second one previously fired at the
    // same time (scrolling the page to this section AND opening the widget).
