    // ===== FAQ JS =====
    function switchFaqGroup(btn, group) {
      document.querySelectorAll('.faq-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.faq-group').forEach(g => g.classList.remove('active'));
      const target = document.getElementById('faqg-' + group);
      if (target) target.classList.add('active');
    }

    function toggleFaq(btn) {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close siblings in same group
      item.closest('.faq-group, .mini-faq').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }
