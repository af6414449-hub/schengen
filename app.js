/* ---------- текстовые поля ---------- */
const TEXT_MAP = {
  f_surname:          "fill_6",
  f_surname_birth:    "fill_7",
  f_given_names:      "fill_8",
  f_dob:              "fill_9",
  f_pob:              "Text1",
  f_cob:              "fill_10",
  f_citizenship_now:  "Text2",
  f_citizenship_birth:"Text3",
  f_citizenship_other:"Text4",
  f_minor:            "Text18",
  f_id:               "fill_14",
  f_doctype_other:    "Text19",
  f_passport:         "fill_16",
  f_passport_issue:   "fill_17",
  f_passport_valid:   "fill_18",
  f_passport_issuer:  "fill_19",
  f_eu_surname:       "fill_20",
  f_eu_given:         "fill_21",
  f_eu_dob:           "fill_22",
  f_eu_cit:           "fill_23",
  f_eu_doc:           "fill_24",
  f_relation_other:   "Text20",
  f_address:          "Text21",
  f_phone:            "fill_5_2",
  f_residence_no:     "fill_1",
  f_residence_until:  "fill_2",
  f_profession:       "fill_7_2",
  f_employer:         "Text22",
  f_purpose_other:    "Text23",
  f_purpose_extra:    "fill_10_2",
  f_main_country:     "fill_11_2",
  f_first_entry:      "fill_12_2",
  f_date_in:          "Text7",
  f_date_out:         "Text8",
  f_fp_date:          "fill_3",
  f_fp_sticker:       "fill_14_2",
  f_final_from:       "Text9",
  f_final_to:         "Text10",
  f_host_name:        "Text24",
  f_host:             "Text25",
  f_host_phone:       "fill_17_2",
  f_company:          "Text27",
  f_company_contact:  "Text26",
  f_company_phone:    "fill_20_2",
  f_filler_name:      "Text11",
  f_filler_addr:      "Text12",
  f_filler_phone:     "Text13",
  f_sign_place_date:  "fill_5_3",
  f_sponsor_name:     "undefined_3",
};

const LEADING_NEWLINE = new Set([
  "f_address",
  "f_phone",
  "f_employer",
  "f_host_name",
  "f_host",
  "f_company",
  "f_company_contact",
]);

const PHONE_FIELDS = new Set([
  "f_phone",
  "f_host_phone",
  "f_company_phone",
  "f_filler_phone",
]);

const SELECT_TO_CHECK = [
  { id: "f_sex", map: { m: "toggle_21", f: "undefined", x: "undefined_2" } },
  { id: "f_marital", map: {
      single: "toggle_24", married: "toggle_25", partner: "toggle_26",
      separated: "toggle_27", divorced: "toggle_28", widowed: "toggle_29",
      other: "toggle_30",
  }},
  { id: "f_doctype", map: {
      ordinary: "toggle_31", diplomatic: "toggle_32", service: "toggle_33",
      official: "toggle_34", special: "toggle_35", other: "toggle_36",
  }},
  { id: "f_relation", map: {
      spouse: "toggle_1", child: "toggle_2", grandchild: "toggle_3",
      dependent: "toggle_4", partner: "toggle_5", other: "toggle_6",
  }},
  { id: "f_purpose", map: {
      tourism: "toggle_9", business: "toggle_10", visit: "toggle_11",
      culture: "toggle_12", sport: "toggle_13", official: "toggle_14",
      medical: "toggle_15", study: "toggle_16", transit: "toggle_17",
      other: "toggle_18",
  }},
  { id: "f_residence", map: { no: "toggle_7", yes: "toggle_8" } },
  { id: "f_fp", map: { no: "toggle_22", yes: "toggle_23" } },
  { id: "f_entries", map: { "1": "toggle_19", "2": "toggle_20", "M": "toggle_21_2" } },
];

const CHECK_MAP_SELF = {
  c_cash:        "toggle_2_2",
  c_checks:      "toggle_3_2",
  c_card:        "toggle_4_2",
  c_lodging:     "toggle_5_2",
  c_transport:   "toggle_6_2",
  c_other_money: "toggle_7_2",
};

