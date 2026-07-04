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
        immobilien: {
            title: "KI-Büro für Immobilienmakler & Hausverwaltungen",
            lead: "Erreichen Sie eine lückenlose Erreichbarkeit für Miet- und Kaufinteressenten. Ihr KI-Assistent qualifiziert Anfragen vor und bucht Besichtigungstermine direkt in Ihrem Kalender.",
            uses: [
                "<strong>24/7 Lead-Intake:</strong> Erfassung von Suchprofilen, Budget und Kontaktdaten zu jeder Tageszeit.",
                "<strong>Automatische Terminbuchung:</strong> Direktes Anbieten und Buchen von Besichtigungsterminen aus Ihrem Google- oder Outlook-Kalender.",
                "<strong>Objekt-Routing:</strong> Weiterleitung qualifizierter Anfragen an die zuständigen Makler.",
                "<strong>CRM-Synchronisation:</strong> Sofortiges Anlegen von Kontakten und Notizen in HubSpot oder Pipedrive."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo, ich interessiere mich für die 3-Zimmer-Wohnung in der Hauptstraße. Gibt es nächste Woche Besichtigungstermine?' },
                { type: 'ai', text: 'Guten Tag! Ja, sehr gerne. Für dieses Objekt habe ich noch freie Termine am Dienstag um 14:00 Uhr und am Donnerstag um 10:00 Uhr. Passt einer dieser Termine für Sie?' },
                { type: 'incoming', text: 'Dienstag um 14:00 Uhr passt sehr gut bei mir.' },
                { type: 'ai', text: 'Perfekt. Ich habe Sie für Dienstag, den 7. Juli um 14:00 Uhr eingetragen. Eine Bestätigung inklusive Adresse habe ich Ihnen per SMS und E-Mail geschickt.' },
                { type: 'system', text: '✓ Besichtigungstermin gebucht & Kontaktdaten in HubSpot eingetragen' }
            ]
        },
        kfz: {
            title: "KI-Büro für KFZ-Werkstätten & Autohäuser",
            lead: "Entlasten Sie Ihr Werkstatt-Team vom ständigen Telefonklingeln. Lassen Sie die KI Termine vergeben, Statusabfragen beantworten und Notfälle richtig zuweisen.",
            uses: [
                "<strong>Terminannahme ohne Stress:</strong> Werkstatt-Vorgespräche für Service, Reifenwechsel oder TÜV vollautomatisch abwickeln.",
                "<strong>Statusabfragen:</strong> Kunden können per Telefon oder WhatsApp fragen: 'Ist mein Auto schon fertig?'",
                "<strong>Rückruf-Queue:</strong> Strukturierte Erfassung von komplexen Fällen, damit Ihr Meister gezielt zurückrufen kann.",
                "<strong>Lexware/sevdesk-Integration:</strong> Vorbereitung von Kundendaten für die Rechnungserstellung."
            ],
            chat: [
                { type: 'incoming', text: 'Moin, ich müsste einen Termin für den Reifenwechsel bei meinem VW Golf buchen. Habt ihr nächste Woche Zeit?' },
                { type: 'ai', text: 'Hallo! Na klar, Reifenwechsel machen wir gerne. Nächste Woche hätte ich Mittwoch um 09:00 Uhr oder Freitag um 14:30 Uhr frei. Welchen Slot bevorzugen Sie?' },
                { type: 'incoming', text: 'Lieber den Mittwoch um 09:00 Uhr, bitte.' },
                { type: 'ai', text: 'Alles klar, ist für Mittwoch um 09:00 Uhr reserviert. Bitte bringen Sie Ihre Felgenschlösser mit. Sie erhalten gleich eine Bestätigung per WhatsApp.' },
                { type: 'system', text: '✓ Werkstatt-Termin im Kalender eingetragen & Kundendetails in Lexware hinterlegt' }
            ]
        },
        beauty: {
            title: "KI-Büro für Beauty, Wellness & Fitness",
            lead: "Verwandeln Sie WhatsApp-Chats und Anrufe außerhalb der Öffnungszeiten in feste Buchungen. Reduzieren Sie No-Shows durch automatische, interaktive Erinnerungen.",
            uses: [
                "<strong>Terminbuchung & Umbuchung:</strong> 24/7 self-service über WhatsApp oder Telefon.",
                "<strong>No-Show Reduzierung:</strong> Interaktive SMS- oder WhatsApp-Erinnerungen mit Bestätigungs-Link.",
                "<strong>FAQ-Beantwortung:</strong> Sofortige Auskunft über Preise, Parkplätze, Gutscheine und Behandlungsdetails.",
                "<strong>Team-Verteilung:</strong> Zuweisung von Buchungen an bestimmte Therapeuten, Trainer oder Stylisten."
            ],
            chat: [
                { type: 'incoming', text: 'Hi! Kann ich für morgen Nachmittag spontan eine 60-Minuten-Wellnessmassage buchen?' },
                { type: 'ai', text: 'Hallo! Morgen Nachmittag um 15:30 Uhr hat unsere Masseurin Elena einen freien Termin. Möchten Sie diesen fest buchen?' },
                { type: 'incoming', text: 'Ja super, das nehme ich!' },
                { type: 'ai', text: 'Hervorragend, der Termin bei Elena für morgen um 15:30 Uhr steht. Wir freuen uns auf Sie! Eine Bestätigung ist unterwegs.' },
                { type: 'system', text: '✓ Massage-Termin gebucht & Kalender von Elena blockiert' }
            ]
        },
        b2b: {
            title: "KI-Büro für B2B-Dienstleister & Servicebetriebe",
            lead: "Qualifizieren Sie eingehende B2B-Leads vollautomatisch vor. Das KI-Büro erfasst die Projektgröße, das Budget und trägt qualifizierte Leads direkt als Deal im CRM ein.",
            uses: [
                "<strong>Erstqualifizierung:</strong> Gezieltes Abfragen von Anforderungen, Mitarbeiteranzahl und Zeithorizont.",
                "<strong>CRM-Lead-Erstellung:</strong> Automatischer Sync aller Anrufe/Chats mit HubSpot oder Pipedrive inklusive Zusammenfassung.",
                "<strong>Direkte Ersttermine:</strong> Weiterleitung an den passenden Vertriebsmitarbeiter mit freiem Kalenderslot.",
                "<strong>Kein Lead-Verlust:</strong> Jede Anfrage wird sofort erfasst, verarbeitet und dokumentiert."
            ],
            chat: [
                { type: 'incoming', text: 'Guten Tag, wir benötigen eine Beratung für eine IT-Infrastruktur-Erweiterung für ca. 30 Arbeitsplätze.' },
                { type: 'ai', text: 'Guten Tag! Gerne helfen wir Ihnen dabei. Nutzen Sie aktuell primär On-Premise-Server oder eine Cloud-Infrastruktur wie Azure oder AWS?' },
                { type: 'incoming', text: 'Wir sind komplett in der Microsoft Cloud (Azure & M365).' },
                { type: 'ai', text: 'Verstanden. Ich erstelle ein Ticket für unser Cloud-Team. Wann passt Ihnen ein 15-minütiges Erstgespräch mit unserem Experten Herr Müller am Donnerstag?' },
                { type: 'system', text: '✓ B2B-Lead qualifiziert, Deal in Pipedrive angelegt & Task für Vertrieb erstellt' }
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
        renderVerticalChat(verticalData.immobilien.chat, initialChatContainer);
    }

    // Dynamic Live Simulator Logic
    const simSteps = [
        {
            type: 'incoming',
            text: 'Hallo, ich bräuchte dringend einen Termin für eine Beratung.',
            duration: 1500
        },
        {
            type: 'ai',
            text: 'Hallo! Sehr gerne helfe ich Ihnen. Um welchen Bereich geht es und wann passt es Ihnen am besten?',
            duration: 2000
        },
        {
            type: 'incoming',
            text: 'Es geht um eine Projektberatung, idealerweise diesen Freitagvormittag.',
            duration: 1500
        },
        {
            type: 'ai',
            text: 'Freitag um 10:00 Uhr habe ich noch einen freien Termin für Sie. Ich habe diesen reserviert und schicke Ihnen die Bestätigung.',
            duration: 2000
        },
        {
            type: 'system',
            text: '✓ Google Calendar: Termin am Freitag um 10:00 Uhr eingetragen.',
            duration: 1000
        },
        {
            type: 'system',
            text: '✓ HubSpot: Neuer Lead erstellt & Kontaktdaten synchronisiert.',
            duration: 1000
        },
        {
            type: 'system',
            text: '✓ Team-Notiz: E-Mail-Zusammenfassung an Mitarbeiter gesendet.',
            duration: 1500
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

    // Start simulator and restart if visible
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
        // Let's assume the KI-Büro answers and saves 85% of missed calls
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
