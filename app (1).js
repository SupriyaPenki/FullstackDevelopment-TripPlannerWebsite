/* ============================================
   PlanTripper - App JavaScript
   All data stored in localStorage
   ============================================ */

// ===== DATA =====
const DESTINATIONS = [
    { id: 1, name: 'Goa', state: 'Goa', desc: 'Sun, sand, and vibrant nightlife', price: 6500, rating: 4.7, bestTime: 'Nov - Feb', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', transport: { flight: 3500, train: 1200, bus: 900, car: 4500 }, duration: { flight: '2h', train: '10h', bus: '12h', car: '10h' } },
    { id: 2, name: 'Manali', state: 'Himachal Pradesh', desc: 'Snow-capped mountains and adventure', price: 8500, rating: 4.8, bestTime: 'Oct - Jun', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', transport: { flight: 5000, train: 1500, bus: 800, car: 5000 }, duration: { flight: '2.5h', train: '14h', bus: '16h', car: '12h' } },
    { id: 3, name: 'Jaipur', state: 'Rajasthan', desc: 'The majestic Pink City', price: 5000, rating: 4.6, bestTime: 'Oct - Mar', gradient: 'linear-gradient(135deg, #fa709a, #fee140)', transport: { flight: 3000, train: 800, bus: 600, car: 3000 }, duration: { flight: '1.5h', train: '5h', bus: '6h', car: '5h' } },
    { id: 4, name: 'Kerala', state: 'Kerala', desc: 'God\'s own country with backwaters', price: 12000, rating: 4.9, bestTime: 'Sep - Mar', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', transport: { flight: 4500, train: 1800, bus: 1500, car: 7000 }, duration: { flight: '3h', train: '18h', bus: '20h', car: '16h' } },
    { id: 5, name: 'Ladakh', state: 'Jammu & Kashmir', desc: 'Land of high passes and monasteries', price: 25000, rating: 4.9, bestTime: 'Jun - Sep', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', transport: { flight: 8000, train: null, bus: 2000, car: 8000 }, duration: { flight: '3h', train: null, bus: '24h', car: '20h' } },
    { id: 6, name: 'Varanasi', state: 'Uttar Pradesh', desc: 'The spiritual capital of India', price: 4000, rating: 4.5, bestTime: 'Oct - Mar', gradient: 'linear-gradient(135deg, #f6d365, #fda085)', transport: { flight: 3500, train: 700, bus: 500, car: 3500 }, duration: { flight: '1.5h', train: '8h', bus: '10h', car: '8h' } },
    { id: 7, name: 'Udaipur', state: 'Rajasthan', desc: 'City of lakes and palaces', price: 7000, rating: 4.7, bestTime: 'Sep - Mar', gradient: 'linear-gradient(135deg, #ff9a9e, #fecfef)', transport: { flight: 4000, train: 1000, bus: 700, car: 4000 }, duration: { flight: '2h', train: '7h', bus: '9h', car: '7h' } },
    { id: 8, name: 'Rishikesh', state: 'Uttarakhand', desc: 'Yoga capital and river rafting hub', price: 3500, rating: 4.6, bestTime: 'Sep - Nov', gradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)', transport: { flight: 3000, train: 600, bus: 400, car: 3000 }, duration: { flight: '1.5h', train: '5h', bus: '7h', car: '5h' } },
    { id: 9, name: 'Andaman', state: 'Andaman & Nicobar', desc: 'Pristine beaches and coral reefs', price: 20000, rating: 4.8, bestTime: 'Oct - May', gradient: 'linear-gradient(135deg, #0ba360, #3cba92)', transport: { flight: 7000, train: null, bus: null, car: null }, duration: { flight: '2.5h', train: null, bus: null, car: null } },
    { id: 10, name: 'Darjeeling', state: 'West Bengal', desc: 'Queen of the hills with tea gardens', price: 6000, rating: 4.5, bestTime: 'Mar - May', gradient: 'linear-gradient(135deg, #c471f5, #fa71cd)', transport: { flight: 5000, train: 1200, bus: 900, car: 5500 }, duration: { flight: '2h', train: '10h', bus: '14h', car: '12h' } },
    { id: 11, name: 'Ooty', state: 'Tamil Nadu', desc: 'The queen of hill stations', price: 4500, rating: 4.4, bestTime: 'Oct - Jun', gradient: 'linear-gradient(135deg, #48c6ef, #6f86d6)', transport: { flight: 4000, train: 800, bus: 600, car: 3500 }, duration: { flight: '2h', train: '8h', bus: '10h', car: '8h' } },
    { id: 12, name: 'Agra', state: 'Uttar Pradesh', desc: 'Home of the iconic Taj Mahal', price: 3000, rating: 4.7, bestTime: 'Oct - Mar', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)', transport: { flight: 2500, train: 500, bus: 400, car: 2500 }, duration: { flight: '1h', train: '3h', bus: '4h', car: '3h' } }
];

const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Lucknow', 'Chandigarh', ...DESTINATIONS.map(d => d.name)];

// ===== STATE =====
let state = {
    user: JSON.parse(localStorage.getItem('pt_user')) || null,
    bookings: JSON.parse(localStorage.getItem('pt_bookings')) || [],
    wishlist: JSON.parse(localStorage.getItem('pt_wishlist')) || [],
    preferences: JSON.parse(localStorage.getItem('pt_preferences')) || { transport: 'flight', budget: '10000' },
    selectedTransport: 'flight',
    passengers: { adults: 1, children: 0, infants: 0 },
    calendarMonth: new Date().getMonth(),
    calendarYear: new Date().getFullYear(),
    departDate: null,
    returnDate: null,
    selectingDate: 'depart',
    darkMode: localStorage.getItem('pt_darkmode') === 'true'
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        document.getElementById('pageLoader').classList.add('hidden');
    }, 1800);

    // Dark mode
    if (state.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Init all
    initNavbar();
    initThemeToggle();
    initTransportTabs();
    initSearch();
    initPassengers();
    initCalendar();
    initDestinations();
    initBudget();
    initAuth();
    initProfile();
    initWishlist();
    initHistory();
    initScrollAnimations();
    initModals();
    updateUI();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    document.getElementById('themeToggle').addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
        localStorage.setItem('pt_darkmode', state.darkMode);
    });
}

// ===== TRANSPORT TABS =====
function initTransportTabs() {
    document.querySelectorAll('.transport-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.transport-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.selectedTransport = tab.dataset.transport;
        });
    });
}