const CHECK_MAP_SPONSOR = {
  s_mentioned:  "toggle_9_2",
  s_other:      "toggle_10_2",
  s_cash:       "toggle_11_2",
  s_lodging:    "toggle_12_2",
  s_expenses:   "toggle_13_2",
  s_transport:  "toggle_14_2",
  s_other2:     "toggle_15_2",
};

function allToggleNames() {
  const names = new Set();
  for (const { map } of SELECT_TO_CHECK) for (const n of Object.values(map)) names.add(n);
  for (const n of Object.values(CHECK_MAP_SELF)) names.add(n);
  for (const n of Object.values(CHECK_MAP_SPONSOR)) names.add(n);
  names.add("toggle_1_2");
  names.add("toggle_8_2");
  return [...names];
}

function setToggleState(btn, open) {
  const block = document.getElementById(btn.dataset.target);
  if (open) {
    block.classList.remove("hidden");
    btn.classList.add("open");
    btn.textContent = btn.textContent.replace(/\(развернуть\)\s*$/, "(свернуть)");
  } else {
    block.classList.add("hidden");
    btn.classList.remove("open");
    btn.textContent = btn.textContent.replace(/\(свернуть\)\s*$/, "(развернуть)");
  }
}

function openBlockById(blockId) {
  const block = document.getElementById(blockId);
  if (!block) return;
  block.classList.remove("hidden");
  const btn = document.querySelector(`.toggle-btn[data-target="${blockId}"]`);
  if (btn) {
    btn.classList.add("open");
    btn.textContent = btn.textContent.replace(/\(развернуть\)\s*$/, "(свернуть)");
  }
}

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const block = document.getElementById(btn.dataset.target);
    setToggleState(btn, block.classList.contains("hidden"));
  });
});

function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}
document.querySelectorAll("textarea").forEach(el => {
  el.addEventListener("input", () => autoGrow(el));
  autoGrow(el);
});

document.querySelectorAll("label").forEach(el => {
  el.title = el.textContent.trim();
});

function formatDateString(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  let out = "";
  if (digits.length > 0) out += digits.slice(0, 2);
  if (digits.length > 2) out += "-" + digits.slice(2, 4);
  if (digits.length > 4) out += "-" + digits.slice(4, 8);
  return out;
}
function attachDateMask(el) {
  el.addEventListener("input", () => {
    const out = formatDateString(el.value);
    if (el.value !== out) el.value = out;
  });
  el.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && el.value.endsWith("-")) {
      e.preventDefault();
      el.value = formatDateString(el.value.slice(0, -1));
    }
  });
}
document.querySelectorAll("textarea[placeholder='ДД-ММ-ГГГГ']").forEach(attachDateMask);

function updateDoctypeOther() {
  const v = document.getElementById("f_doctype").value;
  document.getElementById("block_doctype_other").classList.toggle("hidden", v !== "other");
}

function updateMoney() {
  const who = document.getElementById("f_money_who").value;
  document.getElementById("block_money_self").classList.toggle("hidden", who !== "self");
  document.getElementById("block_money_sponsor").classList.toggle("hidden", who !== "sponsor");
}

document.getElementById("f_doctype").addEventListener("change", updateDoctypeOther);
document.getElementById("f_money_who").addEventListener("change", updateMoney);

document.getElementById("f_marital").value = "single";
document.getElementById("f_doctype").value = "ordinary";
document.getElementById("f_purpose").value = "tourism";
document.getElementById("f_entries").value = "1";
document.getElementById("f_money_who").value = "self";
updateMoney();

/* ========================================================= */
/* ==================== STORAGE ============================ */
/* ========================================================= */

const STORAGE_KEY = "visaFiller:v1";

/**
 * Собирает текущее состояние формы в объект.
 */
