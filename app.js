document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Industry Switcher (Verticals)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    const verticalData = {
        massage: {
            title: "YOA für Massage- & Wellnessstudios",
            lead: "Sichern Sie sich jede Massagebuchung, auch außerhalb Ihrer Öffnungszeiten. Die KI berät zu Massagen, findet freie Therapeuten und bucht Termine direkt in Ihrem Kalender.",
            uses: [
                "<strong>24/7 Terminbuchung:</strong> Buchen, Verschieben und Stornieren von Massagen direkt über WhatsApp oder Telefon.",
                "<strong>Therapeuten- & Raumplanung:</strong> Die KI berücksichtigt Arbeitszeiten der Therapeuten und die Verfügbarkeit von Massageräumen.",
                "<strong>Präferenz-Erfassung:</strong> DSGVO-konforme Speicherung von Behandlungsnotizen, Öl-Vorlieben oder Allergien.",
                "<strong>Automatische Erinnerungen:</strong> WhatsApp-Reminders reduzieren No-Shows um bis zu 85%."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo! Kann ich morgen Nachmittag eine 60-minütige Aromaöl-Massage buchen?' },
                { type: 'ai', text: 'Guten Tag! Morgen Nachmittag um 15:30 Uhr haben wir einen freien Termin bei unserer Masseurin Elena. Passt Ihnen das?' },
                { type: 'incoming', text: 'Ja, das passt perfekt. Können wir Lavendelöl nutzen?' },
                { type: 'ai', text: 'Sehr gerne, ich habe Elena Bescheid gegeben und Lavendelöl in Ihren Behandlungsnotizen vermerkt. Der Termin ist für Sie gebucht!' },
                { type: 'system', text: '✓ Terminslot bei Elena blockiert & Lavendelöl-Wunsch DSGVO-konform in der Kundenkartei hinterlegt.' }
            ]
        },

        spa: {
            title: "YOA für Kosmetik- & Beauty-Salons",
            lead: "Erreichen Sie 100% Buchungsquote für Gesichtsbehandlungen, Maniküre und Stylings. Die KI beantwortet Fragen zu Inhaltsstoffen und empfiehlt die passenden Treatments.",
            uses: [
                "<strong>Treatment-Beratung:</strong> Sofortige Auskunft über Dauer, Preise, Treatments und verwendete Kosmetikprodukte.",
                "<strong>Umsatzsteigerung durch Upsells:</strong> Vorschlag passender Zusatzbehandlungen (z. B. Augenbrauen-Styling).",
                "<strong>Mitarbeiter-Matching:</strong> Buchung direkt bei der Wunsch-Stylistin oder dem Wunsch-Kosmetiker.",
                "<strong>Erinnerungs-Service:</strong> Automatisches Einholen von Terminbestätigungen zur Vermeidung von Leerlauf."
            ],
            chat: [
                { type: 'incoming', text: 'Hi, was kostet bei euch ein Hydrafacial und wie lange dauert das?' },
                { type: 'ai', text: 'Hallo! Unser Hydrafacial Classic kostet 119 € und dauert ca. 60 Minuten. Möchten Sie direkt einen freien Termin dafür ansehen?' },
                { type: 'incoming', text: 'Ja gerne, am liebsten diesen Freitag nach 15 Uhr.' },
                { type: 'ai', text: 'Am Freitag um 16:30 Uhr hat Julia noch einen Termin frei. Soll ich diesen für Sie reservieren?' },
                { type: 'system', text: '✓ Hydrafacial bei Julia gebucht & Bestätigung per WhatsApp gesendet.' }
            ]
        },
        yoga: {
            title: "YOA für Yoga, Pilates & Fitness",
            lead: "Automatisieren Sie den Check-in für Probetrainings und Kurse. Die KI klärt Fragen zu Mitgliedschaften, Preisen und Kursplänen rund um die Uhr.",
            uses: [
                "<strong>Probetraining-Intake:</strong> Erfassung von Fitnesszielen, Vorkenntnissen und Buchen von Einführungsstunden.",
                "<strong>Kursplan-Auskunft:</strong> Sofortige Beantwortung von Fragen wie: 'Wann findet der nächste Vinyasa-Yoga-Kurs statt?'",
                "<strong>Mitgliedschafts-FAQ:</strong> Beantwortung von Fragen zu Kündigungsfristen, Tarifen und Pausen.",
                "<strong>WhatsApp-Marketing:</strong> DSGVO-konforme Ankündigung von Specials und Workshops (nur mit Double Opt-In)."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo, ich würde gerne Yoga ausprobieren. Kann ich ein Probetraining machen?' },
                { type: 'ai', text: 'Hi! Ja, super gerne. Wir haben am Donnerstag um 18:00 Uhr einen Einsteiger-Vinyasa-Kurs. Möchtest du dich dafür anmelden?' },
                { type: 'incoming', text: 'Ja, das klingt gut. Ich bin Anfänger, ist das okay?' },
                { type: 'ai', text: 'Absolut! Der Kurs ist perfekt für Anfänger geeignet. Ich habe dich eingebucht. Bring bitte bequeme Kleidung mit, Matten haben wir vor Ort.' },
                { type: 'system', text: '✓ Probetraining im Vinyasa-Kurs eingetragen & Check-in-Code per WhatsApp verschickt.' }
            ]
        }
    };

    function renderVerticalChat(chatArray, container) {
        container.innerHTML = '';
        chatArray.forEach(msg => {
            const msgEl = document.createElement('div');
            if (msg.type === 'incoming') {
                msgEl.className = 'msg msg-incoming';
                msgEl.innerText = msg.text;
            } else if (msg.type === 'ai') {
                msgEl.className = 'msg msg-ai';
                msgEl.innerText = msg.text;
            } else if (msg.type === 'system') {
                msgEl.className = 'msg msg-system';
                msgEl.innerText = msg.text;
            }
            container.appendChild(msgEl);
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const verticalKey = btn.getAttribute('data-vertical');
            
            // Toggle active buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get content containers
            const currentTab = document.querySelector('.tab-content.active');
            const data = verticalData[verticalKey];
            
            if (data && currentTab) {
                // Update text content with animation
                const infoContainer = currentTab.querySelector('.vertical-info');
                infoContainer.style.opacity = 0;
                
                setTimeout(() => {
                    infoContainer.querySelector('h3').innerText = data.title;
                    infoContainer.querySelector('.lead-text').innerText = data.lead;
                    
                    const list = infoContainer.querySelector('.use-case-list');
                    list.innerHTML = '';
                    data.uses.forEach(use => {
                        const li = document.createElement('li');
                        li.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><div>${use}</div>`;
                        list.appendChild(li);
                    });
                    
                    // Render mock chat
                    const chatContainer = currentTab.querySelector('.chat-messages');
                    renderVerticalChat(data.chat, chatContainer);
                    
                    infoContainer.style.opacity = 1;
                    infoContainer.style.transition = 'opacity 0.3s ease';
                }, 150);
            }
        });
    });

    // Initialize first chat render
    const initialChatContainer = document.querySelector('.tab-content.active .chat-messages');
    if (initialChatContainer) {
        renderVerticalChat(verticalData.massage.chat, initialChatContainer);
    }

    // Dynamic Live Simulator Logic - Massage booking & GDPR
    const simSteps = [
        {
            type: 'incoming',
            text: 'Hallo, ich würde gerne eine 90-Minuten-Ganzkörpermassage für Samstag buchen. Habt ihr da einen Termin frei?',
            duration: 2000
        },
        {
            type: 'ai',
            text: 'Hallo! Ja, sehr gerne. Am Samstag um 14:00 Uhr haben wir noch einen freien Slot bei unserer Masseurin Elena. Würde Ihnen das passen?',
            duration: 2500
        },
        {
            type: 'incoming',
            text: 'Das passt perfekt! Ist Elena eine zertifizierte Masseurin?',
            duration: 1500
        },
        {
            type: 'ai',
            text: 'Ja, Elena ist staatlich anerkannte Masseurin mit 5 Jahren Erfahrung. Zur Buchung benötige ich noch Ihren Namen und Ihr kurzes Einverständnis (Opt-in) für unsere DSGVO-konformen Termin-Erinnerungen.',
            duration: 3000
        },
        {
            type: 'incoming',
            text: 'Mein Name ist Sarah König. Ich stimme der DSGVO-Verarbeitung für meine Buchung und Erinnerungen per WhatsApp zu.',
            duration: 2200
        },
        {
            type: 'ai',
            text: 'Super, vielen Dank Frau König! Der Termin am Samstag um 14:00 Uhr bei Elena ist fest für Sie gebucht. Ich habe Ihnen die Bestätigung gerade per WhatsApp zugeschickt.',
            duration: 2500
        },
        {
            type: 'system',
            text: '✓ Kalender blockiert: Elena (Samstag, 14:00 Uhr, Massage-Raum 2)',
            duration: 1200
        },
        {
            type: 'system',
            text: '✓ DSGVO-Opt-In: Einverständnis von Sarah König verschlüsselt protokolliert',
            duration: 1200
        },
        {
            type: 'system',
            text: '✓ Kundendaten-Schutz: Kundenkartei verschlüsselt in deutscher Cloud angelegt',
            duration: 1800
        }
    ];

    const simBody = document.getElementById('sim-body');
    const simDots = document.querySelectorAll('.sim-dot');
    let simInterval = null;
    let currentSimStep = 0;

    function runSimulator() {
        if (currentSimStep >= simSteps.length) {
            // Reset
            simBody.innerHTML = '';
            simDots.forEach(dot => dot.className = 'sim-dot');
            currentSimStep = 0;
        }

        const step = simSteps[currentSimStep];
        
        // Update Dots
        simDots.forEach((dot, index) => {
            if (index === currentSimStep) {
                dot.className = 'sim-dot active';
            } else if (index < currentSimStep) {
                dot.className = 'sim-dot completed';
            } else {
                dot.className = 'sim-dot';
            }
        });

        // Create Message Element
        const msgEl = document.createElement('div');
        if (step.type === 'incoming') {
            msgEl.className = 'sim-msg sim-msg-in';
            msgEl.innerText = step.text;
        } else if (step.type === 'ai') {
            msgEl.className = 'sim-msg sim-msg-out';
            msgEl.innerText = step.text;
        } else if (step.type === 'system') {
            msgEl.className = 'sim-action-log';
            msgEl.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${step.text}`;
        }
        
        simBody.appendChild(msgEl);
        simBody.scrollTop = simBody.scrollHeight;

        currentSimStep++;
        
        // Schedule next step
        simInterval = setTimeout(runSimulator, step.duration);
    }

    // Start simulator
    runSimulator();

    // ROI Calculator Section
    const sliderCalls = document.getElementById('slider-calls');
    const sliderValue = document.getElementById('slider-value');
    const sliderLeadValue = document.getElementById('slider-lead-value');
    const sliderLeadValueText = document.getElementById('slider-lead-value-text');
    const sliderConvRate = document.getElementById('slider-conv-rate');
    const sliderConvRateText = document.getElementById('slider-conv-rate-text');

    const roiRevenue = document.getElementById('roi-revenue');
    const roiHours = document.getElementById('roi-hours');
    const roiNet = document.getElementById('roi-net');
    const roiX = document.getElementById('roi-x');

    function calculateROI() {
        const missedCalls = parseInt(sliderCalls.value);
        const leadValue = parseInt(sliderLeadValue.value);
        const convRate = parseInt(sliderConvRate.value) / 100;

        // Update Slider labels
        sliderValue.innerText = missedCalls;
        sliderLeadValueText.innerText = `${leadValue} €`;
        sliderConvRateText.innerText = `${sliderConvRate.value} %`;

        // ROI calculation:
        // Let's assume YOA answers and saves 85% of missed calls
        const capturedCalls = missedCalls * 0.85;
        const wonLeads = capturedCalls * convRate;
        const recoveredRevenue = Math.round(wonLeads * leadValue);
        
        // Time saved: e.g., 10 minutes per call/message conversation
        const timeSavedMinutes = capturedCalls * 12;
        const timeSavedHours = Math.round(timeSavedMinutes / 60);

        // Core SaaS is 299€/month
        const saasCost = 299;
        const netProfit = Math.max(0, recoveredRevenue - saasCost);
        const roiFactor = saasCost > 0 ? (recoveredRevenue / saasCost).toFixed(1) : 0;

        // Update numbers on page
        roiRevenue.innerText = `${recoveredRevenue.toLocaleString('de-DE')} €`;
        roiHours.innerText = `${timeSavedHours} Std.`;
        roiNet.innerText = `${netProfit.toLocaleString('de-DE')} €`;
        roiX.innerText = `${roiFactor}x`;
    }

    if (sliderCalls && sliderLeadValue && sliderConvRate) {
        sliderCalls.addEventListener('input', calculateROI);
        sliderLeadValue.addEventListener('input', calculateROI);
        sliderConvRate.addEventListener('input', calculateROI);
        // Run initial calculation
        calculateROI();
    }

    // Pricing Switcher
    const pricingSwitch = document.getElementById('pricing-switch');
    const toggleMonthly = document.getElementById('toggle-monthly');
    const toggleAnnual = document.getElementById('toggle-annual');
    
    const priceCore = document.getElementById('price-core');
    const pricePro = document.getElementById('price-pro');
    const priceMulti = document.getElementById('price-multi');
    const periodLabels = document.querySelectorAll('.price-period');

    const pricingPlans = {
        monthly: {
            core: "299",
            pro: "499",
            multi: "899",
            period: "/ Monat"
        },
        annual: {
            core: "249", // €2,990 / year
            pro: "419",  // €4,990 / year
            multi: "749", // €8,990 / year
            period: "/ Monat*"
        }
    };

    function updatePricing(isAnnual) {
        const plans = isAnnual ? pricingPlans.annual : pricingPlans.monthly;
        
        priceCore.innerText = plans.core;
        pricePro.innerText = plans.pro;
        priceMulti.innerText = plans.multi;
        
        periodLabels.forEach(label => {
            label.innerText = plans.period;
        });

        if (isAnnual) {
            pricingSwitch.classList.add('active');
            toggleAnnual.classList.add('active');
            toggleMonthly.classList.remove('active');
        } else {
            pricingSwitch.classList.remove('active');
            toggleAnnual.classList.remove('active');
            toggleMonthly.classList.add('active');
        }
    }

    if (pricingSwitch) {
        pricingSwitch.addEventListener('click', () => {
            const isAnnual = !pricingSwitch.classList.contains('active');
            updatePricing(isAnnual);
        });

        toggleMonthly.addEventListener('click', () => updatePricing(false));
        toggleAnnual.addEventListener('click', () => updatePricing(true));
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Lead Capture Modal
    const modal = document.getElementById('demo-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.querySelector('.modal-close');
    const leadForm = document.getElementById('lead-form');
    const successScreen = document.getElementById('success-screen');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            
            // Pre-select plan if clicked from pricing card
            const planName = btn.getAttribute('data-plan');
            const selectEl = document.getElementById('interest');
            if (planName && selectEl) {
                selectEl.value = planName;
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                leadForm.style.display = 'block';
                successScreen.style.display = 'none';
                leadForm.reset();
            }, 300);
        });
    }

    // Close modal on background click
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                leadForm.style.display = 'block';
                successScreen.style.display = 'none';
                leadForm.reset();
            }, 300);
        });
    }

    // Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate API Call
            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;

            setTimeout(() => {
                leadForm.style.display = 'none';
                successScreen.style.display = 'block';
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }
});