// ===== SEARCH =====
function initSearch() {
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');
    const fromSugg = document.getElementById('fromSuggestions');
    const toSugg = document.getElementById('toSuggestions');
    const swapBtn = document.getElementById('swapBtn');
    const searchBtn = document.getElementById('searchBtn');

    function showSuggestions(input, dropdown, query) {
        if (!query) { dropdown.classList.remove('show'); return; }
        const filtered = CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
        if (!filtered.length) { dropdown.classList.remove('show'); return; }
        dropdown.innerHTML = filtered.map(city => `
            <div class="suggestion-item" data-city="${city}">
                <span class="city-icon">&#128205;</span>
                <span>${city}</span>
            </div>
        `).join('');
        dropdown.classList.add('show');
        dropdown.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.dataset.city;
                dropdown.classList.remove('show');
            });
        });
    }

    fromInput.addEventListener('input', () => showSuggestions(fromInput, fromSugg, fromInput.value));
    toInput.addEventListener('input', () => showSuggestions(toInput, toSugg, toInput.value));

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-field')) {
            fromSugg.classList.remove('show');
            toSugg.classList.remove('show');
        }
    });

    swapBtn.addEventListener('click', () => {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
    });

    // Date fields open calendar
    document.getElementById('departDate').addEventListener('click', () => {
        state.selectingDate = 'depart';
        openModal('calendarModal');
    });
    document.getElementById('returnDate').addEventListener('click', () => {
        state.selectingDate = 'return';
        openModal('calendarModal');
    });

    // Search
    searchBtn.addEventListener('click', () => {
        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        let valid = true;

        if (!from) { fromInput.classList.add('error'); valid = false; setTimeout(() => fromInput.classList.remove('error'), 1000); }
        if (!to) { toInput.classList.add('error'); valid = false; setTimeout(() => toInput.classList.remove('error'), 1000); }
        if (!state.departDate) { showToast('Please select a departure date', 'error'); valid = false; }
        if (!valid) return;

        showSearchResults(from, to);
    });
}

