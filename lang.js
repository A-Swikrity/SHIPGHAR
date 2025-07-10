const translations = {
  en: {
    title: "Welcome to सीप घर Your Skill, Your Income, Your Space",
    home: "Home",
    about: "About Us",
    services: "Services",
    contact: "Contact",
    signin: "Sign In",
   learn: "I want to LEARN and EARN ",
   shop:"I want to SHOP PRODUCTS",
   btnlearn: "START",
   btnshop: "SHOP",
  },
  np: {
    title: "सीप घरमा स्वागत छ तपाईंको सीप, तपाईंको आम्दानी, तपाईंको ठाउँ",
    home: "गृह पृष्ठ",
    about: "हाम्रो बारेमा",
    services: "सेवाहरू",
    contact: "सम्पर्क गर्नुहोस्",
    signin: "साइन इन गर्नुहोस्",
    learn: "म सिक्न र कमाउन चाहन्छु",
    shop: "म उत्पादनहरू किनमेल गर्न चाहन्छु ",
    btnlearn: "सुरु गर्नुहोस्",
    btnshop: "खरिद गर्नुहुन्छ",
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("lang-select").addEventListener("change", function () {
    const lang = this.value;
    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("home").innerText = translations[lang].home;
    document.getElementById("about").innerText = translations[lang].about;
    document.getElementById("services").innerText = translations[lang].services;
    document.getElementById("contact").innerText = translations[lang].contact;
    document.getElementById("signin").innerText = translations[lang].signin;
     document.getElementById("learn").innerText = translations[lang].learn;
     document.getElementById("shop").innerText = translations[lang].shop;
     document.getElementById("btnlearn").innerText = translations[lang].btnlearn;
     document.getElementById("btnshop").innerText = translations[lang].btnshop;
  });
});