function collectFormState() {
  const state = {
    texts: {},
    selects: {},
    checks: {},
    toggles: {},   // какие блоки раскрыты
  };

  // Все textarea
  document.querySelectorAll("textarea").forEach(el => {
    if (el.id) state.texts[el.id] = el.value;
  });

  // Все select
  document.querySelectorAll("select").forEach(el => {
    if (el.id) state.selects[el.id] = el.value;
  });

  // Все чекбоксы
  document.querySelectorAll("input[type=checkbox]").forEach(el => {
    if (el.id) state.checks[el.id] = el.checked;
  });

  // Состояние раскрытых блоков
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    state.toggles[btn.dataset.target] = btn.classList.contains("open");
  });

  return state;
}

/**
 * Применяет состояние к форме.
 */
function applyFormState(state) {
  if (!state || typeof state !== "object") return;

  if (state.texts) {
    for (const [id, value] of Object.entries(state.texts)) {
      const el = document.getElementById(id);
      if (el) {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        autoGrow(el);
      }
    }
  }

  if (state.selects) {
    for (const [id, value] of Object.entries(state.selects)) {
      const el = document.getElementById(id);
      if (el && el.tagName === "SELECT") {
        el.value = value;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }

  if (state.checks) {
    for (const [id, checked] of Object.entries(state.checks)) {
      const el = document.getElementById(id);
      if (el && el.type === "checkbox") el.checked = !!checked;
    }
  }

  if (state.toggles) {
    for (const [targetId, open] of Object.entries(state.toggles)) {
      const btn = document.querySelector(`.toggle-btn[data-target="${targetId}"]`);
      const block = document.getElementById(targetId);
      if (btn && block) setToggleState(btn, !!open);
    }
  }

  // После применения селектов — обновить видимость условных блоков
  updateDoctypeOther();
  updateMoney();
}

/**
 * Сохраняет состояние формы в localStorage.
 */
function saveFormState() {
  try {
    const state = collectFormState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Не удалось сохранить состояние формы:", e);
  }
}

/**
 * Загружает состояние формы из localStorage.
 */
function loadFormState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    applyFormState(state);
  } catch (e) {
    console.warn("Не удалось загрузить состояние формы:", e);
  }
}

/**
 * Очищает сохранённое состояние.
 */
function clearFormState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Не удалось очистить состояние формы:", e);
  }
}

// Автосохранение: слушаем изменения на всей форме
(function attachAutoSave() {
  let timer = null;
  const scheduleSave = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(saveFormState, 300);
  };

  document.addEventListener("input", (e) => {
    if (e.target.matches("textarea, input, select")) scheduleSave();
  });
  document.addEventListener("change", (e) => {
    if (e.target.matches("textarea, input, select")) scheduleSave();
  });

  // Открытие/закрытие блоков тоже сохраняем
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", scheduleSave);
  });

  // Перед закрытием страницы — сохранить принудительно
  window.addEventListener("beforeunload", () => {
    if (timer) clearTimeout(timer);
    saveFormState();
  });
})();

// Применяем сохранённое состояние при загрузке.
// ВАЖНО: сначала дефолтные значения (f_marital, f_doctype и т.д.),
// затем — восстановление из localStorage, чтобы перезаписать дефолты.
loadFormState();

/* ========================================================= */
/* ============ МОДАЛЬНОЕ ОКНО И ПАРСЕР ТЕКСТА ============= */
/* ========================================================= */

const modal      = document.getElementById("modal");
const modalText  = document.getElementById("modalText");
const modalError = document.getElementById("modalError");
const loadBtn    = document.getElementById("loadText");

