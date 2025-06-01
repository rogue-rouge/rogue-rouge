class NavCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');
    const title = this.getAttribute('title') || 'Navigation';

    const colours = {
      a: { bg: '#ffe5e1', card: '#ff6f61', text: '#3a0000', shadow: 'rgba(255, 111, 97, 0.5)' },
      b: { bg: '#ede9ff', card: '#6a5acd', text: '#1c183d', shadow: 'rgba(106, 90, 205, 0.5)' },
      c: { bg: '#e0f7f5', card: '#20b2aa', text: '#00332f', shadow: 'rgba(32, 178, 170, 0.5)' },
      d: { bg: '#fff5e0', card: '#ffa500', text: '#3a2a00', shadow: 'rgba(255, 165, 0, 0.5)' },
      e: { bg: '#e0f5e9', card: '#2e8b57', text: '#00331e', shadow: 'rgba(46, 139, 87, 0.5)' }
    };

    this.shadowRoot.innerHTML = `
      <style>
        .nav-card {
          background-color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: background-color 0.5s, color 0.5s, box-shadow 0.5s, transform 0.3s;
        }
        .nav-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          transition: color 0.5s;
        }
        .nav-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        .nav-links a {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #e0e0e0;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s;
        }
        .nav-links a:hover {
          transform: scale(1.1);
        }
        .nav-links a::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .nav-links a:hover::after {
          opacity: 1;
        }
        .nav-links img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      </style>
      <div class="nav-card">
        <div class="nav-title">${title}</div>
        <div class="nav-links">
          ${items.map(i => `<a data-page="${i.page}" data-tooltip="${i.tooltip}"><img src="${i.img}" alt="${i.tooltip}"></a>`).join('')}
        </div>
      </div>
    `;

    const card = this.shadowRoot.querySelector('.nav-card');
    const navTitle = this.shadowRoot.querySelector('.nav-title');
    const links = this.shadowRoot.querySelectorAll('.nav-links a');
    const body = document.body;

    links.forEach(link => {
      const page = link.dataset.page;
      const applyTheme = () => {
        const c = colours[page];
        body.style.backgroundColor = c.bg;
        card.style.backgroundColor = c.card;
        navTitle.style.color = c.text;
        card.style.boxShadow = `0 12px 30px ${c.shadow}`;
        card.style.transform = 'scale(1.05)';
        setTimeout(() => card.style.transform = 'scale(1)', 300);
      };
      link.addEventListener('mouseenter', applyTheme);
      link.addEventListener('click', applyTheme);
    });
  }
}

customElements.define('nav-card', NavCard);