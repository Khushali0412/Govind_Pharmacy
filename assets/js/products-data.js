/*
 * Govind Remedies – product catalogue data
 * Source: "Finished Dosage Formulations – Advanced Prefilled Syringe Technology" brochure
 *         and "Empty Syringe" brochure.
 * Used by: products.html, index.html (browser) and tools/build-products.js (Node).
 *
 * Pack codes:  SN = Staked (fixed) Needle syringe,  LT = Luer Tip syringe.
 * Row format:  [sr, strength, packSize, market, material]
 *   market   : "Export" | "Domestic/Export" | ""   (as printed in the brochure)
 *   material : "Glass" | "Glass/COC" | ""          (printed for the vitamin range)
 */
(function (root) {
  var CATEGORIES = [
    { id: 'anticoagulants', name: 'Anticoagulants', short: 'Anticoagulants',
      blurb: 'Heparin and low molecular weight heparins in ready-to-use prefilled syringes.' },
    { id: 'vitamins', name: 'Vitamins', short: 'Vitamins',
      blurb: 'Parenteral vitamin B-series, D3 and K1 presentations.' },
    { id: 'nutrient-replenishers', name: 'Nutrient Replenishers', short: 'Nutrient Replenishers',
      blurb: 'Electrolyte, dextrose and intravenous iron solutions.' },
    { id: 'anticancer', name: 'Anticancer', short: 'Anticancer',
      blurb: 'Specialty oncology injectables.' },
    { id: 'weight-antidiabetic', name: 'Weight Management & Antidiabetic', short: 'Weight & Antidiabetic',
      blurb: 'GLP-1 receptor agonist syringes and pens.' },
    { id: 'pain-management', name: 'Pain Management', short: 'Pain Management',
      blurb: 'Analgesics, muscle relaxants, anaesthetics and joint-care injectables.' },
    { id: 'critical-care', name: 'Critical Care', short: 'Critical Care',
      blurb: 'Emergency, anaesthesia and intensive-care injectables.' },
    { id: 'others', name: 'Others', short: 'Others',
      blurb: 'Anti-infectives, hormones, antiemetics and other specialty injectables.' }
  ];

  var PRODUCTS = [
    // ---------------------------------------------------------------- Anticoagulants
    { slug: 'heparin', name: 'Heparin', cat: 'anticoagulants',
      desc: 'Unfractionated heparin anticoagulant for the prevention and treatment of thrombosis.',
      rows: [[1, '5000 IU/ml', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'enoxaparin', name: 'Enoxaparin', cat: 'anticoagulants',
      desc: 'Low molecular weight heparin for prophylaxis and treatment of deep vein thrombosis, offered in five strengths.',
      rows: [[2, '20 mg', '1 ml SN', 'Domestic/Export', ''], [3, '40 mg', '1 ml SN', 'Domestic/Export', ''],
             [4, '60 mg', '1 ml SN', 'Domestic/Export', ''], [5, '80 mg', '1 ml SN', 'Domestic/Export', ''],
             [6, '100 mg', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'fondaparinux', name: 'Fondaparinux', cat: 'anticoagulants',
      desc: 'Synthetic factor Xa inhibitor used for prevention of venous thromboembolism.',
      rows: [[7, '5 mg/mL', '1 ml SN', 'Export', '']] },
    { slug: 'nadroparin', name: 'Nadroparin', cat: 'anticoagulants',
      desc: 'Low molecular weight heparin available across the full graduated-dose range.',
      rows: [[8, '2850 IU AXA/0.3 mL', '1 ml SN', 'Export', ''], [9, '3800 IU AXA/0.4 mL', '1 ml SN', 'Export', ''],
             [10, '5700 IU AXA/0.6 mL', '1 ml SN', 'Export', ''], [11, '7600 IU AXA/0.8 mL', '1 ml SN', 'Export', ''],
             [12, '9500 IU AXA/1 mL', '1 ml SN', 'Export', '']] },
    { slug: 'tinzaparin', name: 'Tinzaparin', cat: 'anticoagulants',
      desc: 'Low molecular weight heparin for treatment and prevention of venous thromboembolism.',
      rows: [[13, '3500 - 4500 IU', '1 ml SN', 'Export', '']] },
    { slug: 'dalteparin', name: 'Dalteparin', cat: 'anticoagulants',
      desc: 'Low molecular weight heparin in graduated prefilled syringes for thromboprophylaxis.',
      rows: [[14, '2500 IU/0.2 ml', '1 ml SN', 'Export', ''], [15, '5000 IU/0.3 ml', '1 ml SN', 'Export', '']] },

    // ---------------------------------------------------------------- Vitamins
    { slug: 'vitamin-b1', name: 'Vitamin B1 (Thiamine)', cat: 'vitamins',
      desc: 'Thiamine injection for the correction and prevention of vitamin B1 deficiency.',
      rows: [[16, '100 mg/ml', '1 ml SN', '', 'Glass']] },
    { slug: 'vitamin-b1-b6-b12-nicotinamide', name: 'Vitamin B1 + B6 + B12 + Nicotinamide', cat: 'vitamins',
      desc: 'Multi-vitamin B-complex combination with nicotinamide in a single prefilled syringe.',
      rows: [[17, 'Mix', '1 ml SN', '', 'Glass']] },
    { slug: 'vitamin-b1-b6-b12', name: 'Vitamin B1 + B6 + B12', cat: 'vitamins',
      desc: 'Neurotropic vitamin B1, B6 and B12 combination for parenteral use.',
      rows: [[18, 'Mix', '2.25 ml LT', '', 'Glass/COC']] },
    { slug: 'vitamin-b12-methylcobalamin', name: 'Vitamin B12 (Methylcobalamin)', cat: 'vitamins',
      desc: 'Methylcobalamin, the active coenzyme form of vitamin B12, for injectable supplementation.',
      rows: [[19, '1500 mcg/ml', '1 ml SN', '', 'Glass']] },
    { slug: 'vitamin-b12-nicotinamide-folic-acid', name: 'Vitamin B12 + Nicotinamide + Folic Acid', cat: 'vitamins',
      desc: 'Balanced B12, nicotinamide and folic acid combination for parenteral use.',
      rows: [[20, 'Mix', '1 ml SN', '', 'Glass']] },
    { slug: 'vitamin-d3', name: 'Vitamin D3', cat: 'vitamins',
      desc: 'High-potency cholecalciferol injection for vitamin D deficiency.',
      rows: [[21, '600000 IU/ml', '1 ml SN', '', 'Glass']] },
    { slug: 'vitamin-k1', name: 'Vitamin K1 (Phytomenadione)', cat: 'vitamins',
      desc: 'Phytomenadione injection for coagulation disorders caused by vitamin K deficiency.',
      rows: [[22, '10 mg/ml', '1 ml SN', '', 'Glass']] },

    // ---------------------------------------------------------------- Nutrient replenishers
    { slug: 'dextrose', name: 'Dextrose', cat: 'nutrient-replenishers',
      desc: 'Concentrated 50% dextrose solution for hypoglycaemia and caloric supply.',
      rows: [[23, '50 %', '50 ml LT', 'Export', '']] },
    { slug: 'sodium-bicarbonate', name: 'Sodium Bicarbonate', cat: 'nutrient-replenishers',
      desc: 'Alkalinising agent used in the correction of metabolic acidosis.',
      rows: [[24, '8.40%', '50 ml LT', 'Export', '']] },
    { slug: 'sodium-chloride', name: 'Sodium Chloride', cat: 'nutrient-replenishers',
      desc: 'Isotonic 0.9% sodium chloride solution for fluid replacement and flushing.',
      rows: [[25, '0.9%', '50 ml LT', 'Export', '']] },
    { slug: 'calcium-chloride', name: 'Calcium Chloride', cat: 'nutrient-replenishers',
      desc: 'Electrolyte replenisher for the treatment of acute hypocalcaemia.',
      rows: [[26, '10%', '10 ml LT', 'Export', '']] },
    { slug: 'iron-sucrose', name: 'Iron Sucrose', cat: 'nutrient-replenishers',
      desc: 'Intravenous iron complex for iron-deficiency anaemia.',
      rows: [[27, '20 mg/mL', '5 ml LT', 'Export', '']] },
    { slug: 'ferric-carboxymaltose', name: 'Ferric Carboxymaltose', cat: 'nutrient-replenishers',
      desc: 'Intravenous iron replacement for iron-deficiency anaemia.',
      rows: [[28, '50 mg/ml', '10 ml LT', 'Export', '']] },

    // ---------------------------------------------------------------- Anticancer
    { slug: 'fulvestrant', name: 'Fulvestrant', cat: 'anticancer',
      desc: 'Oestrogen-receptor antagonist for hormone-receptor-positive breast cancer.',
      rows: [[29, '250 mg/5 ml', '5 ml LT', 'Domestic/Export', '']] },

    // ---------------------------------------------------------------- Weight management & antidiabetic
    { slug: 'semaglutide', name: 'Semaglutide', cat: 'weight-antidiabetic',
      desc: 'GLP-1 receptor agonist for type 2 diabetes and weight management, in prefilled syringes and a 3 ml pen.',
      rows: [[30, '0.25 - 1 mg', '3 ml Pen', 'Export', ''], [31, '0.25/ml', '1 ml SN', 'Export', ''],
             [32, '0.5 mg/mL', '1 ml SN', 'Export', ''], [33, '1 mg/mL', '1 ml SN', 'Export', ''],
             [34, '2 mg/ml', '1 ml SN', 'Export', '']] },

    // ---------------------------------------------------------------- Pain management
    { slug: 'aceclofenac-sodium', name: 'Aceclofenac Sodium', cat: 'pain-management',
      desc: 'Non-steroidal anti-inflammatory analgesic for pain and inflammation.',
      rows: [[35, '150 mg/ml', '1 ml SN', 'Export', '']] },
    { slug: 'diclofenac-sodium', name: 'Diclofenac Sodium', cat: 'pain-management',
      desc: 'NSAID injection for acute pain and inflammatory conditions.',
      rows: [[36, '75 mg/ml', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'thiocolchicoside', name: 'Thiocolchicoside', cat: 'pain-management',
      desc: 'Muscle relaxant for painful muscle contractures.',
      rows: [[37, '4 mg/2 ml', '2.25 ml LT', 'Export', '']] },
    { slug: 'sodium-hyaluronate', name: 'Sodium Hyaluronate', cat: 'pain-management',
      desc: 'Viscoelastic intra-articular injection for joint care, in four fill volumes.',
      rows: [[38, '2 ml filled', '2.25 ml LT', 'Domestic/Export', ''], [39, '3 ml filled', '5 ml LT', 'Domestic/Export', ''],
             [40, '4 ml filled', '5 ml LT', 'Domestic/Export', ''], [41, '6 ml filled', '10 ml LT', 'Domestic/Export', '']] },
    { slug: 'ketorolac-tromethamine', name: 'Ketorolac Tromethamine', cat: 'pain-management',
      desc: 'NSAID analgesic for short-term management of moderate to severe pain.',
      rows: [[42, '30 mg/ml', '1 ml SN', 'Domestic/Export', ''], [43, '60 mg/2 ml', '2.25 ml LT', 'Domestic/Export', '']] },
    { slug: 'nalbuphine-hcl', name: 'Nalbuphine HCl', cat: 'pain-management',
      desc: 'Opioid analgesic for moderate to severe pain.',
      rows: [[44, '10 mg/ml', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'lidocaine', name: 'Lidocaine', cat: 'pain-management',
      desc: 'Local anaesthetic and antiarrhythmic solution, supplied in two fill sizes.',
      rows: [[45, '2%', '5 ml LT', 'Domestic/Export', ''], [46, '2%', '10 ml LT', 'Domestic/Export', '']] },

    // ---------------------------------------------------------------- Critical care
    { slug: 'adenosine', name: 'Adenosine', cat: 'critical-care',
      desc: 'Antiarrhythmic for rapid conversion of paroxysmal supraventricular tachycardia.',
      rows: [[47, '3 mg/ml', '2.25 ml LT', 'Domestic/Export', '']] },
    { slug: 'adrenaline', name: 'Adrenaline', cat: 'critical-care',
      desc: 'Emergency sympathomimetic for anaphylaxis and cardiac arrest, in three presentations.',
      rows: [[48, '1 mg/mL', '1 ml SN', 'Domestic/Export', ''], [49, '0.1 mg/mL', '10 ml LT', 'Domestic/Export', ''],
             [50, '0.1 mg/mL', '5 ml LT', 'Domestic/Export', '']] },
    { slug: 'alfentanil-hcl', name: 'Alfentanil HCl', cat: 'critical-care',
      desc: 'Short-acting opioid analgesic used in anaesthesia.',
      rows: [[51, '500 mcg/ml', '1 ml SN', 'Export', '']] },
    { slug: 'alprostadil', name: 'Alprostadil', cat: 'critical-care',
      desc: 'Prostaglandin E1 formulation for specialty clinical use.',
      rows: [[52, '0.5 mg/mL', '1 ml SN', 'Export', '']] },
    { slug: 'atropine-sulphate', name: 'Atropine Sulphate', cat: 'critical-care',
      desc: 'Anticholinergic for bradycardia and as a pre-anaesthetic agent, in three presentations.',
      rows: [[53, '0.1 mg/ml', '1 ml SN', 'Domestic/Export', ''], [54, '0.1 mg/ml', '10 ml LT', 'Domestic/Export', ''],
             [55, '0.1 mg/ml', '5 ml LT', 'Domestic/Export', '']] },
    { slug: 'dopamine', name: 'Dopamine', cat: 'critical-care',
      desc: 'Inotropic and vasopressor support for shock and haemodynamic instability.',
      rows: [[56, '200 mg/ml', '5 ml LT', 'Domestic/Export', '']] },
    { slug: 'etomidate', name: 'Etomidate', cat: 'critical-care',
      desc: 'Intravenous hypnotic agent for induction of general anaesthesia.',
      rows: [[57, '2 mg/ml', '10 ml LT', 'Export', '']] },
    { slug: 'protamine-sulphate', name: 'Protamine Sulphate', cat: 'critical-care',
      desc: 'Reversal agent for heparin overdose.',
      rows: [[58, '50 mg/5 ml', '5 ml LT', 'Domestic/Export', '']] },
    { slug: 'pancuronium-bromide', name: 'Pancuronium Bromide', cat: 'critical-care',
      desc: 'Non-depolarising neuromuscular blocker used during anaesthesia.',
      rows: [[59, '4 mg/2 ml', '2.25 ml LT', 'Domestic/Export', '']] },
    { slug: 'rocuronium-bromide', name: 'Rocuronium Bromide', cat: 'critical-care',
      desc: 'Neuromuscular blocking agent for intubation and surgical relaxation.',
      rows: [[60, '50 mg/5 ml', '5 ml LT', 'Export', '']] },
    { slug: 'succinylcholine-chloride', name: 'Succinylcholine Chloride', cat: 'critical-care',
      desc: 'Fast-acting depolarising neuromuscular blocker for rapid sequence intubation.',
      rows: [[61, '100 mg/5 ml', '5 ml LT', 'Export', '']] },
    { slug: 'sugammadex-sodium', name: 'Sugammadex Sodium', cat: 'critical-care',
      desc: 'Reversal agent for neuromuscular blockade induced by rocuronium or vecuronium.',
      rows: [[62, '100 mg/ml', '2.25 ml LT', 'Export', '']] },
    { slug: 'terlipressin-acetate', name: 'Terlipressin Acetate', cat: 'critical-care',
      desc: 'Vasopressin analogue for variceal bleeding and hepatorenal syndrome.',
      rows: [[63, '1 mg/5 ml', '5 ml LT', 'Domestic/Export', ''], [64, '1 mg/8.5 ml', '10 ml LT', 'Domestic/Export', '']] },
    { slug: 'tranexamic-acid', name: 'Tranexamic Acid', cat: 'critical-care',
      desc: 'Antifibrinolytic for the control of bleeding.',
      rows: [[65, '100 mg/mL', '5 ml LT', 'Domestic/Export', '']] },

    // ---------------------------------------------------------------- Others
    { slug: 'amikacin', name: 'Amikacin', cat: 'others',
      desc: 'Aminoglycoside antibiotic for serious Gram-negative infections.',
      rows: [[66, '250 mg/mL', '2.25 ml LT', 'Domestic/Export', '']] },
    { slug: 'caffeine', name: 'Caffeine', cat: 'others',
      desc: 'Respiratory stimulant used in neonatal apnoea.',
      rows: [[67, '20 mg/ml', '2.25 ml LT', 'Domestic/Export', '']] },
    { slug: 'carbetocin', name: 'Carbetocin', cat: 'others',
      desc: 'Long-acting oxytocin analogue for prevention of postpartum haemorrhage.',
      rows: [[68, '100 mcg/ml', '1 ml SN', 'Export', '']] },
    { slug: 'cetrorelix', name: 'Cetrorelix', cat: 'others',
      desc: 'GnRH antagonist used in assisted reproduction protocols.',
      rows: [[69, '0.25 mg', '1 ml SN', 'Export', '']] },
    { slug: 'esmolol-hydrochloride', name: 'Esmolol Hydrochloride', cat: 'others',
      desc: 'Ultra-short-acting beta-blocker for rapid heart-rate control.',
      rows: [[70, '10 mg/ml', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'fluphenazine-decanoate', name: 'Fluphenazine Decanoate', cat: 'others',
      desc: 'Long-acting depot antipsychotic for maintenance treatment.',
      rows: [[71, '25 mg/ml', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'granisetron-hydrochloride', name: 'Granisetron Hydrochloride', cat: 'others',
      desc: 'Antiemetic for prevention of chemotherapy-induced nausea and vomiting.',
      rows: [[72, '3 mg/ml', '1 ml SN', 'Domestic/Export', '']] },
    { slug: 'hydroxypropyl-methyl-cellulose', name: 'Hydroxypropyl Methyl Cellulose', cat: 'others',
      desc: 'Viscoelastic solution supplied in prefilled syringes in 40 mg and 60 mg fills.',
      rows: [[73, '20 mg/ml - 40 mg', '2.25 ml LT', 'Domestic/Export', ''], [74, '20 mg/ml - 60 mg', '5 ml LT', 'Domestic/Export', '']] },
    { slug: 'octreotide', name: 'Octreotide', cat: 'others',
      desc: 'Somatostatin analogue for acromegaly and neuroendocrine tumour symptoms.',
      rows: [[75, '50 mcg/mL', '1 ml SN', 'Export', ''], [76, '100 mcg/ml', '1 ml SN', 'Export', '']] }
  ];

  /* Empty syringe & cartridge range (Empty Syringe brochure) */
  var EMPTY_SYRINGES = {
    tagline: 'Precision | Purity | Performance',
    feature: 'Bonded / fixed needle · Non-detachable cannula',
    groups: [
      { id: 'glass', name: 'Glass', items: ['0.5 ml SN', '1 ml SN', '1 ml LT', '2.25 ml LT', '5 ml LT', '10 ml LT'] },
      { id: 'coc-cop', name: 'COC / COP', items: ['1 ml SN', '1 ml LT', '2.25 ml LT', '5 ml LT', '10 ml LT', '50 ml LT'] },
      { id: 'cartridge', name: 'Cartridge', items: ['3 ml Glass', '3 ml COC'] },
      { id: 'contrast', name: 'Contrast Media', items: ['150 ml PC', '150 ml COC'] }
    ]
  };

  var CONTACT = {
    exports: 'Exports@govindremedies.com',
    domestic: 'domesticsales@govindremedies.com',
    info: 'info@govindremedies.com',
    phone: '+91 79 4603 3735',
    web: 'www.govindremedies.com',
    factory: 'Survey No. 359, N.H. 8, Opp. Kerala G.I.D.C, Village - Kerala, Ta-Bavla, Dist-Ahmedabad, Gujarat, India - 382220.',
    corporate: '112 B, Block-A, Ganesh Meredian, Opp. Kargil Petrol Pump, S G Highway, Ahmedabad, Gujarat, India - 380060.'
  };

  var api = { CATEGORIES: CATEGORIES, PRODUCTS: PRODUCTS, EMPTY_SYRINGES: EMPTY_SYRINGES, CONTACT: CONTACT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GOVIND_DATA = api;
})(typeof window !== 'undefined' ? window : this);