const LABEL_TO_TARGET = [
  { label: "1. фамилия",                  id: "f_surname" },
  { label: "2. фамилия при рождении",     id: "f_surname_birth" },
  { label: "3. имя/имена",                id: "f_given_names" },
  { label: "3. имя",                      id: "f_given_names" },
  { label: "4. дата рождения",            id: "f_dob" },
  { label: "5. место рождения",           id: "f_pob" },
  { label: "6. страна рождения",          id: "f_cob" },
  { label: "7. гражданство в настоящее время", id: "f_citizenship_now" },
  { label: "гражданство при рождении",    id: "f_citizenship_birth" },
  { label: "иное гражданство",            id: "f_citizenship_other" },
  { label: "10. для несовершеннолетних",  id: "f_minor" },
  { label: "11. идентификационный номер", id: "f_id" },
  { label: "12. иной тип документа (указать)", id: "f_doctype_other" },
  { label: "13. номер",                   id: "f_passport" },
  { label: "13. номер проездного документа", id: "f_passport" },
  { label: "14. дата выдачи",             id: "f_passport_issue" },
  { label: "15. действителен до",         id: "f_passport_valid" },
  { label: "16. кем выдан (страна)",      id: "f_passport_issuer" },
  { label: "17. фамилия",                 id: "f_eu_surname" },
  { label: "17. имя/имена",               id: "f_eu_given" },
  { label: "17. имя",                     id: "f_eu_given" },
  { label: "17. дата рождения",           id: "f_eu_dob" },
  { label: "17. гражданство",             id: "f_eu_cit" },
  { label: "17. номер документа",         id: "f_eu_doc" },
  { label: "18. иное (указать)",          id: "f_relation_other" },
  { label: "19. домашний адрес и email заявителя", id: "f_address" },
  { label: "19. домашний адрес и адрес электронной почты заявителя", id: "f_address" },
  { label: "19. номер телефона",          id: "f_phone" },
  { label: "20. № вида на жительство",    id: "f_residence_no" },
  { label: "20. действителен до",         id: "f_residence_until" },
  { label: "21. профессиональная деятельность", id: "f_profession" },
  { label: "22. работодатель",            id: "f_employer" },
  { label: "23. иная цель (указать)",     id: "f_purpose_other" },
  { label: "24. дополнительные сведения о цели поездки", id: "f_purpose_extra" },
  { label: "25. страна основного пребывания", id: "f_main_country" },
  { label: "26. страна первого въезда",   id: "f_first_entry" },
  { label: "28. дата въезда",             id: "f_date_in" },
  { label: "28. дата выезда",             id: "f_date_out" },
  { label: "29. дата сдачи отпечатков",   id: "f_fp_date" },
  { label: "29. номер визовой наклейки",  id: "f_fp_sticker" },
  { label: "30. действительно с",         id: "f_final_from" },
  { label: "30. действительно до",        id: "f_final_to" },
  { label: "31. фамилия и имя приглашающего лица/лиц", id: "f_host_name" },
  { label: "31. фамилия и имя приглашающего лица/лиц (название гостиницы)", id: "f_host_name" },
  { label: "31. телефон приглашающего лица", id: "f_host_phone" },
  { label: "31. адрес и email приглашающего лица / гостиницы", id: "f_host" },
  { label: "32. название и адрес приглашающей компании", id: "f_company" },
  { label: "32. контактное лицо компании", id: "f_company_contact" },
  { label: "32. телефон компании",        id: "f_company_phone" },
  { label: "спонсор (указать)",           id: "f_sponsor_name" },
  { label: "34. фамилия и имя заполняющего", id: "f_filler_name" },
  { label: "34. телефон заполняющего",    id: "f_filler_phone" },
  { label: "34. адрес и email заполняющего", id: "f_filler_addr" },
  { label: "место и дата подписи",        id: "f_sign_place_date" },
];

const ID_TO_BLOCK = {
  f_minor:  "block_minor",
  f_id:     "block_id",
  f_eu_surname: "block_eu",
  f_eu_given:   "block_eu",
  f_eu_dob:     "block_eu",
  f_eu_cit:     "block_eu",
  f_eu_doc:     "block_eu",
  f_relation:   "block_eu",
  f_relation_other: "block_eu",
  f_residence:     "block_residence",
  f_residence_no:  "block_residence",
  f_residence_until: "block_residence",
  f_purpose_extra: "block_purpose_extra",
  f_final_from:    "block_final",
  f_final_to:      "block_final",
  f_company:       "block_company",
  f_company_contact: "block_company",
  f_company_phone:   "block_company",
  f_filler_name:   "block_filler",
  f_filler_phone:  "block_filler",
  f_filler_addr:   "block_filler",
};