// ===== PASSENGERS =====
function initPassengers() {
    const display = document.getElementById('passengerDisplay');
    const dropdown = document.getElementById('passengerDropdown');
    const doneBtn = document.getElementById('passengerDone');

    display.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.passenger-field')) dropdown.classList.remove('show');
    });

    document.querySelectorAll('.counter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.dataset.type;
            const action = btn.dataset.action;
            if (action === 'plus') state.passengers[type]++;
            else if (action === 'minus' && state.passengers[type] > (type === 'adults' ? 1 : 0)) state.passengers[type]--;
            updatePassengerDisplay();
        });
    });

    doneBtn.addEventListener('click', () => dropdown.classList.remove('show'));

    function updatePassengerDisplay() {
        document.getElementById('adultCount').textContent = state.passengers.adults;
        document.getElementById('childCount').textContent = state.passengers.children;
        document.getElementById('infantCount').textContent = state.passengers.infants;
        const total = state.passengers.adults + state.passengers.children + state.passengers.infants;
        const label = total === 1 ? '1 Adult' : `${total} Travelers`;
        document.getElementById('passengerCount').textContent = label;
    }
}

// ===== CALENDAR =====
function initCalendar() {
    renderCalendar();

    document.getElementById('calPrev').addEventListener('click', () => {
        state.calendarMonth--;
        if (state.calendarMonth < 0) { state.calendarMonth = 11; state.calendarYear--; }
        renderCalendar();
    });

    document.getElementById('calNext').addEventListener('click', () => {
        state.calendarMonth++;
        if (state.calendarMonth > 11) { state.calendarMonth = 0; state.calendarYear++; }
        renderCalendar();
    });

    document.getElementById('calDone').addEventListener('click', () => {
        if (state.departDate) document.getElementById('departDate').value = formatDate(state.departDate);
        if (state.returnDate) document.getElementById('returnDate').value = formatDate(state.returnDate);
        closeModal('calendarModal');
    });

    document.getElementById('calendarClose').addEventListener('click', () => closeModal('calendarModal'));
}

function renderCalendar() {
    renderMonth('calMonth1', state.calendarYear, state.calendarMonth);
    let nextMonth = state.calendarMonth + 1;
    let nextYear = state.calendarYear;
    if (nextMonth > 11) { nextMonth = 0; nextYear++; }
    renderMonth('calMonth2', nextYear, nextMonth);
}

function renderMonth(containerId, year, month) {
    const container = document.getElementById(containerId);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = `<div class="calendar-month-title">${monthNames[month]} ${year}</div>`;
    html += `<div class="calendar-weekdays">${dayNames.map(d => `<span>${d}</span>`).join('')}</div>`;
    html += '<div class="calendar-days">';

    for (let i = 0; i < firstDay; i++) {
        html += '<button class="calendar-day empty"></button>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();
        const isSelected = (state.departDate && date.getTime() === state.departDate.getTime()) ||
                           (state.returnDate && date.getTime() === state.returnDate.getTime());
        const isInRange = state.departDate && state.returnDate && date > state.departDate && date < state.returnDate;
        const isRangeStart = state.departDate && date.getTime() === state.departDate.getTime();
        const isRangeEnd = state.returnDate && date.getTime() === state.returnDate.getTime();

        let classes = 'calendar-day';
        if (isPast) classes += ' disabled';
        if (isToday) classes += ' today';
        if (isSelected) classes += ' selected';
        if (isInRange) classes += ' in-range';
        if (isRangeStart) classes += ' range-start';
        if (isRangeEnd) classes += ' range-end';

        html += `<button class="${classes}" data-date="${year}-${month}-${day}" ${isPast ? 'disabled' : ''}>${day}</button>`;
    }

    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.calendar-day:not(.disabled):not(.empty)').forEach(btn => {
        btn.addEventListener('click', () => {
            const [y, m, d] = btn.dataset.date.split('-').map(Number);
            const selectedDate = new Date(y, m, d);

            if (state.selectingDate === 'depart') {
                state.departDate = selectedDate;
                if (state.returnDate && state.returnDate <= selectedDate) state.returnDate = null;
                state.selectingDate = 'return';
            } else {
                if (selectedDate <= state.departDate) {
                    state.departDate = selectedDate;
                    state.returnDate = null;
                    state.selectingDate = 'return';
                } else {
                    state.returnDate = selectedDate;
                    state.selectingDate = 'depart';
                }
            }

            document.getElementById('calDepartDisplay').textContent = state.departDate ? formatDate(state.departDate) : '--';
            document.getElementById('calReturnDisplay').textContent = state.returnDate ? formatDate(state.returnDate) : '--';
            renderCalendar();
        });
    });
}

