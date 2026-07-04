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
        beauty: {
            title: "YOA für Wellness- & Beauty-Salons",
            lead: "Verpassen Sie keine Terminanfrage für Massagen, Kosmetikbehandlungen, Nagelpflege oder Haarschnitte. YOA bucht Termine 24/7 über Telefon und WhatsApp.",
            uses: [
                "<strong>24/7 Terminbuchung:</strong> Buchen, Verschieben und Stornieren direkt im Chat oder Anruf.",
                "<strong>Mitarbeiter-Matching:</strong> Buchungen gezielt bei der Wunsch-Stylistin oder dem Wunsch-Masseur.",
                "<strong>DSGVO-Datenschutz:</strong> Keine Speicherung sensibler Gesundheitsakten, sicherer Schutz von Standarddaten.",
                "<strong>No-Show Reduzierung:</strong> Interaktive WhatsApp-Erinnerungen für Ihre Kunden."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo! Kann ich morgen Nachmittag eine 60-minütige Aromaöl-Massage buchen?' },
                { type: 'ai', text: 'Guten Tag! Morgen Nachmittag um 15:30 Uhr haben wir einen freien Termin bei unserer Masseurin Elena. Passt Ihnen das?' },
                { type: 'incoming', text: 'Ja, das passt perfekt. Ich bin allerdings schwanger - geht das bei dieser Massage?' },
                { type: 'ai', text: 'Herzlichen Glückwunsch! Um Ihre Sicherheit zu garantieren, sollte unser Team diese Frage persönlich beantworten. Ich buche den Termin gerne vorab für Sie und leite Ihre Frage sofort zur Klärung weiter. Ist das in Ordnung?' },
                { type: 'incoming', text: 'Ja, danke, das ist super.' },
                { type: 'system', text: '✓ Termin reserviert & Schwangerschafts-Rückfrage direkt an Mitarbeiter eskaliert.' }
            ]
        },
        fitness: {
            title: "YOA für Fitness- & Coaching-Studios",
            lead: "Automatisieren Sie den Check-in für Probetrainings, Kurse und Personal Trainings. YOA beantwortet Fragen zu Kurszeiten, Preisen und Abos.",
            uses: [
                "<strong>Kursplan-Auskunft:</strong> Sofortige Beantwortung von Fragen zu Kurszeiten (z. B. Yoga, Pilates).",
                "<strong>Probetraining-Intake:</strong> Erfassung von Trainingszielen und Buchung von Einführungsstunden.",
                "<strong>Mitglieder-FAQ:</strong> Beantwortung wiederkehrender Fragen zu Kündigungen und Tarifen.",
                "<strong>WhatsApp-Checkin:</strong> Zusendung von Buchungscodes direkt aufs Handy."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo, ich würde gerne Yoga ausprobieren. Kann ich ein Probetraining machen?' },
                { type: 'ai', text: 'Hi! Ja, super gerne. Wir haben am Donnerstag um 18:00 Uhr einen Einsteiger-Vinyasa-Kurs. Möchtest du dich dafür anmelden?' },
                { type: 'incoming', text: 'Ja, das klingt gut. Ich habe allerdings Knieprobleme - ist der Kurs geeignet?' },
                { type: 'ai', text: 'Vielen Dank für den Hinweis. Gesundheitliche Fragen bespricht unser Trainer-Team am besten direkt mit dir vor Ort. Ich buche dich für den Kurs ein und gebe dem Trainer Bescheid, damit er dich vor der Stunde kurz ansprechen kann. Passt das?' },
                { type: 'system', text: '✓ Platz im Yoga-Kurs gebucht & Knie-Hinweis für den Trainer eskaliert.' }
            ]
        },
        craft: {
            title: "YOA für Werkstätten & Handwerksbetriebe",
            lead: "Entlasten Sie Ihr Team in der Werkstatt vom Telefonstress. YOA vergibt Termine für Reifenwechsel, Inspektion oder Reparaturen vollautomatisch.",
            uses: [
                "<strong>Terminvergabe ohne Störung:</strong> Keine Unterbrechungen beim Schrauben – YOA bucht direkt in den Werkstattkalender.",
                "<strong>Statusabfragen:</strong> Kunden können fragen: 'Ist mein Auto fertig?' – YOA liest den Status aus Ihrem System.",
                "<strong>Rückruf-Warteschlange:</strong> Strukturierte Aufnahme komplexer Reparaturwünsche für gezielte Rückrufe des Meisters.",
                "<strong>Lexware/sevdesk-Sync:</strong> Automatische Anlage von Kunden- und Auftragsdaten in Ihrer Buchhaltung."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo, mein Auto braucht einen Ölwechsel. Habt ihr nächste Woche Zeit?' },
                { type: 'ai', text: 'Hallo! Ja, gerne. Für den Ölwechsel haben wir am nächsten Dienstag um 09:00 Uhr oder Donnerstag um 14:00 Uhr einen freien Werkstattplatz. Welcher Termin passt Ihnen?' },
                { type: 'incoming', text: 'Dienstag um 9 Uhr passt. Mein Getriebe knackt auch ein bisschen - könnt ihr danach schauen?' },
                { type: 'ai', text: 'Alles klar, den Ölwechsel trage ich ein. Wegen des Getriebeknackens wird sich unser Werkstattmeister Herr Müller kurz persönlich bei Ihnen melden, um das genauer zu besprechen. Ich habe Ihre Nummer weitergeleitet.' },
                { type: 'system', text: '✓ Ölwechsel-Termin gebucht & Getriebe-Rückruf-Ticket für Meister erstellt.' }
            ]
        },
        service: {
            title: "YOA für Fahrschulen, Coaching & Dienstleister",
            lead: "Automatisieren Sie die Erstanmeldung und Lead-Erfassung. YOA nimmt Anfragen rund um die Uhr auf und trägt Leads direkt in Ihr CRM ein.",
            uses: [
                "<strong>Lead-Erfassung 24/7:</strong> Qualifizierung von Anfragen (Führerscheinklasse, Coaching-Paket, Budget) zu jeder Uhrzeit.",
                "<strong>Erstgespräche buchen:</strong> Direkte Vergabe von Beratungsterminen bei freien Beratern oder Fahrlehrern.",
                "<strong>DSGVO-konforme Dokumentation:</strong> Sichere Erfassung aller Kontaktdaten im CRM (HubSpot/Pipedrive).",
                "<strong>FAQ-Beantwortung:</strong> Sofortige Infos zu Preisen, Schulungszeiten, Ablauf und Voraussetzungen."
            ],
            chat: [
                { type: 'incoming', text: 'Hallo, ich würde mich gerne für den Führerschein Klasse B anmelden. Was kostet das?' },
                { type: 'ai', text: 'Guten Tag! Gerne helfen wir Ihnen. Unser Grundbetrag für Klasse B liegt bei 350 € zzgl. Fahrstunden. Möchten Sie einen kurzen Info-Termin mit unserem Fahrlehrer buchen?' },
                { type: 'incoming', text: 'Ja, gerne. Habt ihr auch Abendtermine?' },
                { type: 'ai', text: 'Ja, wir bieten auch Termine abends an. Am Donnerstag um 18:30 Uhr ist ein Fahrlehrer frei. Soll ich Sie einbuchen?' },
                { type: 'system', text: '✓ Info-Termin für Fahrschule gebucht & Lead in HubSpot angelegt.' }
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
        renderVerticalChat(verticalData.beauty.chat, initialChatContainer);
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
            text: 'Das passt perfekt! Ich habe allerdings starke Rückenschmerzen wegen eines Bandscheibenvorfalls. Kann ich die Massage trotzdem machen?',
            duration: 2000
        },
        {
            type: 'ai',
            text: 'Vielen Dank für den Hinweis. Gesundheitliche Fragen sollte unser Team persönlich mit Ihnen besprechen. Ich reserviere den Termin um 14:00 Uhr vorab und leite Ihre Frage direkt an unsere Therapeuten weiter, damit wir Sie kontaktieren können. Wie lautet Ihr Name?',
            duration: 3500
        },
        {
            type: 'incoming',
            text: 'Mein Name ist Sarah König. Ich stimme der DSGVO-Verarbeitung für meine Kontaktdaten zu.',
            duration: 2200
        },
        {
            type: 'ai',
            text: 'Vielen Dank, Frau König. Der Termin am Samstag um 14:00 Uhr bei Elena ist vorab reserviert und unser Team meldet sich in Kürze wegen Ihrer Rückfrage.',
            duration: 2500
        },
        {
            type: 'system',
            text: '✓ Termin reserviert: Elena (Samstag, 14:00 Uhr, Massage-Raum 2)',
            duration: 1200
        },
        {
            type: 'system',
            text: '✓ Eskalation: Gesundheitliche Rückfrage (Rückenschmerzen) an Team weitergeleitet',
            duration: 1200
        },
        {
            type: 'system',
            text: '✓ DSGVO-Verschlüsselung: Kontaktdaten sicher in deutscher Cloud gespeichert',
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