const LABEL_TO_SELECT = [
  { label: "8. пол", id: "f_sex", map: {
      "мужской": "m", "женский": "f", "иной": "x",
  }},
  { label: "9. семейное положение", id: "f_marital", map: {
      "холост": "single", "не замужем": "single", "холост / не замужем": "single",
      "женат": "married", "замужем": "married", "женат/замужем": "married",
      "в зарегистрированном партнёрстве": "partner", "в зарегистрированном партнерстве": "partner",
      "не проживает с супругой": "separated", "не проживает с супругом": "separated",
      "разведён": "divorced", "разведен": "divorced", "разведена": "divorced",
      "вдовец": "widowed", "вдова": "widowed",
      "иное": "other",
  }},
  { label: "12. тип проездного документа", id: "f_doctype", map: {
      "обычный": "ordinary", "обычный паспорт": "ordinary",
      "дипломатический": "diplomatic", "дипломатический паспорт": "diplomatic",
      "служебный": "service", "служебный паспорт": "service",
      "официальный": "official", "официальный паспорт": "official",
      "особый": "special", "особый паспорт": "special",
      "иной": "other",
  }},
  { label: "18. родственная связь", id: "f_relation", map: {
      "супруг": "spouse", "супруга": "spouse", "супруг(-а)": "spouse",
      "ребенок": "child", "ребёнок": "child",
      "внук": "grandchild", "внучка": "grandchild", "внук(-чка)": "grandchild",
      "экономически зависимый родственник по восходящей линии": "dependent",
      "зарегистрированный партнер": "partner", "зарегистрированный партнёр": "partner",
      "иное": "other",
  }},
  { label: "23. цель поездки", id: "f_purpose", map: {
      "туризм": "tourism",
      "деловая": "business",
      "посещение родственников": "visit", "посещение родственников или друзей": "visit",
      "культура": "culture",
      "спорт": "sport",
      "официальная": "official",
      "лечение": "medical",
      "учеба": "study", "учёба": "study",
      "транзитный перелет": "transit", "транзитный перелёт": "transit",
      "иная": "other", "иное": "other",
  }},
  { label: "20. страна проживания", id: "f_residence", map: {
      "нет": "no", "да": "yes",
  }},
  { label: "29. отпечатки пальцев сданы ранее", id: "f_fp", map: {
      "нет": "no", "да": "yes",
  }},
  { label: "27. виза запрашивается для", id: "f_entries", map: {
      "однократного въезда": "1", "однократный": "1",
      "двукратного въезда": "2", "двукратный": "2",
      "многократного въезда": "M", "многократный": "M",
  }},
  { label: "33. средства: кто оплачивает", id: "f_money_who", map: {
      "сам заявитель": "self",
      "спонсор": "sponsor",
      "спонсор (приглашающее лицо, компания, организация)": "sponsor",
  }},
];

const LABEL_TO_CHECKBOXES = [
  { label: "средства (сам заявитель)", checks: [
      { id: "c_cash",        keys: ["наличные", "наличные деньги"] },
      { id: "c_checks",      keys: ["дорожные чеки", "чеки"] },
      { id: "c_card",        keys: ["кредитная карта", "карта"] },
      { id: "c_lodging",     keys: ["проживание предоплачено", "место проживания предоплачено"] },
      { id: "c_transport",   keys: ["транспорт предоплачен"] },
      { id: "c_other_money", keys: ["иные", "иное"] },
  ]},
  { label: "средства (спонсор)", checks: [
      { id: "s_mentioned",  keys: ["упомянутые в п. 30 и 31"] },
      { id: "s_other",      keys: ["иные"] },
      { id: "s_cash",       keys: ["наличные", "наличные деньги"] },
      { id: "s_lodging",    keys: ["обеспечивается проживание", "обеспечивается место проживания"] },
      { id: "s_expenses",   keys: ["оплачиваются все расходы", "оплачиваются все расходы во время пребывания"] },
      { id: "s_transport",  keys: ["транспорт предоплачен"] },
      { id: "s_other2",     keys: ["иные (указать)"] },
  ]},
];