function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ===== DESTINATIONS =====
function initDestinations() {
    const grid = document.getElementById('destinationsGrid');
    grid.innerHTML = DESTINATIONS.map(dest => `
        <div class="dest-card animate-on-scroll" data-id="${dest.id}">
            <div class="dest-card-bg" style="background: ${dest.gradient};"></div>
            <div class="dest-card-overlay"></div>
            <div class="dest-card-rating">&#9733; ${dest.rating}</div>
            <button class="dest-card-wishlist ${state.wishlist.includes(dest.id) ? 'wishlisted' : ''}" data-id="${dest.id}">
                ${state.wishlist.includes(dest.id) ? '&#10084;' : '&#9825;'}
            </button>
            <div class="dest-card-content">
                <h3>${dest.name}</h3>
                <p>${dest.state} &bull; ${dest.desc}</p>
                <span class="dest-card-price">From &#8377;${dest.price.toLocaleString('en-IN')}</span>
            </div>
        </div>
    `).join('');

    // Card click - open detail modal
    grid.querySelectorAll('.dest-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.dest-card-wishlist')) return;
            const dest = DESTINATIONS.find(d => d.id === parseInt(card.dataset.id));
            showDestinationDetail(dest);
        });
    });

    // Wishlist toggle
    grid.querySelectorAll('.dest-card-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(parseInt(btn.dataset.id));
            btn.classList.toggle('wishlisted');
            btn.innerHTML = btn.classList.contains('wishlisted') ? '&#10084;' : '&#9825;';
            updateWishlistBadge();
        });
    });
}

function showDestinationDetail(dest) {
    const content = document.getElementById('destModalContent');
    const transportRows = Object.entries(dest.transport).map(([mode, price]) => {
        if (!price) return '';
        const icons = { flight: '&#9992;', train: '&#128642;', bus: '&#128652;', car: '&#128663;' };
        return `
            <div class="dest-info-item">
                <label>${icons[mode]} ${mode.charAt(0).toUpperCase() + mode.slice(1)}</label>
                <span>&#8377;${price.toLocaleString('en-IN')} &bull; ${dest.duration[mode]}</span>
            </div>
        `;
    }).join('');

    content.innerHTML = `
        <div class="dest-detail-banner" style="background: ${dest.gradient};">
            <h2>${dest.name}</h2>
        </div>
        <p style="color: var(--text-light); margin-bottom: 8px;">${dest.state}</p>
        <p style="margin-bottom: 20px;">${dest.desc}</p>
        <div style="display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
            <span style="font-size: 14px; color: var(--text-light);">&#9733; ${dest.rating} Rating</span>
            <span style="font-size: 14px; color: var(--text-light);">&#128197; Best: ${dest.bestTime}</span>
            <span style="font-size: 14px; color: var(--primary); font-weight: 600;">From &#8377;${dest.price.toLocaleString('en-IN')}</span>
        </div>
        <h3 style="margin-bottom: 12px;">Transport Options</h3>
        <div class="dest-detail-info">${transportRows}</div>
        <div style="display: flex; gap: 12px; margin-top: 16px;">
            <button class="btn btn-primary" onclick="quickBook('${dest.name}')">Book Now</button>
            <button class="btn btn-outline" onclick="toggleWishlistFromModal(${dest.id})">
                ${state.wishlist.includes(dest.id) ? '&#10084; Wishlisted' : '&#9825; Add to Wishlist'}
            </button>
        </div>
    `;
    openModal('destinationModal');
}

