// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Boost Your Funding Prospects with IziKemp!",
        description:
          "Access cutting-edge simulators and instantly generate personalized reports to assess your eligibility with banks and investment funds, accompanied by our expert guidance.",
        description2:
          "Instantly access personalized reports and tailored recommendations with IziKemp. Save time, cut costs, and maximize your funding opportunities in just a few clicks!",
        startSimulation: "Start Your Simulation",
        description3:
          "At IziKemp, we understand the needs of entrepreneurs and project leaders. Our suite of innovative simulators provides you with the necessary tools to:",
        description4:
          "Assess your funding eligibility with precise scoring based on bank and investment fund criteria.",
        description5:
          "Explore various investment options to optimize your project. - Easily and instantly generate the financial elements of your business plan.",
        heading1: "Expert Guidance:",
        description6:
          "In addition to our advanced technological tools, benefit from our team’s expertise:",
        description7:
          "Banking Experts: Gain insights on best practices for presenting your project to banks.",
        description8:
          "Financing Specialists: Discover funding opportunities tailored to your specific needs.",
        description9:
          "Insurance Professionals: Ensure your project is secured and compliant with investor requirements.",
        description10:
          "Each user receives a complimentary consultation with one of our experts to better steer their project.",

        // Additional translations
        howItWorks: "How It Works:",
        chooseSimulator:
          "Choose Your Simulator and Expert: Select the tool and guidance that suits your needs.",
        enterData:
          "Enter Your Data: Provide the necessary information for in-depth analysis.",
        receiveReport:
          "Instantly Receive Your Personalized Report: Obtain an eligibility score and recommendations to optimize your success chances.",
        expertConsultation:
          "Benefit from an Expert Consultation: Our specialists guide you to maximize your funding potential.",
        aboutUs: "About us",
        whyChoose: "Why Choose IziKemp?",
        accuracyTrust:
          "Accuracy and Trust: Our tools are based on recognized criteria, offering you a reliable analysis.",
        customizationSupport:
          "Customization and Support: Each report is unique and tailored to your project, with personalized guidance.",
        dedicatedSupport:
          "Dedicated Support: Our team is here to support you every step of the way.",
        financingAmbitions: "Don’t let financing hold back your Ambitions.",
        tryIziKemp:
          "Try IziKemp, generate your report instantly, and discuss with an expert today!",
        testimonials: "Testimonials:",
        testimonial1:
          "IziKemp helped me secure the funding I needed to launch my project. The immediate report and expert consultation were invaluable!",
        successfulEntrepreneur: "Successful Entrepreneur",

        trustedPartner: "Your Trusted Partner in Financing",
        empoweringEntrepreneurs: "Empowering Entrepreneurs",
        foundersVision:
          "IziKemp was born from the shared experience of passionate entrepreneurs who navigated challenges in financing and strategic planning. Our founders, once lost in this maze, created a solution that truly speaks to entrepreneurs.",
        foundersChallenges:
          "As entrepreneurs themselves, they understand how difficult it is to find the right information at the right time. Each of their past ventures reinforced their belief that a lack of reliable advice can be costly.",
        teamOfExperts:
          "With this vision, they assembled a team of experts to make business success attainable without administrative or financial obstacles.",
        partnerSupport:
          "With IziKemp, you have a partner who not only understands your challenges but also works to solve them with expertise and empathy.",
        moveForward:
          "Choose IziKemp and move forward with confidence, knowing our dedicated team supports you every step of the way.",
        mission:
          " At IziKemp, our mission is to empower entrepreneurs with powerful tools and expert advice. Explore our story, meet our team, and find out how we can help turn your ambitions into achievements.",
        liveDemo: "Shedule a LIVE demo",
        demoMsg:
          "Explore the app with a guided tour and discuss how it would fit into your processes!",
        bookDemo: "Book Demo",
        help: "We’re Here to Help",
        name: "Name",
        logout: "logout",
        email: "Email",
        subject: "Subject",
        message: "Message",
        sendMsg: "Send Message",
        helpInfo:
          " For any inquiries or specific issues, feel free to contact us via our form or on social media. Join our dynamic community of successful entrepreneurs!",
        smallBsn1: "Small Business",
        smallBsn: "Small Business Calculators",
        calculator6: "Gross Profit Margin Calculator",
        calculator5: "Return on Assets Calculator",
        calculator4: "Debt-to-Assets Ratio Calculator",
        calculator3: "Quick Ratio Calculator",
        calculator2: "Current Ratio Calculator",
        calculator1: "Calculate Your Payment on any loan.",
        bsnDesc:
          "Own a small business? Chances are you face difficult decisions about how to allocate scare resources every day. Use Bankrate's small business calculators to fine tune your strategy.",
        loginText: "Keep your online business organized.",
        noAccount: "Don't have an account?",
        extraTxt:
          "Basement is Supringly hand for keeping my buisness stuff in one place.",
        alreadyAcc: "Already have an account?",

        caldes:
          "Before applying for a small business loan, make sure you know how much financing you can afford. Bankrate’s business loan calculator can help you estimate what your loan will cost and how much you’ll pay each month. Just enter a loan amount, loan term and interest rate.",
        caltxt: "Business loan and interest rate calculator",
        home: "home",
        contact: "contact",
        calcualte: "calculator",
        adminLogin:"Admin Login",
        login: "login",
        signup: "signup",
        calculators: "calculators",
        fixed: "Fixed Costs",
        selectCal: "Select Calculator",
        about: "about",

        // FormDetail translations
        breakeven: "Break-Even Calculator",
        businessValuation: "Business Valuation Calculator",
        cashflow: "Cash Flow Calculator",
        financialForecast: "Financial Forecast Calculator",
        grossmargin: "Gross Margin Calculator",
        roi: "ROI Calculator",
        investment: "Investment Calculator",
        financingSimulation: "Financing Simulation Calculator",
        netProfit: "Net Profit",
        growthRate: "Growth Rate (%)",
        discountRate: "Discount Rate (%)",
        cashInflows: "Cash Inflows",
        cashOutflows: "Cash Outflows",
        initialCashBalance: "Initial Cash Balance",
        revenues: "Revenues",
        fixedExpenses: "Fixed Expenses",
        variableExpenses: "Variable Expenses",
        product: "Product",
        sellingPrice: "Selling Price",
        productionCost: "Production Cost",
        initialCost: "Initial Cost",
        netGains: "Net Gains",
        monthlyIncome: "Monthly Income",
        monthlyExpenses: "Monthly Expenses",
        emergencySavings: "Emergency Savings",
        regularContributions: "Regular Contributions",
        currentRevenue: "Current Revenue",
        totalAssets: "Total Assets",
        totalDebts: "Total Debts",
        requestedAmount: "Requested Amount",
        useOfFunds: "Use of Funds",
        dashboard: "dashboard",

        generate: "Generate Business Plan Report",
        // generate report
        companyName: "Company Name",
        industrySector: "Industry Sector",
        dateOfEstablishment: "Date of Establishment",
        location: "Location",
        unitPrice: "Unit Price",
        expectedYearlySalesQuantity: "Expected Yearly Sales Quantity",
        estimatedSalesGrowth: "Estimated Sales Growth",
        yearlyFixedCosts: "Yearly Fixed Costs",
        variableUnitCosts: "Variable Unit Costs",
        initialInvestments: "Initial Investments",
        loanDuration: "Loan Duration (years)",
        interestRate: "Interest Rate (%)",
        taxRate: "Tax Rate (%)",
        revenues: "Revenues",
        costs: "Costs",
        investmentsAndFinancing: "Investments & Financing",
        otherFinancialAssumptions: "Other Financial Assumptions",
        generateReport: "Generate Report",
        pleaseWait: "Please wait...",
        errorGenerating: "Error generating the business plan",

        // for dashboard
        loading: "Loading...",
        userInformation: "User Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        currentPlan: "Current Plan",
        none: "None",
        businessPlanTrends: "Business Plan Trends",
        businessPlans: "Business Plans",
        industrySector: "Industry Sector",
        location: "Location",
        dateOfEstablishment: "Date of Establishment",
        financialRatios: "Financial Ratios",
        liquidityRatio: "Liquidity Ratio",
        profitabilityRatio: "Profitability Ratio",
        debtRatio: "Debt Ratio",
        creditworthinessScore: "Creditworthiness Score",
        riskAssessmentScore: "Risk Assessment Score",
        growthPotentialScore: "Growth Potential Score",
        viewAll: "View All",
        noBusinessPlansFound: "No business plans found.",
        sales: "Sales",

        // for payment
        payment: {
          title: "Payment",
          description:
            "Update Your Payment information or change your plans according to your needs.",
        },
        myPlan: {
          title: "My Plan",
          description: "Change your plan based on your need.",
          explorePlans: "Explore Plans",
          paymentHistory: "Payment History",
        },

        // for history
        loading: "Loading...",
        error: "Failed to load business plans.",
        latestHistory: "Latest History",
        noBusinessPlans: "No business plans available.",
        reportHistory: "Report History",
        companyName: "Company Name",
        industrySector: "Industry Sector",
        dateOfEstablishment: "Date of Establishment",
        location: "Location",
        actions: "Actions",
        hideDetails: "Hide Details",
        viewDetails: "View Details",
        financialProjections: "Financial Projections:",
        annualRevenues: "Annual Revenues:",
        annualExpenses: "Annual Expenses:",
        netIncome: "Net Income:",
        initialInvestments: "Initial Investments:",

        // for sidebar
        dashboard: "Dashboard",
        generateReport: "Generate Report",
        payment: "Payment",
        history: "History",
        users: "Users",

        // for footer
        inquiries:
          "For any inquiries, contact us at [email/contact]. Follow us on [social media]. Join our community of successful entrepreneurs!",
        newsletterSignup: "Newsletter Signup",
        newsletterEmailPlaceholder: "john@doe.com",
        agreeToPrivacy: "I agree to the",
        privacyPolicy: "Privacy Policy",
        socials: "Socials",
        facebook: "Facebook",
        twitter: "Twitter",
        dribble: "Dribble",
        instagram: "Instagram",
        menu: "Menu",
        aboutUs: "About Us",
        contact: "Contact",
        register: "Register",
        sayHello: "Say Hello",
        email: "info@izikemp.com",
      },
    },
    fr: {
      translation: {
        welcome: "Boostez Vos Chances de Financement avec IziKemp !",
        description:
          "Accédez à des simulateurs de pointe et générez instantanément des rapports personnalisés pour évaluer votre éligibilité auprès des banques et fonds d'investissement, avec l'accompagnement de nos experts.",
        description2:
          "Accédez instantanément à des rapports personnalisés et à des recommandations sur mesure avec IziKemp. Gagnez du temps, réduisez les coûts et maximisez vos opportunités de financement en quelques clics !",
        startSimulation: "Commencez votre simulation",
        description3:
          "Chez IziKemp, nous comprenons les besoins des entrepreneurs et porteurs de projet. Notre suite de simulateurs innovants vous offre les outils nécessaires pour:",
        description4:
          "Évaluer votre éligibilité au financement grâce à un scoring précis basé sur les critères des banques et fonds d'investissement.",
        description5:
          "Explorer diverses options d'investissement pour optimiser votre projet. - Générer facilement et instantanément les éléments financiers de votre plan d'affaires.",
        heading1: "L'accompagnement par nos experts :",
        description6:
          "En plus de nos outils technologiques avancés, bénéficiez de l'expertise de notre équipe :",
        description7:
          "Experts bancaires : Obtenez des conseils sur les meilleures pratiques pour présenter votre projet aux banques.",
        description8:
          "Spécialistes en financement : Découvrez les opportunités de financement adaptées à vos besoins spécifiques.",
        description9:
          "Professionnels de l'assurance : Assurez-vous que votre projet est sécurisé et conforme aux exigences des investisseurs.",
        description10:
          "Chaque utilisateur bénéficie d'un entretien gratuit avec l'un de nos experts pour mieux orienter son projet.",
        mission:
          "Chez IziKemp, notre mission est de donner aux entrepreneurs les moyens de réussir grâce à des outils puissants et des conseils d'experts. Découvrez notre histoire, rencontrez notre équipe et voyez comment nous pouvons vous aider à transformer vos ambitions en réussites.",

        // Additional translations
        howItWorks: "Comment ça marche :",
        chooseSimulator:
          "Choisissez votre simulateur et expert : sélectionnez l'outil et les conseils qui correspondent à vos besoins.",
        enterData:
          "Entrez vos données : fournissez les informations nécessaires pour une analyse approfondie.",
        receiveReport:
          "Recevez instantanément votre rapport personnalisé : obtenez un score d'éligibilité et des recommandations pour optimiser vos chances de succès.",
        expertConsultation:
          "Bénéficiez d'une consultation d'expert : nos spécialistes vous guident pour maximiser votre potentiel de financement.",
        aboutUs: "À propos de nous",
        whyChoose: "Pourquoi choisir IziKemp ?",
        accuracyTrust:
          "Précision et Confiance : Nos outils sont basés sur des critères reconnus, vous offrant une analyse fiable.",
        customizationSupport:
          "Personnalisation et Accompagnement: Chaque rapport est unique, adapté à votre projet, avec un accompagnement sur-mesure.",
        dedicatedSupport:
          "SSupport dédié : Notre équipe est là pour vous accompagner à chaque étape du processus.",
        financingAmbitions:
          "Ne laissez pas le financement freiner vos ambitions. Essayez IziKemp, générez votre rapport immédiatement et discutez avec un expert dès aujourd'hui !",
        tryIziKemp:
          "Essayez IziKemp, générez votre rapport instantanément et discutez avec un expert dès aujourd'hui !",
        testimonials: "Témoignages :",
        testimonial1:
          "IziKemp m'a aidé à obtenir le financement dont j'avais besoin pour lancer mon projet. Le rapport immédiat et l'entretien avec un expert ont été inestimables !",
        successfulEntrepreneur: "Entrepreneur à succès",

        trustedPartner: "Votre Partenaire de Confiance en Financement",
        empoweringEntrepreneurs: "Autonomiser les Entrepreneurs",
        foundersVision:
          "IziKemp est né de l'expérience partagée de passionnés ayant navigué dans les défis du financement. Nos fondateurs, jadis perdus dans ce labyrinthe, ont créé une solution qui parle aux entrepreneurs.",
        foundersChallenges:
          "En tant qu'entrepreneurs eux-mêmes, ils comprennent combien il est difficile de trouver la bonne information au bon moment. Leurs expériences ont renforcé leur conviction qu'un manque de conseils fiables peut coûter cher.",
        teamOfExperts:
          "Avec cette vision, ils ont assemblé une équipe d'experts pour rendre le succès commercial atteignable sans obstacles administratifs ou financiers.",
        partnerSupport:
          "Avec IziKemp, vous avez un partenaire qui non seulement comprend vos défis, mais cherche aussi à les résoudre avec expertise et empathie.",
        moveForward:
          "Choisissez IziKemp et avancez en toute confiance, sachant que notre équipe dédiée vous soutient à chaque étape.",
        liveDemo: "Planifiez une démonstration en DIRECT",
        demoMsg:
          "Explorez l'application avec une visite guidée et discutez de la manière dont elle s'intégrerait dans vos processus!",
        bookDemo: "Réserver une démo",
        help: "Nous sommes là pour vous aider",
        name: "Nom",
        email: "E-mail",
        subject: "Objet",
        message: "Message",
        sendMsg: "Envoyer le message",
        helpInfo:
          "Pour toute demande ou problème spécifique, n'hésitez pas à nous contacter via notre formulaire ou sur les réseaux sociaux. Rejoignez notre communauté dynamique d'entrepreneurs à succès!",
        smallBsn1: "Petite entreprise",
        smallBsn: "Calculatrices pour petites entreprises",
        calculator6: "Calculateur de marge brute.",
        calculator5: "Calculateur de rendement des actifs.",
        calculator4: "Calculateur de ratio d'endettement sur actifs.",
        calculator3: "Calculateur de ratio de liquidité immédiate.",
        calculator2: "Calculateur de ratio de liquidité générale.",
        calculator1: "Calculez votre paiement sur n'importe quel prêt.",
        bsnDesc:
          "Vous avez une petite entreprise ? Il y a de fortes chances que vous soyez confronté à des décisions difficiles sur la manière d'allouer des ressources limitées chaque jour. Utilisez les calculatrices pour petites entreprises de Bankrate pour affiner votre stratégie.",
        loginText: "Gardez votre entreprise en ligne organisée.",
        noAccount: "Vous n'avez pas de compte ?",
        extraTxt:
          "Le sous-sol est étonnamment pratique pour garder mes affaires professionnelles au même endroit.",
        alreadyAcc: "Vous avez déjà un compte ?",

        calcualte: "calculatrice",
        adminLogin:"Connexion administrateur",
        contact: "contact",
        login: "connexion",
        signup: "inscription",
        calculators: "calculatrices",
        fixed: "Coûts fixes",
        selectCal: "Sélectionner la calculatrice.",
        about: "propos",
        caldes:
          "Avant de demander un prêt pour petite entreprise, assurez-vous de savoir combien de financement vous pouvez vous permettre. La calculatrice de prêt commercial de Bankrate peut vous aider à estimer le coût de votre prêt et combien vous paierez chaque mois. Il vous suffit d'entrer le montant du prêt, la durée du prêt et le taux d'intérêt.",
        caltxt: "Calculatrice de prêt commercial et de taux d'intérêt",
        home: " accueil",

        // FormDetail translations
        breakeven: "Calculateur de seuil de rentabilité",
        businessValuation: "Calculateur d'évaluation d'entreprise",
        cashflow: "Calculateur de flux de trésorerie",
        financialForecast: "Calculateur de prévisions financières",
        grossmargin: "Calculateur de marge brute",
        roi: "Calculateur de retour sur investissement",
        investment: "Calculateur d'investissement",
        financingSimulation: "Calculateur de simulation de financement",
        netProfit: "Bénéfice net",
        growthRate: "Taux de croissance (%)",
        discountRate: "Taux d'escompte (%)",
        cashInflows: "Entrées de trésorerie",
        cashOutflows: "Sorties de trésorerie",
        initialCashBalance: "Solde de trésorerie initial",
        revenues: "Revenus",
        fixedExpenses: "Dépenses fixes",
        variableExpenses: "Dépenses variables",
        product: "Produit",
        sellingPrice: "Prix de vente",
        productionCost: "Coût de production",
        initialCost: "Coût initial",
        netGains: "Gains nets",
        monthlyIncome: "Revenu mensuel",
        monthlyExpenses: "Dépenses mensuelles",
        emergencySavings: "Économies d'urgence",
        regularContributions: "Contributions régulières",
        currentRevenue: "Revenu actuel",
        totalAssets: "Total des actifs",
        totalDebts: "Total des dettes",
        requestedAmount: "Montant demandé",
        useOfFunds: "Utilisation des fonds",
        dashboard: "tableau de bord",
        generate: "Générer un rapport de plan d'affaires",
        // generate report
        companyName: "Nom de l'entreprise",
        industrySector: "Secteur d'industrie",
        dateOfEstablishment: "Date de création",
        location: "Emplacement",
        unitPrice: "Prix unitaire",
        expectedYearlySalesQuantity: "Quantité de ventes annuelles prévue",
        estimatedSalesGrowth: "Croissance des ventes estimée",
        yearlyFixedCosts: "Coûts fixes annuels",
        variableUnitCosts: "Coûts unitaires variables",
        initialInvestments: "Investissements initiaux",
        loanDuration: "Durée du prêt (années)",
        interestRate: "Taux d'intérêt (%)",
        taxRate: "Taux d'imposition (%)",
        revenues: "Revenus",
        costs: "Coûts",
        investmentsAndFinancing: "Investissements & Financement",
        otherFinancialAssumptions: "Autres hypothèses financières",
        generateReport: "Générer le rapport",
        pleaseWait: "Veuillez patienter...",
        errorGenerating: "Erreur lors de la génération du plan d'affaires",

        // dashboard
        dashboard: "Tableau de bord",
        loading: "Chargement...",
        userInformation: "Informations sur l'utilisateur",
        firstName: "Prénom",
        lastName: "Nom de famille",
        email: "E-mail",
        currentPlan: "Plan actuel",
        none: "Aucun",
        businessPlanTrends: "Tendances des plans d'affaires",
        businessPlans: "Plans d'affaires",
        industrySector: "Secteur industriel",
        location: "Emplacement",
        dateOfEstablishment: "Date de création",
        financialRatios: "Ratios financiers",
        liquidityRatio: "Ratio de liquidité",
        profitabilityRatio: "Ratio de rentabilité",
        debtRatio: "Ratio d'endettement",
        creditworthinessScore: "Score de solvabilité",
        riskAssessmentScore: "Score d'évaluation des risques",
        growthPotentialScore: "Score de potentiel de croissance",
        viewAll: "Voir tout",
        noBusinessPlansFound: "Aucun plan d'affaires trouvé.",
        sales: "Ventes",

        // for payment
        payment: {
          title: "Paiement",
          description:
            "Mettez à jour vos informations de paiement ou changez vos plans en fonction de vos besoins.",
        },
        myPlan: {
          title: "Mon Plan",
          description: "Changez votre plan en fonction de vos besoins.",
          explorePlans: "Explorer les Plans",
          paymentHistory: "Historique des paiements",
        },

        // for history

        loading: "Chargement...",
        error: "Échec du chargement des plans d'affaires.",
        latestHistory: "Dernière Histoire",
        noBusinessPlans: "Aucun plan d'affaires disponible.",
        reportHistory: "Historique des Rapports",
        companyName: "Nom de l'Entreprise",
        industrySector: "Secteur d'Industrie",
        dateOfEstablishment: "Date de Création",
        location: "Emplacement",
        actions: "Actions",
        hideDetails: "Cacher les Détails",
        viewDetails: "Voir les Détails",
        financialProjections: "Projections Financières:",
        annualRevenues: "Revenus Annuels:",
        annualExpenses: "Dépenses Annuelles:",
        netIncome: "Revenu Net:",
        initialInvestments: "Investissements Initiaux:",

        // for sidebar
        dashboard: "Tableau de bord",
        generateReport: "Générer un rapport",
        payment: "Paiement",
        history: "Histoire",
        users: "Utilisateurs",

        // for footer
        inquiries:
          "Pour toute demande, contactez-nous à [email/contact]. Suivez-nous sur [réseaux sociaux]. Rejoignez notre communauté d'entrepreneurs réussis!",
        newsletterSignup: "Inscription à la Newsletter",
        newsletterEmailPlaceholder: "john@doe.com",
        agreeToPrivacy: "J'accepte le",
        privacyPolicy: "Politique de Confidentialité",
        socials: "Réseaux sociaux",
        facebook: "Facebook",
        twitter: "Twitter",
        dribble: "Dribble",
        instagram: "Instagram",
        menu: "Menu",
        aboutUs: "À propos de nous",
        contact: "Contact",
        register: "S'inscrire",
        sayHello: "Dites bonjour",
        logout: "déconnexion",
        email: "info@izikemp.com",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language if translation not found
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