function normalizeLabel(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[«»"]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*:\s*$/, "");
}

function stripNumber(s) {
  return s.replace(/^\d+\.\s*/, "");
}

const TEXT_MAP_LABEL = {};
for (const e of LABEL_TO_TARGET) {
  const withNum = normalizeLabel(e.label);
  const withoutNum = stripNumber(withNum);
  if (!(withNum in TEXT_MAP_LABEL)) TEXT_MAP_LABEL[withNum] = e.id;
  if (!(withoutNum in TEXT_MAP_LABEL)) TEXT_MAP_LABEL[withoutNum] = e.id;
}

const SELECT_MAP_LABEL = {};
for (const e of LABEL_TO_SELECT) {
  const withNum = normalizeLabel(e.label);
  const withoutNum = stripNumber(withNum);
  if (!(withNum in SELECT_MAP_LABEL)) SELECT_MAP_LABEL[withNum] = e;
  if (!(withoutNum in SELECT_MAP_LABEL)) SELECT_MAP_LABEL[withoutNum] = e;
}

const CHECK_MAP_LABEL = {};
for (const e of LABEL_TO_CHECKBOXES) {
  const withNum = normalizeLabel(e.label);
  const withoutNum = stripNumber(withNum);
  if (!(withNum in CHECK_MAP_LABEL)) CHECK_MAP_LABEL[withNum] = e;
  if (!(withoutNum in CHECK_MAP_LABEL)) CHECK_MAP_LABEL[withoutNum] = e;
}

function applyLine(rawLine) {
  const colon = rawLine.lastIndexOf(":");
  if (colon < 0) return { ok: false, reason: "нет двоеточия" };

  const rawLabel = rawLine.slice(0, colon).trim();
  const value    = rawLine.slice(colon + 1).replace(/^\s+|\s+$/g, "");

  if (!rawLabel) return { ok: false, reason: "пустая подпись" };

  const label = normalizeLabel(rawLabel);
  const valueLower = value.toLowerCase();

  const textId = TEXT_MAP_LABEL[label];
  if (textId) {
    const el = document.getElementById(textId);
    if (!el) return { ok: false, reason: "поле не найдено: " + label };
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    autoGrow(el);
    if (ID_TO_BLOCK[textId]) openBlockById(ID_TO_BLOCK[textId]);
    return { ok: true };
  }

  const selCfg = SELECT_MAP_LABEL[label];
  if (selCfg) {
    const el = document.getElementById(selCfg.id);
    if (!el) return { ok: false, reason: "селект не найден: " + label };

    let val = null;
    for (const [k, v] of Object.entries(selCfg.map)) {
      if (k === valueLower) { val = v; break; }
    }
    if (val === null) {
      for (const [k, v] of Object.entries(selCfg.map)) {
        if (valueLower.startsWith(k) || k.startsWith(valueLower)) { val = v; break; }
      }
    }
    if (val === null) return { ok: false, reason: "неизвестное значение: " + value };
    el.value = val;
    el.dispatchEvent(new Event("change", { bubbles: true }));
    if (ID_TO_BLOCK[selCfg.id]) openBlockById(ID_TO_BLOCK[selCfg.id]);
    return { ok: true };
  }

  const checkCfg = CHECK_MAP_LABEL[label];
  if (checkCfg) {
    const parts = value.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    for (const part of parts) {
      for (const c of checkCfg.checks) {
        if (c.keys.some(k => k === part || part.startsWith(k) || k.startsWith(part))) {
          const el = document.getElementById(c.id);
          if (el) el.checked = true;
        }
      }
    }
    return { ok: true };
  }

  return { ok: false, reason: "неизвестное поле: " + rawLabel };
}

loadBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modalError.classList.add("hidden");
  modalText.classList.remove("invalid");
  modalText.focus();
});

document.getElementById("modalCancel").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("modalApply").addEventListener("click", () => {
  const text = modalText.value;
  if (!text.trim()) return;

  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const badLines = [];
  const badReasons = [];

  for (const line of lines) {
    const res = applyLine(line);
    if (!res.ok) {
      badLines.push(line);
      badReasons.push(res.reason || "");
    }
  }

  if (badLines.length) {
    modalText.classList.add("invalid");
    modalError.classList.remove("hidden");
    modalError.textContent =
      "Не удалось разобрать строки:\n" +
      badLines.map((l, i) => "• " + l + " — " + badReasons[i]).join("\n");
    return;
  }

  modal.classList.add("hidden");
  saveFormState();
});