function quickBook(destName) {
    closeModal('destinationModal');
    document.getElementById('toInput').value = destName;
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    showToast('Destination set! Fill in other details and search.', 'info');
}

function toggleWishlistFromModal(destId) {
    toggleWishlist(destId);
    const dest = DESTINATIONS.find(d => d.id === destId);
    showDestinationDetail(dest);
    initDestinations();
    initScrollAnimations();
}

// ===== BUDGET =====
function initBudget() {
    const slider = document.getElementById('budgetSlider');
    const valueDisplay = document.getElementById('budgetValue');

    slider.addEventListener('input', () => {
        valueDisplay.textContent = parseInt(slider.value).toLocaleString('en-IN');
        document.querySelectorAll('.budget-card').forEach(card => {
            const budget = parseInt(card.dataset.budget);
            card.classList.toggle('active', parseInt(slider.value) >= budget && parseInt(slider.value) < budget * 2.5);
        });
    });

    document.querySelectorAll('.budget-card .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const budget = parseInt(btn.closest('.budget-card').dataset.budget);
            slider.value = budget;
            valueDisplay.textContent = budget.toLocaleString('en-IN');
            document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ===== SEARCH RESULTS =====
function showSearchResults(from, to) {
    const section = document.getElementById('resultsSection');
    const container = document.getElementById('comparisonCards');
    const dest = DESTINATIONS.find(d => d.name.toLowerCase() === to.toLowerCase());

    const transportData = [
        { mode: 'Flight', icon: '&#9992;', price: dest ? dest.transport.flight : 4000 + Math.random() * 6000, duration: dest ? dest.duration.flight : '2-3h', comfort: 'High', available: true },
        { mode: 'Train', icon: '&#128642;', price: dest ? dest.transport.train : 500 + Math.random() * 1500, duration: dest ? dest.duration.train : '8-12h', comfort: 'Medium', available: dest ? dest.transport.train !== null : true },
        { mode: 'Bus', icon: '&#128652;', price: dest ? dest.transport.bus : 400 + Math.random() * 1200, duration: dest ? dest.duration.bus : '10-16h', comfort: 'Basic', available: dest ? dest.transport.bus !== null : true },
        { mode: 'Car', icon: '&#128663;', price: dest ? dest.transport.car : 2000 + Math.random() * 5000, duration: dest ? dest.duration.car : '8-14h', comfort: 'Flexible', available: dest ? dest.transport.car !== null : true }
    ].filter(t => t.available);

    // Find best pick (cheapest that fits budget)
    const budget = parseInt(document.getElementById('budgetSlider').value) || 10000;
    const affordable = transportData.filter(t => t.price <= budget);
    const bestPick = affordable.length > 0 ?
        affordable.reduce((a, b) => a.price < b.price ? a : b) :
        transportData.reduce((a, b) => a.price < b.price ? a : b);

    container.innerHTML = transportData.map(t => `
        <div class="comp-card glass-card ${t.mode === bestPick.mode ? 'best-pick' : ''}">
            ${t.mode === bestPick.mode ? '<div class="best-badge">Best Pick</div>' : ''}
            <div class="comp-card-icon">${t.icon}</div>
            <h3>${t.mode}</h3>
            <div class="comp-card-stat"><span>Price</span><span>&#8377;${Math.round(t.price).toLocaleString('en-IN')}</span></div>
            <div class="comp-card-stat"><span>Duration</span><span>${t.duration || 'N/A'}</span></div>
            <div class="comp-card-stat"><span>Comfort</span><span>${t.comfort}</span></div>
            <button class="btn btn-primary" onclick="bookTrip('${from}', '${to}', '${t.mode}', ${Math.round(t.price)})">Book ${t.mode}</button>
        </div>
    `).join('');

    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth' });
}

// ===== BOOKING =====
function bookTrip(from, to, mode, price) {
    if (!state.user) {
        showToast('Please login to book a trip', 'error');
        openModal('authModal');
        return;
    }

    const booking = {
        id: Date.now(),
        from,
        to,
        mode,
        price,
        date: state.departDate ? formatDate(state.departDate) : 'Not set',
        returnDate: state.returnDate ? formatDate(state.returnDate) : 'N/A',
        passengers: state.passengers.adults + state.passengers.children + state.passengers.infants,
        status: 'upcoming',
        bookedOn: new Date().toLocaleDateString()
    };

    state.bookings.push(booking);
    localStorage.setItem('pt_bookings', JSON.stringify(state.bookings));

    // Show confirmation
    const ticket = document.getElementById('ticketCard');
    ticket.innerHTML = `
        <div class="ticket-row"><span>Booking ID</span><span>#PT${booking.id.toString().slice(-6)}</span></div>
        <div class="ticket-row"><span>Route</span><span>${from} &#8594; ${to}</span></div>
        <div class="ticket-row"><span>Transport</span><span>${mode}</span></div>
        <div class="ticket-row"><span>Departure</span><span>${booking.date}</span></div>
        <div class="ticket-row"><span>Return</span><span>${booking.returnDate}</span></div>
        <div class="ticket-row"><span>Passengers</span><span>${booking.passengers}</span></div>
        <div class="ticket-row" style="font-size: 18px; padding-top: 12px; border-top: 2px solid var(--border);"><span>Total</span><span style="color: var(--success);">&#8377;${price.toLocaleString('en-IN')}</span></div>
    `;

    openModal('bookingModal');
    document.getElementById('bookingDone').onclick = () => {
        closeModal('bookingModal');
        showToast('Booking confirmed! Check your booking history.', 'success');
    };
}

// ===== AUTH =====
function initAuth() {
    document.getElementById('loginBtn').addEventListener('click', () => {
        if (state.user) {
            openModal('profileModal');
            populateProfile();
        } else {
            openModal('authModal');
        }
    });

    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Login
    document.getElementById('loginSubmit').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        let valid = true;

        document.getElementById('loginEmailError').textContent = '';
        document.getElementById('loginPasswordError').textContent = '';

        if (!email || !email.includes('@')) {
            document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
            document.getElementById('loginEmail').classList.add('error');
            setTimeout(() => document.getElementById('loginEmail').classList.remove('error'), 1000);
            valid = false;
        }
        if (!password || password.length < 4) {
            document.getElementById('loginPasswordError').textContent = 'Password must be at least 4 characters';
            document.getElementById('loginPassword').classList.add('error');
            setTimeout(() => document.getElementById('loginPassword').classList.remove('error'), 1000);
            valid = false;
        }
        if (!valid) return;

        // Check localStorage for registered user
        const stored = JSON.parse(localStorage.getItem('pt_registered_users')) || [];
        const user = stored.find(u => u.email === email);

        if (user && user.password === password) {
            state.user = { name: user.name, email: user.email, phone: user.phone };
        } else if (!user) {
            // Auto-login for demo
            state.user = { name: email.split('@')[0], email, phone: '' };
        } else {
            document.getElementById('loginPasswordError').textContent = 'Incorrect password';
            return;
        }

        localStorage.setItem('pt_user', JSON.stringify(state.user));
        closeModal('authModal');
        updateUI();
        showToast(`Welcome back, ${state.user.name}!`, 'success');
    });

    // Register
    document.getElementById('regSubmit').addEventListener('click', () => {
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const password = document.getElementById('regPassword').value.trim();
        let valid = true;

        ['regNameError', 'regEmailError', 'regPhoneError', 'regPasswordError'].forEach(id =>
            document.getElementById(id).textContent = '');

        if (!name) {
            document.getElementById('regNameError').textContent = 'Name is required';
            document.getElementById('regName').classList.add('error');
            setTimeout(() => document.getElementById('regName').classList.remove('error'), 1000);
            valid = false;
        }
        if (!email || !email.includes('@')) {
            document.getElementById('regEmailError').textContent = 'Valid email is required';
            document.getElementById('regEmail').classList.add('error');
            setTimeout(() => document.getElementById('regEmail').classList.remove('error'), 1000);
            valid = false;
        }
        if (!phone || phone.length < 10) {
            document.getElementById('regPhoneError').textContent = 'Valid phone number is required';
            document.getElementById('regPhone').classList.add('error');
            setTimeout(() => document.getElementById('regPhone').classList.remove('error'), 1000);
            valid = false;
        }
        if (!password || password.length < 6) {
            document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters';
            document.getElementById('regPassword').classList.add('error');
            setTimeout(() => document.getElementById('regPassword').classList.remove('error'), 1000);
            valid = false;
        }
        if (!valid) return;

        // Save to registered users
        const stored = JSON.parse(localStorage.getItem('pt_registered_users')) || [];
        if (stored.find(u => u.email === email)) {
            document.getElementById('regEmailError').textContent = 'Email already registered';
            return;
        }

        stored.push({ name, email, phone, password });
        localStorage.setItem('pt_registered_users', JSON.stringify(stored));

        state.user = { name, email, phone };
        localStorage.setItem('pt_user', JSON.stringify(state.user));

        closeModal('authModal');
        updateUI();
        showToast(`Welcome to PlanTripper, ${name}!`, 'success');
    });

    document.getElementById('authClose').addEventListener('click', () => closeModal('authModal'));
}

