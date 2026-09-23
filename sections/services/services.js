    function openServiceSegment(key) {
      // For non-education services, open the edu overlay with segment detail
      document.getElementById('eduOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      // Show category view but immediately open segment
      document.querySelectorAll('.edu-view').forEach(v => v.classList.remove('active'));
      document.getElementById('view-category').classList.add('active');
      openSegmentDetail(key);
    }