/* ========================================================= */
/* ============ КНОПКА "ЗАПОЛНИТЬ И СКАЧАТЬ" =============== */
/* ========================================================= */

const runBtn = document.getElementById("run");
const statusEl = document.getElementById("status");

runBtn.onclick = async () => {
  statusEl.textContent = "";
  try {
    const url = "form.pdf";
    const bytes = await fetch(url).then(r => r.arrayBuffer());

    const { PDFDocument } = PDFLib;
    const doc = await PDFDocument.load(bytes);
    const form = doc.getForm();

    let filled = 0;

    for (const [id, fieldName] of Object.entries(TEXT_MAP)) {
      const el = document.getElementById(id);
      if (!el) continue;
      let value = el.value.trim();
      if (!value) continue;
      if (PHONE_FIELDS.has(id)) value = value.replace(/[()\s\-]/g, "");
      if (LEADING_NEWLINE.has(id)) value = "\n" + value;

      try {
        const f = form.getTextField(fieldName);
        f.setFontSize(9);
        f.enableMultiline();
        f.setText(value);
        filled++;
        console.log("OK", fieldName, "=", value);
      } catch (e) {
        try {
          const f = form.getTextField(fieldName);
          const helv = doc.getForm().getDefaultFont();
          f.defaultUpdateAppearances(helv);
          f.setFontSize(9);
          f.enableMultiline();
          f.setText(value);
          filled++;
          console.log("OK (fallback)", fieldName, "=", value);
        } catch (e2) {
          console.warn("text FAIL", fieldName, e.message, "| fallback:", e2.message);
        }
      }
    }

    for (const name of allToggleNames()) {
      try { form.getCheckBox(name).uncheck(); } catch (e) {}
    }

    for (const { id, map } of SELECT_TO_CHECK) {
      const el = document.getElementById(id);
      if (!el) continue;
      const val = el.value;
      if (!val) continue;
      const fieldName = map[val];
      if (!fieldName) continue;
      try {
        form.getCheckBox(fieldName).check();
        filled++;
        console.log("SELECT", id, "->", fieldName);
      } catch (e) {
        console.warn("select FAIL", id, "->", fieldName, e.message);
      }
    }

    const who = document.getElementById("f_money_who").value;
    if (who === "self") {
      try { form.getCheckBox("toggle_1_2").check(); filled++; } catch (e) {}
      for (const [id, fieldName] of Object.entries(CHECK_MAP_SELF)) {
        const el = document.getElementById(id);
        if (!el || !el.checked) continue;
        try { form.getCheckBox(fieldName).check(); filled++; } catch (e) {}
      }
    } else if (who === "sponsor") {
      try { form.getCheckBox("toggle_8_2").check(); filled++; } catch (e) {}
      for (const [id, fieldName] of Object.entries(CHECK_MAP_SPONSOR)) {
        const el = document.getElementById(id);
        if (!el || !el.checked) continue;
        try { form.getCheckBox(fieldName).check(); filled++; } catch (e) {}
      }
    }

    const out = await doc.save();
    const blob = new Blob([out], { type: "application/pdf" });
    const urlOut = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlOut;

    const surname = (document.getElementById("f_surname").value || "").trim();
    const given   = (document.getElementById("f_given_names").value || "").trim();
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const fullName = [given, surname].filter(Boolean).join(" ") || "без имени";
    a.download = `Анкета (${fullName}) ${dd}-${mm}-${yyyy}.pdf`;
    a.click();
    URL.revokeObjectURL(urlOut);

    statusEl.textContent = `Готово. Заполнено полей: ${filled}.`;

    /* === STORAGE: сброс после скачивания === */
    clearFormState();
    /* ====================================== */

  } catch (e) {
    console.error(e);
    statusEl.textContent = "Ошибка: " + e.message;
  }
};
