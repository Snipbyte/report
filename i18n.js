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
        description8: "Financing Specialists: Discover funding opportunities tailored to your specific needs.",
        description9: "Insurance Professionals: Ensure your project is secured and compliant with investor requirements.",
        description10: "Each user receives a complimentary consultation with one of our experts to better steer their project.",
        
        // Additional translations
        howItWorks: "How It Works:",
        chooseSimulator: "Choose Your Simulator and Expert: Select the tool and guidance that suits your needs.",
        enterData: "Enter Your Data: Provide the necessary information for in-depth analysis.",
        receiveReport: "Instantly Receive Your Personalized Report: Obtain an eligibility score and recommendations to optimize your success chances.",
        expertConsultation: "Benefit from an Expert Consultation: Our specialists guide you to maximize your funding potential.",
        aboutUs: "About us",
        whyChoose: "Why Choose IziKemp?",
        accuracyTrust: "Accuracy and Trust: Our tools are based on recognized criteria, offering you a reliable analysis.",
        customizationSupport: "Customization and Support: Each report is unique and tailored to your project, with personalized guidance.",
        dedicatedSupport: "Dedicated Support: Our team is here to support you every step of the way.",
        financingAmbitions: "Don’t let financing hold back your Ambitions.",
        tryIziKemp: "Try IziKemp, generate your report instantly, and discuss with an expert today!",
        testimonials: "Testimonials:",
        testimonial1: "IziKemp helped me secure the funding I needed to launch my project. The immediate report and expert consultation were invaluable!",
        successfulEntrepreneur: "Successful Entrepreneur",
      },
    },
    fr: {
      translation: {
        welcome: "Boostez vos perspectives de financement avec IziKemp !",
        description:
          "Accédez à des simulateurs de pointe et générez instantanément des rapports personnalisés pour évaluer votre éligibilité auprès des banques et des fonds d'investissement, accompagnés de nos conseils d'experts.",
        description2:
          "Accédez instantanément à des rapports personnalisés et à des recommandations sur mesure avec IziKemp. Gagnez du temps, réduisez les coûts et maximisez vos opportunités de financement en quelques clics !",
        startSimulation: "Commencez votre simulation",
        description3:
          "Chez IziKemp, nous comprenons les besoins des entrepreneurs et des porteurs de projets. Notre gamme de simulateurs innovants vous offre les outils nécessaires pour:",
        description4:
          "Évaluer votre éligibilité au financement avec un scoring précis basé sur les critères des banques et des fonds d'investissement.",
        description5:
          "Explorer diverses options d'investissement pour optimiser votre projet. - Générer facilement et instantanément les éléments financiers de votre plan d'affaires.",
        heading1: "Conseils d'experts :",
        description6:
          "En plus de nos outils technologiques avancés, profitez de l'expertise de notre équipe :",
        description7:
          "Experts bancaires : Obtenez des conseils sur les meilleures pratiques pour présenter votre projet aux banques.",
        description8:
          "Spécialistes du financement : Découvrez des opportunités de financement adaptées à vos besoins spécifiques.",
        description9:
          "Professionnels de l'assurance : Assurez-vous que votre projet est sécurisé et conforme aux exigences des investisseurs.",
        description10:
          "Chaque utilisateur bénéficie d'une consultation gratuite avec l'un de nos experts pour mieux orienter son projet.",
        
        // Additional translations
        howItWorks: "Comment ça marche :",
        chooseSimulator: "Choisissez votre simulateur et expert : sélectionnez l'outil et les conseils qui correspondent à vos besoins.",
        enterData: "Entrez vos données : fournissez les informations nécessaires pour une analyse approfondie.",
        receiveReport: "Recevez instantanément votre rapport personnalisé : obtenez un score d'éligibilité et des recommandations pour optimiser vos chances de succès.",
        expertConsultation: "Bénéficiez d'une consultation d'expert : nos spécialistes vous guident pour maximiser votre potentiel de financement.",
        aboutUs: "À propos de nous",
        whyChoose: "Pourquoi choisir IziKemp ?",
        accuracyTrust: "Précision et confiance : nos outils sont basés sur des critères reconnus, vous offrant une analyse fiable.",
        customizationSupport: "Personnalisation et soutien : chaque rapport est unique et adapté à votre projet, avec des conseils personnalisés.",
        dedicatedSupport: "Soutien dédié : notre équipe est là pour vous accompagner à chaque étape.",
        financingAmbitions: "Ne laissez pas le financement freiner vos ambitions.",
        tryIziKemp: "Essayez IziKemp, générez votre rapport instantanément et discutez avec un expert dès aujourd'hui !",
        testimonials: "Témoignages :",
        testimonial1: "IziKemp m'a aidé à obtenir le financement dont j'avais besoin pour lancer mon projet. Le rapport immédiat et la consultation d'expert étaient inestimables !",
        successfulEntrepreneur: "Entrepreneur à succès",
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