// ===== PROFILE =====
function initProfile() {
    document.getElementById('profileNavBtn').addEventListener('click', () => {
        if (state.user) {
            populateProfile();
            openModal('profileModal');
        } else {
            openModal('authModal');
        }
    });

    document.getElementById('profileClose').addEventListener('click', () => closeModal('profileModal'));

    document.getElementById('saveProfile').addEventListener('click', () => {
        if (!state.user) return;
        state.user.name = document.getElementById('editName').value || state.user.name;
        state.user.phone = document.getElementById('editPhone').value || state.user.phone;
        localStorage.setItem('pt_user', JSON.stringify(state.user));
        updateUI();
        showToast('Profile updated!', 'success');
    });

    document.getElementById('savePrefs').addEventListener('click', () => {
        state.preferences.transport = document.getElementById('prefTransport').value;
        state.preferences.budget = document.getElementById('prefBudget').value;
        localStorage.setItem('pt_preferences', JSON.stringify(state.preferences));
        showToast('Preferences saved!', 'success');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        state.user = null;
        localStorage.removeItem('pt_user');
        closeModal('profileModal');
        updateUI();
        showToast('Logged out successfully', 'info');
    });
}

function populateProfile() {
    if (!state.user) return;
    document.getElementById('profileName').textContent = state.user.name;
    document.getElementById('profileEmail').textContent = state.user.email;
    document.getElementById('editName').value = state.user.name;
    document.getElementById('editEmail').value = state.user.email;
    document.getElementById('editPhone').value = state.user.phone || '';
    document.getElementById('prefTransport').value = state.preferences.transport;
    document.getElementById('prefBudget').value = state.preferences.budget;
}

