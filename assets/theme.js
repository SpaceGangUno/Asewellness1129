// Theme JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS === 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@next/dist/aos.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = function() {
      AOS.init({
        once: true,
        offset: 50,
        duration: 1000
      });
    };
    document.head.appendChild(script);
  }
});

// Handle mobile menu
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Alpine === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js';
    script.defer = true;
    document.head.appendChild(script);
  }
});

// Product image gallery
document.addEventListener('DOMContentLoaded', function() {
  const productGallery = document.querySelector('.product-gallery');
  if (productGallery) {
    const mainImage = productGallery.querySelector('.main-image');
    const thumbnails = productGallery.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const newSrc = this.getAttribute('data-full-size');
        const newAlt = this.getAttribute('alt');
        mainImage.setAttribute('src', newSrc);
        mainImage.setAttribute('alt', newAlt);
        
        // Update active state
        thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-offset-2', 'ring-green-500'));
        this.classList.add('ring-2', 'ring-offset-2', 'ring-green-500');
      });
    });
  }
});

// Variant selector
document.addEventListener('DOMContentLoaded', function() {
  const variantSelector = document.querySelector('#Variant');
  if (variantSelector) {
    variantSelector.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      const price = selectedOption.getAttribute('data-price');
      const comparePrice = selectedOption.getAttribute('data-compare-price');
      const available = selectedOption.getAttribute('data-available') === 'true';
      
      // Update price
      const priceElement = document.querySelector('.product-price');
      if (priceElement) {
        priceElement.textContent = price;
      }
      
      // Update compare at price
      const comparePriceElement = document.querySelector('.product-compare-price');
      if (comparePriceElement) {
        comparePriceElement.textContent = comparePrice || '';
        comparePriceElement.style.display = comparePrice ? 'block' : 'none';
      }
      
      // Update add to cart button
      const addToCartButton = document.querySelector('.add-to-cart-button');
      if (addToCartButton) {
        addToCartButton.disabled = !available;
        addToCartButton.textContent = available ? 'Add to cart' : 'Sold out';
      }
    });
  }
});

// Announcement bar auto-hide
document.addEventListener('DOMContentLoaded', function() {
  const announcementBar = document.querySelector('.announcement-bar');
  if (announcementBar) {
    const closeButton = announcementBar.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        announcementBar.style.height = announcementBar.offsetHeight + 'px';
        requestAnimationFrame(() => {
          announcementBar.style.height = '0';
          announcementBar.addEventListener('transitionend', function() {
            announcementBar.remove();
          }, { once: true });
        });
      });
    }
  }
});

// Sticky header
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('is-hidden');
        return;
      }
      
      if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
        // Scrolling down
        header.classList.add('is-hidden');
      } else if (currentScroll < lastScroll) {
        // Scrolling up
        header.classList.remove('is-hidden');
      }
      
      lastScroll = currentScroll;
    });
  }
});
