export interface Translations {
  common: {
    login: string;
    signup: string;
    continue: string;
    back: string;
    next: string;
    verify: string;
    resend: string;
    termsAndConditions: string;
    privacyPolicy: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    add: string;
    search: string;
    filter: string;
    sort: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  auth: {
    welcomeBack: string;
    enterMobile: string;
    enterPin: string;
    mobileNumber: string;
    pin: string;
    confirmPin: string;
    forgotPin: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    createAccount: string;
    verifyOtp: string;
    otpSentTo: string;
    enterOtp: string;
    resendOtp: string;
    setPin: string;
    confirmYourPin: string;
    pinMismatch: string;
  };
  dashboard: {
    portfolio: string;
    totalValue: string;
    todayChange: string;
    assets: string;
    security: string;
    liabilities: string;
    goals: string;
    education: string;
    quickActions: string;
    recentTransactions: string;
    viewAll: string;
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
    goodNight: string;
  };
  portfolio: {
    title: string;
    totalInvestment: string;
    currentValue: string;
    totalReturns: string;
    dayChange: string;
    holdings: string;
    performance: string;
    allocation: string;
  };
  assets: {
    title: string;
    bankAccounts: string;
    mutualFunds: string;
    stocks: string;
    bonds: string;
    realEstate: string;
    gold: string;
    others: string;
    addAsset: string;
    totalAssets: string;
  };
  liabilities: {
    title: string;
    homeLoan: string;
    personalLoan: string;
    carLoan: string;
    creditCard: string;
    others: string;
    addLiability: string;
    totalLiabilities: string;
    emi: string;
    outstandingAmount: string;
  };
  goals: {
    title: string;
    financialGoals: string;
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
    retirement: string;
    education: string;
    house: string;
    car: string;
    vacation: string;
    emergency: string;
    addGoal: string;
    targetAmount: string;
    currentAmount: string;
    timeToGoal: string;
    monthlyInvestment: string;
  };
  education: {
    title: string;
    financialEducation: string;
    articles: string;
    videos: string;
    courses: string;
    webinars: string;
    basics: string;
    investing: string;
    planning: string;
    taxes: string;
    insurance: string;
    retirement: string;
  };
  calculators: {
    title: string;
    sip: string;
    stp: string;
    swp: string;
    lumpsum: string;
    emi: string;
    retirement: string;
    goalPlanning: string;
    taxSaving: string;
    compoundInterest: string;
  };
  profile: {
    title: string;
    personalInfo: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    occupation: string;
    income: string;
    riskProfile: string;
    conservative: string;
    moderate: string;
    aggressive: string;
    editProfile: string;
  };
  settings: {
    title: string;
    profileSettings: string;
    riskProfile: string;
    notifications: string;
    security: string;
    language: string;
    theme: string;
    about: string;
    help: string;
    logout: string;
    version: string;
    termsOfService: string;
    privacyPolicy: string;
    contactUs: string;
  };
  security: {
    title: string;
    changePin: string;
    biometric: string;
    twoFactor: string;
    loginHistory: string;
    deviceManagement: string;
    securityTips: string;
  };
  riskProfile: {
    title: string;
    assessment: string;
    questions: string;
    result: string;
    conservative: string;
    moderate: string;
    aggressive: string;
    retakeAssessment: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    common: {
      login: 'Login',
      signup: 'Sign Up',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      verify: 'Verify',
      resend: 'Resend',
      termsAndConditions: 'Terms & Conditions',
      privacyPolicy: 'Privacy Policy',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
    },
    auth: {
      welcomeBack: 'Welcome Back',
      enterMobile: 'Enter your mobile number',
      enterPin: 'Enter your PIN',
      mobileNumber: 'Mobile Number',
      pin: 'PIN',
      confirmPin: 'Confirm PIN',
      forgotPin: 'Forgot PIN?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      createAccount: 'Create Account',
      verifyOtp: 'Verify OTP',
      otpSentTo: 'OTP sent to',
      enterOtp: 'Enter the 6-digit OTP',
      resendOtp: 'Resend OTP',
      setPin: 'Set PIN',
      confirmYourPin: 'Confirm your PIN',
      pinMismatch: 'PINs do not match',
    },
    dashboard: {
      portfolio: 'Portfolio',
      totalValue: 'Total Value',
      todayChange: "Today's Change",
      assets: 'Assets',
      security: 'Security',
      liabilities: 'Liabilities',
      goals: 'Goals',
      education: 'Education',
      quickActions: 'Quick Actions',
      recentTransactions: 'Recent Transactions',
      viewAll: 'View All',
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      goodNight: 'Good Night',
    },
    portfolio: {
      title: 'Portfolio',
      totalInvestment: 'Total Investment',
      currentValue: 'Current Value',
      totalReturns: 'Total Returns',
      dayChange: "Day's Change",
      holdings: 'Holdings',
      performance: 'Performance',
      allocation: 'Allocation',
    },
    assets: {
      title: 'Assets',
      bankAccounts: 'Bank Accounts',
      mutualFunds: 'Mutual Funds',
      stocks: 'Stocks',
      bonds: 'Bonds',
      realEstate: 'Real Estate',
      gold: 'Gold',
      others: 'Others',
      addAsset: 'Add Asset',
      totalAssets: 'Total Assets',
    },
    liabilities: {
      title: 'Liabilities',
      homeLoan: 'Home Loan',
      personalLoan: 'Personal Loan',
      carLoan: 'Car Loan',
      creditCard: 'Credit Card',
      others: 'Others',
      addLiability: 'Add Liability',
      totalLiabilities: 'Total Liabilities',
      emi: 'EMI',
      outstandingAmount: 'Outstanding Amount',
    },
    goals: {
      title: 'Goals',
      financialGoals: 'Financial Goals',
      shortTerm: 'Short Term',
      mediumTerm: 'Medium Term',
      longTerm: 'Long Term',
      retirement: 'Retirement',
      education: 'Education',
      house: 'House',
      car: 'Car',
      vacation: 'Vacation',
      emergency: 'Emergency Fund',
      addGoal: 'Add Goal',
      targetAmount: 'Target Amount',
      currentAmount: 'Current Amount',
      timeToGoal: 'Time to Goal',
      monthlyInvestment: 'Monthly Investment',
    },
    education: {
      title: 'Education',
      financialEducation: 'Financial Education',
      articles: 'Articles',
      videos: 'Videos',
      courses: 'Courses',
      webinars: 'Webinars',
      basics: 'Basics',
      investing: 'Investing',
      planning: 'Planning',
      taxes: 'Taxes',
      insurance: 'Insurance',
      retirement: 'Retirement',
    },
    calculators: {
      title: 'Financial Calculators',
      sip: 'SIP Calculator',
      stp: 'STP Calculator',
      swp: 'SWP Calculator',
      lumpsum: 'Lumpsum Calculator',
      emi: 'EMI Calculator',
      retirement: 'Retirement Calculator',
      goalPlanning: 'Goal Planning',
      taxSaving: 'Tax Saving',
      compoundInterest: 'Compound Interest',
    },
    profile: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      dateOfBirth: 'Date of Birth',
      address: 'Address',
      occupation: 'Occupation',
      income: 'Income',
      riskProfile: 'Risk Profile',
      conservative: 'Conservative',
      moderate: 'Moderate',
      aggressive: 'Aggressive',
      editProfile: 'Edit Profile',
    },
    settings: {
      title: 'Settings',
      profileSettings: 'Profile Settings',
      riskProfile: 'Risk Profile',
      notifications: 'Notifications',
      security: 'Security',
      language: 'Language',
      theme: 'Theme',
      about: 'About',
      help: 'Help',
      logout: 'Logout',
      version: 'Version',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      contactUs: 'Contact Us',
    },
    security: {
      title: 'Security',
      changePin: 'Change PIN',
      biometric: 'Biometric Authentication',
      twoFactor: 'Two-Factor Authentication',
      loginHistory: 'Login History',
      deviceManagement: 'Device Management',
      securityTips: 'Security Tips',
    },
    riskProfile: {
      title: 'Risk Profile',
      assessment: 'Risk Assessment',
      questions: 'Questions',
      result: 'Result',
      conservative: 'Conservative',
      moderate: 'Moderate',
      aggressive: 'Aggressive',
      retakeAssessment: 'Retake Assessment',
    },
  },
  hi: {
    common: {
      login: 'लॉगिन',
      signup: 'साइन अप',
      continue: 'जारी रखें',
      back: 'वापस',
      next: 'अगला',
      verify: 'सत्यापित करें',
      resend: 'पुनः भेजें',
      termsAndConditions: 'नियम और शर्तें',
      privacyPolicy: 'गोपनीयता नीति',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      add: 'जोड़ें',
      search: 'खोजें',
      filter: 'फिल्टर',
      sort: 'क्रमबद्ध करें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',
    },
    auth: {
      welcomeBack: 'वापस स्वागत है',
      enterMobile: 'अपना मोबाइल नंबर दर्ज करें',
      enterPin: 'अपना पिन दर्ज करें',
      mobileNumber: 'मोबाइल नंबर',
      pin: 'पिन',
      confirmPin: 'पिन की पुष्टि करें',
      forgotPin: 'पिन भूल गए?',
      dontHaveAccount: 'खाता नहीं है?',
      alreadyHaveAccount: 'पहले से खाता है?',
      createAccount: 'खाता बनाएं',
      verifyOtp: 'ओटीपी सत्यापित करें',
      otpSentTo: 'ओटीपी भेजा गया',
      enterOtp: '6 अंकों का ओटीपी दर्ज करें',
      resendOtp: 'ओटीपी पुनः भेजें',
      setPin: 'पिन सेट करें',
      confirmYourPin: 'अपने पिन की पुष्टि करें',
      pinMismatch: 'पिन मेल नहीं खाते',
    },
    dashboard: {
      portfolio: 'पोर्टफोलियो',
      totalValue: 'कुल मूल्य',
      todayChange: 'आज का बदलाव',
      assets: 'संपत्ति',
      security: 'सुरक्षा',
      liabilities: 'देनदारियां',
      goals: 'लक्ष्य',
      education: 'शिक्षा',
      quickActions: 'त्वरित कार्य',
      recentTransactions: 'हाल के लेनदेन',
      viewAll: 'सभी देखें',
      goodMorning: 'सुप्रभात',
      goodAfternoon: 'नमस्कार',
      goodEvening: 'शुभ संध्या',
      goodNight: 'शुभ रात्रि',
    },
    portfolio: {
      title: 'पोर्टफोलियो',
      totalInvestment: 'कुल निवेश',
      currentValue: 'वर्तमान मूल्य',
      totalReturns: 'कुल रिटर्न',
      dayChange: 'दिन का बदलाव',
      holdings: 'होल्डिंग्स',
      performance: 'प्रदर्शन',
      allocation: 'आवंटन',
    },
    assets: {
      title: 'संपत्ति',
      bankAccounts: 'बैंक खाते',
      mutualFunds: 'म्यूचुअल फंड',
      stocks: 'स्टॉक',
      bonds: 'बॉन्ड',
      realEstate: 'रियल एस्टेट',
      gold: 'सोना',
      others: 'अन्य',
      addAsset: 'संपत्ति जोड़ें',
      totalAssets: 'कुल संपत्ति',
    },
    liabilities: {
      title: 'देनदारियां',
      homeLoan: 'होम लोन',
      personalLoan: 'व्यक्तिगत ऋण',
      carLoan: 'कार लोन',
      creditCard: 'क्रेडिट कार्ड',
      others: 'अन्य',
      addLiability: 'देनदारी जोड़ें',
      totalLiabilities: 'कुल देनदारियां',
      emi: 'ईएमआई',
      outstandingAmount: 'बकाया राशि',
    },
    goals: {
      title: 'लक्ष्य',
      financialGoals: 'वित्तीय लक्ष्य',
      shortTerm: 'अल्पकालिक',
      mediumTerm: 'मध्यकालिक',
      longTerm: 'दीर्घकालिक',
      retirement: 'सेवानिवृत्ति',
      education: 'शिक्षा',
      house: 'घर',
      car: 'कार',
      vacation: 'छुट्टी',
      emergency: 'आपातकालीन फंड',
      addGoal: 'लक्ष्य जोड़ें',
      targetAmount: 'लक्ष्य राशि',
      currentAmount: 'वर्तमान राशि',
      timeToGoal: 'लक्ष्य तक समय',
      monthlyInvestment: 'मासिक निवेश',
    },
    education: {
      title: 'शिक्षा',
      financialEducation: 'वित्तीय शिक्षा',
      articles: 'लेख',
      videos: 'वीडियो',
      courses: 'कोर्स',
      webinars: 'वेबिनार',
      basics: 'बुनियादी बातें',
      investing: 'निवेश',
      planning: 'योजना',
      taxes: 'कर',
      insurance: 'बीमा',
      retirement: 'सेवानिवृत्ति',
    },
    calculators: {
      title: 'वित्तीय कैलकुलेटर',
      sip: 'एसआईपी कैलकुलेटर',
      stp: 'एसटीपी कैलकुलेटर',
      swp: 'एसडब्ल्यूपी कैलकुलेटर',
      lumpsum: 'एकमुश्त कैलकुलेटर',
      emi: 'ईएमआई कैलकुलेटर',
      retirement: 'सेवानिवृत्ति कैलकुलेटर',
      goalPlanning: 'लक्ष्य योजना',
      taxSaving: 'कर बचत',
      compoundInterest: 'चक्रवृद्धि ब्याज',
    },
    profile: {
      title: 'प्रोफाइल',
      personalInfo: 'व्यक्तिगत जानकारी',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फोन',
      dateOfBirth: 'जन्म तिथि',
      address: 'पता',
      occupation: 'व्यवसाय',
      income: 'आय',
      riskProfile: 'जोखिम प्रोफाइल',
      conservative: 'रूढ़िवादी',
      moderate: 'मध्यम',
      aggressive: 'आक्रामक',
      editProfile: 'प्रोफाइल संपादित करें',
    },
    settings: {
      title: 'सेटिंग्स',
      profileSettings: 'प्रोफाइल सेटिंग्स',
      riskProfile: 'जोखिम प्रोफाइल',
      notifications: 'सूचनाएं',
      security: 'सुरक्षा',
      language: 'भाषा',
      theme: 'थीम',
      about: 'के बारे में',
      help: 'सहायता',
      logout: 'लॉगआउट',
      version: 'संस्करण',
      termsOfService: 'सेवा की शर्तें',
      privacyPolicy: 'गोपनीयता नीति',
      contactUs: 'संपर्क करें',
    },
    security: {
      title: 'सुरक्षा',
      changePin: 'पिन बदलें',
      biometric: 'बायोमेट्रिक प्रमाणीकरण',
      twoFactor: 'दो-कारक प्रमाणीकरण',
      loginHistory: 'लॉगिन इतिहास',
      deviceManagement: 'डिवाइस प्रबंधन',
      securityTips: 'सुरक्षा सुझाव',
    },
    riskProfile: {
      title: 'जोखिम प्रोफाइल',
      assessment: 'जोखिम मूल्यांकन',
      questions: 'प्रश्न',
      result: 'परिणाम',
      conservative: 'रूढ़िवादी',
      moderate: 'मध्यम',
      aggressive: 'आक्रामक',
      retakeAssessment: 'मूल्यांकन दोबारा करें',
    },
  },
  kn: {
    common: {
      login: 'ಲಾಗಿನ್',
      signup: 'ಸೈನ್ ಅಪ್',
      continue: 'ಮುಂದುವರಿಸಿ',
      back: 'ಹಿಂದೆ',
      next: 'ಮುಂದೆ',
      verify: 'ಪರಿಶೀಲಿಸಿ',
      resend: 'ಮತ್ತೆ ಕಳುಹಿಸಿ',
      termsAndConditions: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
      privacyPolicy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
      save: 'ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      edit: 'ಸಂಪಾದಿಸಿ',
      delete: 'ಅಳಿಸಿ',
      add: 'ಸೇರಿಸಿ',
      search: 'ಹುಡುಕಿ',
      filter: 'ಫಿಲ್ಟರ್',
      sort: 'ವಿಂಗಡಿಸಿ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      error: 'ದೋಷ',
      success: 'ಯಶಸ್ಸು',
      warning: 'ಎಚ್ಚರಿಕೆ',
      info: 'ಮಾಹಿತಿ',
    },
    auth: {
      welcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ',
      enterMobile: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
      enterPin: 'ನಿಮ್ಮ ಪಿನ್ ನಮೂದಿಸಿ',
      mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      pin: 'ಪಿನ್',
      confirmPin: 'ಪಿನ್ ದೃಢೀಕರಿಸಿ',
      forgotPin: 'ಪಿನ್ ಮರೆತಿದ್ದೀರಾ?',
      dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
      alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
      createAccount: 'ಖಾತೆ ರಚ��ಸಿ',
      verifyOtp: 'ಒಟಿಪಿ ಪರಿಶೀಲಿಸಿ',
      otpSentTo: 'ಒಟಿಪಿ ಕಳುಹಿಸಲಾಗಿದೆ',
      enterOtp: '6 ಅಂಕಿಯ ಒಟಿಪಿ ನಮೂದಿಸಿ',
      resendOtp: 'ಒಟಿಪಿ ಮತ್ತೆ ಕಳುಹಿಸಿ',
      setPin: 'ಪಿನ್ ಹೊಂದಿಸಿ',
      confirmYourPin: 'ನಿಮ್ಮ ಪಿನ್ ದೃಢೀಕರಿಸಿ',
      pinMismatch: 'ಪಿನ್ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ',
    },
    dashboard: {
      portfolio: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ',
      totalValue: 'ಒಟ್ಟು ಮೌಲ್ಯ',
      todayChange: 'ಇಂದಿನ ಬದಲಾವಣೆ',
      assets: 'ಆಸ್ತಿಗಳು',
      security: 'ಭದ್ರತೆ',
      liabilities: 'ಹೊಣೆಗಾರಿಕೆಗಳು',
      goals: 'ಗುರಿಗಳು',
      education: 'ಶಿಕ್ಷಣ',
      quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
      recentTransactions: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',
      viewAll: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
      goodMorning: 'ಶುಭೋದಯ',
      goodAfternoon: 'ಶುಭ ಮಧ್ಯಾಹ್ನ',
      goodEvening: 'ಶುಭ ಸಂಜೆ',
      goodNight: 'ಶುಭ ರಾತ್ರಿ',
    },
    portfolio: {
      title: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ',
      totalInvestment: 'ಒಟ್ಟು ಹೂಡಿಕೆ',
      currentValue: 'ಪ್ರಸ್ತುತ ಮೌಲ್ಯ',
      totalReturns: 'ಒಟ್ಟು ಆದಾಯ',
      dayChange: 'ದಿನದ ಬದಲಾವಣೆ',
      holdings: 'ಹೊಂದಿರುವುದು',
      performance: 'ಕಾರ್ಯಕ್ಷಮತೆ',
      allocation: 'ಹಂಚಿಕೆ',
    },
    assets: {
      title: 'ಆಸ್ತಿಗಳು',
      bankAccounts: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗಳು',
      mutualFunds: 'ಮ್ಯೂಚುಯಲ್ ಫಂಡ್‌ಗಳು',
      stocks: 'ಷೇರುಗಳು',
      bonds: 'ಬಾಂಡ್‌ಗಳು',
      realEstate: 'ರಿಯಲ್ ಎಸ್ಟೇಟ್',
      gold: 'ಚಿನ್ನ',
      others: 'ಇತರೆ',
      addAsset: 'ಆಸ್ತಿ ಸೇರಿಸಿ',
      totalAssets: 'ಒಟ್ಟು ಆಸ್ತಿಗಳು',
    },
    liabilities: {
      title: 'ಹೊಣೆಗಾರಿಕೆಗಳು',
      homeLoan: 'ಮನೆ ಸಾಲ',
      personalLoan: 'ವೈಯಕ್ತಿಕ ಸಾಲ',
      carLoan: 'ಕಾರ್ ಸಾಲ',
      creditCard: 'ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
      others: 'ಇತರೆ',
      addLiability: 'ಹೊಣೆಗಾರಿಕೆ ಸೇರಿಸಿ',
      totalLiabilities: 'ಒಟ್ಟು ಹೊಣೆಗಾರಿಕೆಗಳು',
      emi: 'ಇಎಂಐ',
      outstandingAmount: 'ಬಾಕಿ ಮೊತ್ತ',
    },
    goals: {
      title: 'ಗುರಿಗಳು',
      financialGoals: 'ಆರ್ಥಿಕ ಗುರಿಗಳು',
      shortTerm: 'ಅಲ್ಪಾವಧಿ',
      mediumTerm: 'ಮಧ್ಯಮಾವಧಿ',
      longTerm: 'ದೀರ್ಘಾವಧಿ',
      retirement: 'ನಿವೃತ್ತಿ',
      education: 'ಶಿಕ್ಷಣ',
      house: 'ಮನೆ',
      car: 'ಕಾರ್',
      vacation: 'ರಜೆ',
      emergency: 'ತುರ್ತು ನಿಧಿ',
      addGoal: 'ಗುರಿ ಸೇರಿಸಿ',
      targetAmount: 'ಗುರಿ ಮೊತ್ತ',
      currentAmount: 'ಪ್ರಸ್ತುತ ಮೊತ್ತ',
      timeToGoal: 'ಗುರಿಯವರೆಗೆ ಸಮಯ',
      monthlyInvestment: 'ಮಾಸಿಕ ಹೂಡಿಕೆ',
    },
    education: {
      title: 'ಶಿಕ್ಷಣ',
      financialEducation: 'ಆರ್ಥಿಕ ಶಿಕ್ಷಣ',
      articles: 'ಲೇಖನಗಳು',
      videos: 'ವೀಡಿಯೊಗಳು',
      courses: 'ಕೋರ್ಸ್‌ಗಳು',
      webinars: 'ವೆಬಿನಾರ್‌ಗಳು',
      basics: 'ಮೂಲಭೂತ ಅಂಶಗಳು',
      investing: 'ಹೂಡಿಕೆ',
      planning: 'ಯೋಜನೆ',
      taxes: 'ತೆರಿಗೆಗಳು',
      insurance: 'ವಿಮೆ',
      retirement: 'ನಿವೃತ್ತಿ',
    },
    calculators: {
      title: 'ಆರ್ಥಿಕ ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗಳು',
      sip: 'ಎಸ್‌ಐಪಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      stp: 'ಎಸ್‌ಟಿಪಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      swp: 'ಎಸ್‌ಡಬ್ಲ್ಯೂಪಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      lumpsum: 'ಒಟ್ಟು ಮೊತ್ತ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      emi: 'ಇಎಂಐ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      retirement: 'ನಿವೃತ್ತಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      goalPlanning: 'ಗುರಿ ಯೋಜನೆ',
      taxSaving: 'ತೆರಿಗೆ ಉಳಿತಾಯ',
      compoundInterest: 'ಸಂಯುಕ್ತ ಬಡ್ಡಿ',
    },
    profile: {
      title: 'ಪ್ರೊಫೈಲ್',
      personalInfo: 'ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ',
      name: 'ಹೆಸರು',
      email: 'ಇಮೇಲ್',
      phone: 'ಫೋನ್',
      dateOfBirth: 'ಜನ್ಮ ದಿನಾಂಕ',
      address: 'ವಿಳಾಸ',
      occupation: 'ಉದ್ಯೋಗ',
      income: 'ಆದಾಯ',
      riskProfile: 'ಅಪಾಯ ಪ್ರೊಫೈಲ್',
      conservative: 'ಸಂಪ್ರದಾಯವಾದಿ',
      moderate: 'ಮಧ್ಯಮ',
      aggressive: 'ಆಕ್ರಮಣಕಾರಿ',
      editProfile: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ',
    },
    settings: {
      title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      profileSettings: 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      riskProfile: 'ಅಪಾಯ ಪ್ರೊಫೈಲ್',
      notifications: 'ಅಧಿಸೂಚನೆಗಳು',
      security: 'ಭದ್ರತೆ',
      language: 'ಭಾಷೆ',
      theme: 'ಥೀಮ್',
      about: 'ಬಗ್ಗೆ',
      help: 'ಸಹಾಯ',
      logout: 'ಲಾಗ್‌ಔಟ್',
      version: 'ಆವೃತ್ತಿ',
      termsOfService: 'ಸೇವಾ ನಿಯಮಗಳು',
      privacyPolicy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
      contactUs: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    },
    security: {
      title: 'ಭದ್ರತೆ',
      changePin: 'ಪಿನ್ ಬದಲಾಯಿಸಿ',
      biometric: 'ಬಯೋಮೆಟ್ರಿಕ್ ದೃಢೀಕರಣ',
      twoFactor: 'ಎರಡು-ಅಂಶ ದೃಢೀಕರಣ',
      loginHistory: 'ಲಾಗಿನ್ ಇತಿಹಾಸ',
      deviceManagement: 'ಸಾಧನ ನಿರ್ವಹಣೆ',
      securityTips: 'ಭದ್ರತಾ ಸಲಹೆಗಳು',
    },
    riskProfile: {
      title: 'ಅಪಾಯ ಪ್ರೊಫೈಲ್',
      assessment: 'ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ',
      questions: 'ಪ್ರಶ್ನೆಗಳು',
      result: 'ಫಲಿತಾಂಶ',
      conservative: 'ಸಂಪ್ರದಾಯವಾದಿ',
      moderate: 'ಮಧ್ಯಮ',
      aggressive: 'ಆಕ್ರಮಣಕಾರಿ',
      retakeAssessment: 'ಮೌಲ್ಯಮಾಪನವನ್ನು ಮತ್ತೆ ತೆಗೆದುಕೊಳ್ಳಿ',
    },
  },
  ta: {
    common: {
      login: 'உள்நுழைவு',
      signup: 'பதிவு செய்யுங்கள்',
      continue: 'தொடரவும்',
      back: 'பின்னால்',
      next: 'அடுத்து',
      verify: 'சரிபார்க்கவும்',
      resend: 'மீண்டும் அனுப்பவும்',
      termsAndConditions: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
      privacyPolicy: 'தனியுரிமை கொள்கை',
      save: 'சேமிக்கவும்',
      cancel: 'ரத்து செய்யவும்',
      edit: 'திருத்தவும்',
      delete: 'நீக்கவும்',
      add: 'சேர்க்கவும்',
      search: 'தேடவும்',
      filter: 'வடிகட்டவும்',
      sort: 'வரிசைப்படுத்தவும்',
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி',
      warning: 'எச்சரிக்கை',
      info: 'தகவல்',
    },
    auth: {
      welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
      enterMobile: 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
      enterPin: 'உங்கள் பின்னை உள்ளிடவும்',
      mobileNumber: 'மொபைல் எண்',
      pin: 'பின்',
      confirmPin: 'பின்னை உறுதிப்படுத்தவும்',
      forgotPin: 'பின் மறந்துவிட்டதா?',
      dontHaveAccount: 'கணக்கு இல்லையா?',
      alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
      createAccount: 'கணக்கை உருவாக்கவும்',
      verifyOtp: 'ஓடிபியை சரிபார்க்கவும்',
      otpSentTo: 'ஓடிபி அனுப்பப்பட்டது',
      enterOtp: '6 இலக்க ஓடிபியை உள்ளிடவும்',
      resendOtp: 'ஓடிபியை மீண்டும் அனுப்பவும்',
      setPin: 'பின் அமைக்கவும்',
      confirmYourPin: 'உங்கள் பின்னை உறுதிப்படுத்தவும்',
      pinMismatch: 'பின் பொருந்தவில்லை',
    },
    dashboard: {
      portfolio: 'போர்ட்ஃபோலியோ',
      totalValue: 'மொத்த மதிப்பு',
      todayChange: 'இன்றைய மாற்றம்',
      assets: 'சொத்துக்கள்',
      security: 'பாதுகாப்பு',
      liabilities: 'பொறுப்புகள்',
      goals: 'இலக்குகள்',
      education: 'கல்வி',
      quickActions: 'விரைவு செயல்கள்',
      recentTransactions: 'சமீபத்திய பரிவர்த்தனைகள்',
      viewAll: 'அனைத்தையும் பார்க்கவும்',
      goodMorning: 'காலை வணக்கம்',
      goodAfternoon: 'மதிய வணக்கம்',
      goodEvening: 'மாலை வணக்கம்',
      goodNight: 'இரவு வணக்கம்',
    },
    portfolio: {
      title: 'போர்ட்ஃபோலியோ',
      totalInvestment: 'மொத்த முதலீடு',
      currentValue: 'தற்போதைய மதிப்பு',
      totalReturns: 'மொத்த வருமானம்',
      dayChange: 'நாள் மாற்றம்',
      holdings: 'வைத்திருப்பவை',
      performance: 'செயல்திறன்',
      allocation: 'ஒதுக்கீடு',
    },
    assets: {
      title: 'சொத்துக்கள்',
      bankAccounts: 'வங்கி கணக்குகள்',
      mutualFunds: 'மியூச்சுவல் ஃபண்டுகள்',
      stocks: 'பங்குகள்',
      bonds: 'பத்திரங்கள்',
      realEstate: 'ரியல் எஸ்டேட்',
      gold: 'தங்கம்',
      others: 'மற்றவை',
      addAsset: 'சொத்து சேர்க்கவும்',
      totalAssets: 'மொத்த சொத்துக்கள்',
    },
    liabilities: {
      title: 'பொறுப்புகள்',
      homeLoan: 'வீட்டுக் கடன்',
      personalLoan: 'தனிப்பட்ட கடன்',
      carLoan: 'கார் கடன்',
      creditCard: 'கிரெடிட் கார்டு',
      others: 'மற்றவை',
      addLiability: 'பொறுப்பு சேர்க்கவும்',
      totalLiabilities: 'மொத்த பொறுப்புகள்',
      emi: 'ஈஎம்ஐ',
      outstandingAmount: 'நிலுவைத் தொகை',
    },
    goals: {
      title: 'இலக்குகள்',
      financialGoals: 'நிதி இலக்குகள்',
      shortTerm: 'குறுகிய கால',
      mediumTerm: 'நடுத்தர கால',
      longTerm: 'நீண்ட கால',
      retirement: 'ஓய்வூதியம்',
      education: 'கல்வி',
      house: 'வீடு',
      car: 'கார்',
      vacation: 'விடுமுறை',
      emergency: 'அவசரகால நிதி',
      addGoal: 'இலக்கு சேர்க்கவும்',
      targetAmount: 'இலக்கு தொகை',
      currentAmount: 'தற்போதைய தொகை',
      timeToGoal: 'இலக்கு வரை நேரம்',
      monthlyInvestment: 'மாதாந்திர முதலீடு',
    },
    education: {
      title: 'கல்வி',
      financialEducation: 'நிதிக் கல்வி',
      articles: 'கட்டுரைகள்',
      videos: 'வீடியோக்கள்',
      courses: 'பாடநெறிகள்',
      webinars: 'வெபினார்கள்',
      basics: 'அடிப்படைகள்',
      investing: 'முதலீடு',
      planning: 'திட்டமிடல்',
      taxes: 'வரிகள்',
      insurance: 'காப்பீடு',
      retirement: 'ஓய்வூதியம்',
    },
    calculators: {
      title: 'நிதி கணிப்பான்கள்',
      sip: 'எஸ்ஐபி கணிப்பான்',
      stp: 'எஸ்டிபி கணிப்பான்',
      swp: 'எஸ்டபிள்யூபி கணிப்பான்',
      lumpsum: 'மொத்த தொகை கணிப்பான்',
      emi: 'ஈஎம்ஐ கணிப்பான்',
      retirement: 'ஓய்வூதிய கணிப்பான்',
      goalPlanning: 'இலக்கு திட்டமிடல்',
      taxSaving: 'வரி சேமிப்பு',
      compoundInterest: 'கூட்டு வட்டி',
    },
    profile: {
      title: 'சுயவிவரம்',
      personalInfo: 'தனிப்பட்ட தகவல்',
      name: 'பெயர்',
      email: 'மின்னஞ்சல்',
      phone: 'தொலைபேசி',
      dateOfBirth: 'பிறந்த தேதி',
      address: 'முகவரி',
      occupation: 'தொழில்',
      income: 'வருமானம்',
      riskProfile: 'ரிஸ்க் சுயவிவரம்',
      conservative: 'பழமைவாத',
      moderate: 'மிதமான',
      aggressive: 'தீவிரமான',
      editProfile: 'சுயவிவரத்தைத் திருத்தவும்',
    },
    settings: {
      title: 'அமைப்புகள்',
      profileSettings: 'சுயவிவர அமைப்புகள்',
      riskProfile: 'ரிஸ்க் சுயவிவரம்',
      notifications: 'அறிவிப்புகள்',
      security: 'பாதுகாப்பு',
      language: 'மொழி',
      theme: 'தீம்',
      about: 'பற்றி',
      help: 'உதவி',
      logout: 'வெளியேறு',
      version: 'பதிப்பு',
      termsOfService: 'சேவை விதிமுறைகள்',
      privacyPolicy: 'தனியுரிமை கொள்கை',
      contactUs: 'எங்களைத் தொடர்பு கொள்ளவும்',
    },
    security: {
      title: 'பாதுகாப்பு',
      changePin: 'பின் மாற்றவும்',
      biometric: 'பயோமெட்ரிக் அங்கீகாரம்',
      twoFactor: 'இரு-காரணி அங்கீகாரம்',
      loginHistory: 'உள்நுழைவு வரலாறு',
      deviceManagement: 'சாதன மேலாண்மை',
      securityTips: 'பாதுகாப்பு குறிப்புகள்',
    },
    riskProfile: {
      title: 'ரிஸ்க் சுயவிவரம்',
      assessment: 'ரிஸ்க் மதிப்பீடு',
      questions: 'கேள்விகள்',
      result: 'முடிவு',
      conservative: 'பழமைவாத',
      moderate: 'மிதமான',
      aggressive: 'தீவிரமான',
      retakeAssessment: 'மதிப்பீட்டை மீண்டும் எடுக்கவும்',
    },
  },
};