// ===== WISHLIST =====
function initWishlist() {
    document.getElementById('wishlistNavBtn').addEventListener('click', () => {
        renderWishlist();
        openModal('wishlistModal');
    });

    document.getElementById('wishlistClose').addEventListener('click', () => closeModal('wishlistModal'));
}

function toggleWishlist(destId) {
    const idx = state.wishlist.indexOf(destId);
    if (idx > -1) {
        state.wishlist.splice(idx, 1);
    } else {
        state.wishlist.push(destId);
    }
    localStorage.setItem('pt_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadge();
}

function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    if (!state.wishlist.length) {
        grid.innerHTML = `<div class="empty-state"><div class="empty-icon">&#128148;</div><h3>Your wishlist is empty</h3><p>Start adding destinations you love!</p></div>`;
        return;
    }

    grid.innerHTML = state.wishlist.map(id => {
        const dest = DESTINATIONS.find(d => d.id === id);
        if (!dest) return '';
        return `
            <div class="wishlist-card">
                <div class="wishlist-card-bg" style="background: ${dest.gradient}; border-radius: var(--radius) var(--radius) 0 0;"></div>
                <div class="wishlist-card-content">
                    <h4>${dest.name}</h4>
                    <p>${dest.state} &bull; From &#8377;${dest.price.toLocaleString('en-IN')}</p>
                    <div class="wishlist-card-actions">
                        <button class="btn btn-primary btn-sm" onclick="quickBook('${dest.name}'); closeModal('wishlistModal');">Book</button>
                        <button class="wishlist-remove" onclick="removeFromWishlist(${dest.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function removeFromWishlist(destId) {
    toggleWishlist(destId);
    renderWishlist();
    initDestinations();
    initScrollAnimations();
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    badge.textContent = state.wishlist.length;
    badge.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
}

// ===== HISTORY =====
function initHistory() {
    document.getElementById('historyNavBtn').addEventListener('click', () => {
        renderHistory();
        openModal('historyModal');
    });

    document.getElementById('historyClose').addEventListener('click', () => closeModal('historyModal'));
}

function renderHistory() {
    const timeline = document.getElementById('historyTimeline');
    if (!state.bookings.length) {
        timeline.innerHTML = `<div class="empty-state"><div class="empty-icon">&#128203;</div><h3>No bookings yet</h3><p>Your travel history will appear here</p></div>`;
        return;
    }

    const icons = { Flight: '&#9992;', Train: '&#128642;', Bus: '&#128652;', Car: '&#128663;' };

    timeline.innerHTML = state.bookings.slice().reverse().map(b => `
        <div class="history-item">
            <span class="status ${b.status}">${b.status}</span>
            <h4>${icons[b.mode] || ''} ${b.from} &#8594; ${b.to}</h4>
            <div class="history-item-details">
                <span>&#128197; ${b.date}</span>
                <span>&#128101; ${b.passengers} passenger(s)</span>
                <span>&#128176; &#8377;${b.price.toLocaleString('en-IN')}</span>
                <span>&#128203; Booked: ${b.bookedOn}</span>
            </div>
        </div>
    `).join('');
}

// ===== MODALS =====
function initModals() {
    document.getElementById('destModalClose').addEventListener('click', () => closeModal('destinationModal'));
    document.getElementById('bookingClose').addEventListener('click', () => closeModal('bookingModal'));

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(m => closeModal(m.id));
        }
    });
}

