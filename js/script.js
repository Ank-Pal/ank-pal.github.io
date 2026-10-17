// ==========================================
//  Typing Animation
// ==========================================
const typingPhrases = [
    'Data Analyst (2.8+ Yrs Exp)',
    'SQL Server & Database Testing',
    'Power BI & Tableau Specialist',
    'ETL / ELT Pipeline Builder',
    'Python & ARIMA Forecasting'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// Start typing after page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 800);
});

// ==========================================
//  Navigation — Scroll Effect
// ==========================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ==========================================
//  Mobile Menu Toggle
// ==========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ==========================================
//  Scroll Animations (Intersection Observer)
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ==========================================
//  Stat Counter Animation
// ==========================================
function animateCounter(el) {
    const isFloat = el.getAttribute('data-decimals') === '1';
    const target = isFloat ? parseFloat(el.getAttribute('data-target')) : parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Trigger counter when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => animateCounter(counter));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==========================================
//  Active Nav Link Highlighting
// ==========================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.style.color = 'var(--text-primary)';
            } else {
                link.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ==========================================
//  Smooth Scroll for Safari fallback
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
//  Case Study Modal Controller & Data
// ==========================================
const caseStudyData = {
    'hr-attrition': {
        title: 'Employee Attrition Risk Model & People Analytics',
        category: 'Predictive Modeling · Kimball Star Schema · Power BI DAX',
        badge: '86% Holdout Accuracy · 3.4× Risk Multiplier',
        badgeClass: 'badge-rose',
        liveUrl: 'projects/hr-attrition/index.html',
        githubUrl: 'https://github.com/ank-pal/hr-attrition-risk-dashboard',
        stats: [
            { num: '86.05%', label: 'Holdout Accuracy' },
            { num: '0.84', label: 'ROC-AUC Score' },
            { num: '3.40×', label: 'Overtime Risk Spike' },
            { num: '$12.6M', label: 'Financial Exposure' }
        ],
        images: [
            { title: 'Cohort Risk Matrix', src: 'assets/projects/hr-attrition/02_overtime_income_cohort_risk.png' },
            { title: 'Feature Odds Ratios', src: 'assets/projects/hr-attrition/04_feature_odds_ratios.png' },
            { title: 'ROC & PR Curves', src: 'assets/projects/hr-attrition/03_logistic_regression_roc_pr_curve.png' },
            { title: 'Department Heatmap', src: 'assets/projects/hr-attrition/05_department_risk_heatmap.png' },
            { title: 'Confusion Matrix', src: 'assets/projects/hr-attrition/06_attrition_confusion_matrix.png' }
        ],
        tabs: {
            problem: `
                <h4>Executive Problem Statement</h4>
                <p>Enterprise attrition represents one of the most volatile unbudgeted expenses in modern corporate operations, with replacement costs averaging <strong>1.5× annual salary</strong> per departure. This project investigated voluntary turnover across <strong>1,470 enterprise employees</strong> to identify root causes and build an early-warning flight risk system.</p>
                <ul>
                    <li><strong>Key Finding:</strong> Employees working overtime with below-median income (&lt;$4,919/mo) exhibit a staggering <strong>43.1% attrition rate</strong>—a <strong>3.40× surge</strong> over baseline peers (12.7%).</li>
                    <li><strong>Compensation Buffer:</strong> Overtime employees paid above-median income experience only 24.7% attrition, demonstrating that competitive compensation mitigates over 43% of overtime burnout.</li>
                    <li><strong>Retention Anchor:</strong> Stock option grants serve as the primary defensive anchor (Odds Ratio = 0.58, reducing turnover odds by 42% per tier).</li>
                </ul>
            `,
            architecture: `
                <h4>Data Engineering & Kimball Star Schema</h4>
                <p>The raw IBM dataset (35 features) was processed through a 4-tier Python pipeline into an enterprise <strong>SQLite dimensional star schema data warehouse</strong>:</p>
                <ul>
                    <li><code>FactEmployeeRetention</code>: Central fact table storing tenure metrics, flight risk probabilities, and replacement liability.</li>
                    <li><code>DimDepartment</code> &amp; <code>DimJobRole</code>: Dimension tables capturing compensation bands, travel frequency, and departmental hierarchies.</li>
                    <li><code>DimCompensationTier</code> &amp; <code>DimSatisfactionMetrics</code>: Dimensions mapping work-life balance, job satisfaction, and stock option levels.</li>
                    <li>SQL transformations utilized advanced CTEs, <code>NTILE(4)</code> salary quartiles, and window functions to compute departmental benchmarks.</li>
                </ul>
            `,
            modeling: `
                <h4>Econometric Modeling & Statistical Validation</h4>
                <p>Trained and cross-validated an econometric <strong>Logistic Regression model</strong> with balanced weighting and L2 regularization:</p>
                <ul>
                    <li><strong>Holdout Accuracy:</strong> 86.05% on stratified 80/20 test split (N_test = 294).</li>
                    <li><strong>ROC-AUC:</strong> 0.84, confirming robust discriminative capability.</li>
                    <li><strong>Hypothesis Testing:</strong> Chi-square test on Overtime × Low-Income cohort yielded &chi;&sup2; = 126.8, p &lt; 10&supmin;&sup2;&sup5;, verifying statistical significance.</li>
                    <li><strong>Feature Significance:</strong> Mandatory Overtime (&beta; = +1.42, OR = 4.14), Single Marital Status (&beta; = +0.89, OR = 2.44), and Distance from Home (&beta; = +0.38, OR = 1.46) emerged as primary flight catalysts.</li>
                </ul>
            `,
            bi: `
                <h4>Power BI Intelligence & Production DAX</h4>
                <p>Constructed an executive People Analytics dashboard powered by <strong>25+ production DAX measures</strong>:</p>
                <ul>
                    <li><code>[Cohort Attrition Rate]</code>: Dynamic calculation evaluating churn across selected department and tenure slices.</li>
                    <li><code>[Flight Risk Exposure $]</code>: Modeled financial replacement exposure using SHRM industry multipliers (1.5 &times; Salary).</li>
                    <li><code>[Overtime Risk Multiplier]</code>: Dynamic ratio comparing active filtered segment against company-wide baseline.</li>
                    <li>Interactive slicers for Department, Tenure, Income Tier, and Overtime status enable HR Business Partners to pinpoint immediate flight risks.</li>
                </ul>
            `,
            recommendations: `
                <h4>Actionable HR Interventions & ROI</h4>
                <p>Targeted interventions prioritize high-ROI retention strategies rather than blanket pay raises:</p>
                <ul>
                    <li><strong>Immediate Overtime Cap:</strong> Cap mandatory overtime for non-exempt employees earning below $5,000/month or implement an overtime hazard bonus.</li>
                    <li><strong>Equity Anchoring:</strong> Deploy Tier-1 stock options to key mid-level contributors at 2-3 year tenure milestones.</li>
                    <li><strong>Sales Role Redesign:</strong> Entry-level Sales Representatives showed 39.8% churn; restructuring commission pacing into quarterly milestones directly curbs early departures.</li>
                    <li><strong>Projected ROI:</strong> Mitigating just 15 high-risk departures saves the organization an estimated <strong>$1.1M annually</strong> in recruiting and onboarding costs.</li>
                </ul>
            `
        }
    },
    'ecommerce-revenue': {
        title: 'Customer Revenue Segmentation & Logistics Intelligence',
        category: 'Pareto RFM Analytics · Kimball Star Schema · Tableau',
        badge: '116K+ Orders · 94K Customers · Pareto RFM',
        badgeClass: 'badge-amber',
        liveUrl: 'projects/ecommerce-revenue/index.html',
        githubUrl: 'https://github.com/ank-pal/ecommerce-revenue-segmentation',
        stats: [
            { num: '116,967', label: 'Delivered Orders' },
            { num: '94,200', label: 'Unique Customers' },
            { num: 'R$15.8M', label: 'Total Analyzed GMV' },
            { num: '2.1×', label: 'VIP Churn Sensitivity' }
        ],
        images: [
            { title: 'Churn Sensitivity by Tier', src: 'assets/projects/ecommerce-revenue/churn_sensitivity_by_tier.png' },
            { title: 'RFM Revenue Distribution', src: 'assets/projects/ecommerce-revenue/rfm_revenue_distribution.png' }
        ],
        tabs: {
            problem: `
                <h4>Executive Problem Statement</h4>
                <p>E-commerce marketplaces often treat delivery SLA breaches uniformly, failing to understand how delivery delays disproportionately impact high-value customers. Analyzing <strong>116,967 authentic orders</strong> across <strong>94,200 unique consumers</strong> in Brazil (Olist marketplace), this project mapped revenue concentration and churn vulnerability.</p>
                <ul>
                    <li><strong>The Pareto Concentration:</strong> The top 20% of customers (Champions &amp; Loyalists) drive over <strong>56% of total Gross Merchandise Value (GMV)</strong>.</li>
                    <li><strong>Asymmetric Churn Sensitivity:</strong> High-tier VIP customers have zero patience for late delivery; their churn sensitivity index is <strong>2.1× higher</strong> than one-time bargain seekers.</li>
                    <li><strong>Logistics Bottleneck:</strong> While Southeast hubs (São Paulo, Rio) average 8.4 days delivery, northern regions (Amapá, Roraima) exceed 24+ days with catastrophic NPS drops.</li>
                </ul>
            `,
            architecture: `
                <h4>SQL Window Functions & Star Schema</h4>
                <p>Modeled an enterprise SQLite Star Schema data warehouse with normalized dimensions and high-performance indices:</p>
                <ul>
                    <li><code>FactOrders</code>: Captures order values, freight costs, fulfillment timestamps, and delivery latencies.</li>
                    <li><code>DimCustomer</code> &amp; <code>DimGeography</code>: Geographic hierarchy mapping zip codes, states, and regional distribution corridors.</li>
                    <li>SQL Pipeline: Utilized <code>NTILE(5)</code> window functions over Recency, Frequency, and Monetary dimensions to construct a 5&times;5&times;5 RFM scoring matrix.</li>
                </ul>
            `,
            modeling: `
                <h4>Cohort Segmentation & Survival Dynamics</h4>
                <p>Customers were categorized into 6 distinct behavioral tiers: Champions, Loyal Customers, Potential Loyalists, At Risk, Hibernating, and Lost:</p>
                <ul>
                    <li><strong>Delivery Delay Regression:</strong> Quantified correlation between delivery delay (actual vs estimated delivery date) and review ratings (r = -0.68).</li>
                    <li><strong>Repeat Purchase Threshold:</strong> Customers experiencing an on-time first delivery have a <strong>3.2× higher probability</strong> of making a second purchase within 180 days.</li>
                </ul>
            `,
            bi: `
                <h4>Tableau Regional Logistics Dashboard</h4>
                <p>Interactive executive dashboard featuring:</p>
                <ul>
                    <li>State-level choropleth heatmaps comparing average freight cost and delivery transit times across Brazil.</li>
                    <li>RFM customer tier migration matrix showing quarterly customer lifecycle transitions.</li>
                    <li>Dynamic delay tolerance simulator demonstrating revenue at risk when regional transit times slip.</li>
                </ul>
            `,
            recommendations: `
                <h4>Commercial & Fulfillment Strategy</h4>
                <p>Actionable operational directives:</p>
                <ul>
                    <li><strong>Priority Carrier Routing:</strong> Automatically route orders from "Champions" and "Loyal Customers" through premium logistics couriers with guaranteed 48-hour fulfillment.</li>
                    <li><strong>Proactive Delay Compensation:</strong> Trigger automated discount vouchers before delivery date breach occurs for VIP customers to neutralize churn sentiment.</li>
                    <li><strong>Regional Fulfillment Hub:</strong> Establish micro-fulfillment nodes in Northeast Brazil to compress regional shipping times from 22 days down to 6 days.</li>
                </ul>
            `
        }
    },
    'ipl-analytics': {
        title: 'IPL Sports Intelligence & Econometric Time-Series',
        category: 'Ball-by-Ball Analytics · Phase ARIMA · Plotly Interactive',
        badge: '283K+ Balls · 1,193 Matches · Phase ARIMA',
        badgeClass: 'badge-sky',
        liveUrl: 'https://ankur-pal-ipl-analytics.streamlit.app/',
        githubUrl: 'https://github.com/ank-pal/ipl-timeseries-analytics',
        stats: [
            { num: '283,000+', label: 'Ball-by-Ball Records' },
            { num: '1,193', label: 'Matches Profiled' },
            { num: '18', label: 'IPL Seasons (2008-2026)' },
            { num: '85%+', label: 'ARIMA Holdout Accuracy' }
        ],
        images: [
            { title: 'Toss & Chase Paradigm', src: 'assets/projects/ipl-analytics/rolling_chase_vs_toss.png' },
            { title: 'ARIMA Run-Rate Forecast', src: 'assets/projects/ipl-analytics/arima_runrate_forecast.png' },
            { title: 'Phase Run-Rate Trajectories', src: 'assets/projects/ipl-analytics/phase_runrate_trajectories.png' },
            { title: 'Death Overs Strike Kings', src: 'assets/projects/ipl-analytics/death_overs_strike_rate_kings.png' },
            { title: 'Venue Chase Bias', src: 'assets/projects/ipl-analytics/venue_chase_bias.png' },
            { title: 'Top POTM Awards', src: 'assets/projects/ipl-analytics/top_potm_awards.png' }
        ],
        tabs: {
            problem: `
                <h4>Sports Analytics Problem Statement</h4>
                <p>The Indian Premier League is the world's most lucrative cricket league, yet conventional punditry relies heavily on superficial metrics like total runs or toss outcome. This project performed a ball-by-ball econometric analysis of <strong>283,000+ deliveries</strong> across <strong>1,193 matches</strong> from 2008 through the ongoing 2026 season.</p>
                <ul>
                    <li><strong>The Toss Paradox Shift:</strong> From 2008–2015, winning the toss conferred a <strong>54.8% match win rate</strong>. Post-2016, this statistical advantage eroded to <strong>50.4%</strong> as tactical bowling rotations and boundary-clearing power neutralized dew and toss factors.</li>
                    <li><strong>The Impact Player Explosion:</strong> Since the 2023 introduction of the Impact Player rule, Death Overs (16–20) run rates escalated from ~9.4 RPO to over <strong>11.25+ RPO</strong>.</li>
                    <li><strong>Super Over Lore:</strong> Full tactical documentation of all 15 historic tied Super Overs, including the legendary 2020 MI vs KXIP Double Super Over.</li>
                </ul>
            `,
            architecture: `
                <h4>Database Pipeline & CricSheet Ingestion</h4>
                <p>Engineered an end-to-end Python pipeline transforming raw CricSheet ball-by-ball JSON into a master SQLite relational database:</p>
                <ul>
                    <li>Normalized schema covering <code>matches</code>, <code>deliveries</code>, <code>champions</code>, <code>super_overs</code>, and <code>player_stats</code>.</li>
                    <li>Indexed on match ID, batter, bowler, innings, and over phase for sub-5ms query response times across 283K+ records.</li>
                    <li>SQL window functions compute rolling averages, phase run rates, and cumulative strike rates.</li>
                </ul>
            `,
            modeling: `
                <h4>ARIMA Time-Series Modeling & Validation</h4>
                <p>Formulated an econometric time-series pipeline using <code>statsmodels</code> to forecast innings run-rates:</p>
                <ul>
                    <li><strong>Stationarity Verification:</strong> Augmented Dickey-Fuller (ADF) test (p &lt; 0.01) confirmed series stationarity after first-order differencing.</li>
                    <li><strong>Order Selection:</strong> Autocorrelation (ACF) and Partial Autocorrelation (PACF) diagnostics identified optimal ARIMA(1,1,1) model parameters.</li>
                    <li><strong>Accuracy:</strong> Achieved &gt;85% holdout accuracy forecasting 5-year rolling run-rate trajectories across Powerplay, Middle, and Death phases.</li>
                </ul>
            `,
            bi: `
                <h4>Plotly & Streamlit Interactive Architecture</h4>
                <p>Built a responsive sports analytics web suite:</p>
                <ul>
                    <li>Interactive phase trajectory charts tracking team scoring velocity from Over 1 to 20.</li>
                    <li>Venue chase bias matrix contrasting Chinnaswamy (chase-heavy) vs Chepauk (defend-heavy).</li>
                    <li>Career impact cards for all 788 cricketers with death-overs economy and boundary frequency filters.</li>
                </ul>
            `,
            recommendations: `
                <h4>Franchise Strategy Takeaways</h4>
                <p>Empirical tactical guidelines for T20 team management:</p>
                <ul>
                    <li><strong>De-prioritize Toss Bias:</strong> Tactical execution and designated phase hitters drive win probability significantly more than the toss decision.</li>
                    <li><strong>Death Overs Specialist Premium:</strong> Hitters scoring &gt;180 strike rate in overs 16–20 provide an incremental 14.2 runs per innings compared to top-order anchors.</li>
                    <li><strong>Middle-Overs Spin Choke:</strong> Wrist-spinners operating in overs 7–15 concede 1.4 fewer runs per over while generating 28% higher dot-ball percentage.</li>
                </ul>
            `
        }
    }
};

let currentProjectId = null;

function openCaseStudy(projectId) {
    const data = caseStudyData[projectId];
    if (!data) return;

    currentProjectId = projectId;
    const modal = document.getElementById('caseStudyModal');
    if (!modal) return;

    // Header & Meta
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalLiveBtn').href = data.liveUrl;
    document.getElementById('modalGithubBtn').href = data.githubUrl;

    // Stats Grid
    const statsContainer = document.getElementById('modalStatsGrid');
    statsContainer.innerHTML = data.stats.map(s => `
        <div class="modal-stat-card">
            <div class="modal-stat-number">${s.num}</div>
            <div class="modal-stat-label">${s.label}</div>
        </div>
    `).join('');

    // Gallery
    const mainImg = document.getElementById('modalMainImage');
    mainImg.src = data.images[0].src;
    mainImg.alt = data.images[0].title;

    const thumbsContainer = document.getElementById('modalThumbnails');
    thumbsContainer.innerHTML = data.images.map((img, i) => `
        <button class="modal-thumb-btn ${i === 0 ? 'active' : ''}" onclick="switchModalImage('${img.src}', this)">
            ${img.title}
        </button>
    `).join('');

    // Tabs Content
    document.getElementById('tabProblem').innerHTML = data.tabs.problem;
    document.getElementById('tabArchitecture').innerHTML = data.tabs.architecture;
    document.getElementById('tabModeling').innerHTML = data.tabs.modeling;
    document.getElementById('tabBI').innerHTML = data.tabs.bi;
    document.getElementById('tabRecommendations').innerHTML = data.tabs.recommendations;

    // Reset active tab to first
    switchModalTab('problem');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
    const modal = document.getElementById('caseStudyModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function switchModalImage(src, btn) {
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.src = src;
    }
    document.querySelectorAll('.modal-thumb-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function switchModalTab(tabKey) {
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    const activePane = document.getElementById('tab' + tabKey.charAt(0).toUpperCase() + tabKey.slice(1));
    if (activePane) {
        activePane.classList.add('active');
    }
}

// Close on ESC key or clicking outside container
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCaseStudy();
    }
});

const modalOverlay = document.getElementById('caseStudyModal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeCaseStudy();
        }
    });
}