function openModal(id) {
    document.getElementById(id).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
    // Only restore scroll if no other modals are open
    if (!document.querySelector('.modal-overlay.show')) {
        document.body.style.overflow = '';
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ===== UI UPDATE =====
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (state.user) {
        loginBtn.textContent = state.user.name.split(' ')[0];
        loginBtn.title = `Logged in as ${state.user.email}`;
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.textContent = 'Login / Sign Up';
        loginBtn.title = 'Login or create an account';
        logoutBtn.style.display = 'none';
        document.getElementById('profileName').textContent = 'Guest User';
        document.getElementById('profileEmail').textContent = 'Please login to access your profile';
    }

    updateWishlistBadge();
}

// ===== TOAST =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '&#10004;', error: '&#10008;', info: '&#9432;' };
    toast.innerHTML = `<span>${icons[type] || ''}</span> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastSlide 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== DEAL TIMERS =====
(function initDealTimers() {
    document.querySelectorAll('.deal-timer').forEach(timer => {
        let hours = parseInt(timer.dataset.hours);
        let mins = 59, secs = 59;
        const span = timer.querySelector('.timer-text');

        setInterval(() => {
            secs--;
            if (secs < 0) { secs = 59; mins--; }
            if (mins < 0) { mins = 59; hours--; }
            if (hours < 0) { hours = 0; mins = 0; secs = 0; }
            span.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    });
})();
