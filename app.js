/* =========================================================
   Карта: номер анкеты → HTML-id (текстовые поля)
   ========================================================= */
const KEY_TO_TEXT = {
  "1":   "f_surname",
  "2":   "f_surname_birth",
  "3":   "f_given_names",
  "4":   "f_dob",
  "5":   "f_pob",
  "6":   "f_cob",
  "7":   "f_citizenship_now",
  "7.1": "f_citizenship_birth",
  "7.2": "f_citizenship_other",
  "10":  "f_minor",
  "11":  "f_id",
  "12.1":"f_doctype_other",
  "13":  "f_passport",
  "14":  "f_passport_issue",
  "15":  "f_passport_valid",
  "16":  "f_passport_issuer",
  "17.1":"f_eu_surname",
  "17.2":"f_eu_given",
  "17.3":"f_eu_dob",
  "17.4":"f_eu_cit",
  "17.5":"f_eu_doc",
  "18.1":"f_relation_other",
  "19.1":"f_address",
  "19.2":"f_phone",
  "20.1":"f_residence_no",
  "20.2":"f_residence_until",
  "21":  "f_profession",
  "22":  "f_employer",
  "23.1":"f_purpose_other",
  "24":  "f_purpose_extra",
  "25":  "f_main_country",
  "26":  "f_first_entry",
  "28.1":"f_date_in",
  "28.2":"f_date_out",
  "29.1":"f_fp_date",
  "29.2":"f_fp_sticker",
  "30.1":"f_final_from",
  "30.2":"f_final_to",
  "31.1":"f_host_name",
  "31.2":"f_host_phone",
  "31.3":"f_host",
  "32.1":"f_company",
  "32.2":"f_company_contact",
  "32.3":"f_company_phone",
  "33.1":"f_sponsor_name",
  "34.1":"f_filler_name",
  "34.2":"f_filler_phone",
  "34.3":"f_filler_addr",
  "35":  "f_sign_place_date",
};

const KEY_TO_SELECT = {
  "8":  { id: "f_sex", map: {
    "мужской": "m", "m": "m", "male": "m",
    "женский": "f", "f": "f", "female": "f",
    "иной": "x", "x": "x", "other": "x",
  }},
  "9":  { id: "f_marital", map: {
    "холост": "single", "не замужем": "single", "холост / не замужем": "single",
    "женат": "married", "замужем": "married", "женат/замужем": "married",
    "в зарегистрированном партнёрстве": "partner", "в зарегистрированном партнерстве": "partner",
    "не проживает с супругой": "separated", "не проживает с супругом": "separated",
    "разведён": "divorced", "разведен": "divorced", "разведена": "divorced",
    "вдовец": "widowed", "вдова": "widowed",
    "иное": "other",
  }},
  "12": { id: "f_doctype", map: {
    "обычный": "ordinary", "обычный паспорт": "ordinary",
    "дипломатический": "diplomatic", "дипломатический паспорт": "diplomatic",
    "служебный": "service", "служебный паспорт": "service",
    "официальный": "official", "официальный паспорт": "official",
    "особый": "special", "особый паспорт": "special",
    "иной": "other",
  }},
  "18": { id: "f_relation", map: {
    "супруг": "spouse", "супруга": "spouse", "супруг(-а)": "spouse", "spouse": "spouse",
    "ребенок": "child", "ребёнок": "child", "child": "child",
    "внук": "grandchild", "внучка": "grandchild", "внук(-чка)": "grandchild",
    "экономически зависимый родственник по восходящей линии": "dependent",
    "зарегистрированный партнер": "partner", "зарегистрированный партнёр": "partner",
    "иное": "other",
  }},
  "20": { id: "f_residence", map: {
    "нет": "no", "no": "no",
    "да": "yes", "yes": "yes",
  }},
  "23": { id: "f_purpose", map: {
    "туризм": "tourism", "tourism": "tourism",
    "деловая": "business", "business": "business",
    "посещение родственников": "visit", "посещение родственников или друзей": "visit",
    "культура": "culture", "culture": "culture",
    "спорт": "sport", "sport": "sport",
    "официальная": "official", "official": "official",
    "лечение": "medical", "medical": "medical",
    "учеба": "study", "учёба": "study", "study": "study",
    "транзитный перелет": "transit", "транзитный перелёт": "transit", "transit": "transit",
    "иная": "other", "иное": "other",
  }},
  "27": { id: "f_entries", map: {
    "однократного въезда": "1", "однократный": "1", "1": "1",
    "двукратного въезда": "2", "двукратный": "2", "2": "2",
    "многократного въезда": "M", "многократный": "M", "m": "M",
  }},
  "29": { id: "f_fp", map: {
    "нет": "no", "no": "no",
    "да": "yes", "yes": "yes",
  }},
  "33": { id: "f_money_who", map: {
    "сам заявитель": "self", "self": "self",
    "спонсор": "sponsor", "sponsor": "sponsor",
    "спонсор (приглашающее лицо, компания, организация)": "sponsor",
  }},
};

const KEY_TO_CHECKS = {
  "33.2": [
    { id: "c_cash",        keys: ["наличные", "наличные деньги", "cash"] },
    { id: "c_checks",      keys: ["дорожные чеки", "чеки", "travellers cheques"] },
    { id: "c_card",        keys: ["кредитная карта", "карта", "credit card"] },
    { id: "c_lodging",     keys: ["проживание предоплачено", "место проживания предоплачено"] },
    { id: "c_transport",   keys: ["транспорт предоплачен"] },
    { id: "c_other_money", keys: ["иные", "иное", "other"] },
  ],
  "33.3": [
    { id: "s_mentioned",  keys: ["упомянутые в п. 30 и 31", "упомянутые в пунктах 30 и 31"] },
    { id: "s_other",      keys: ["иные", "other"] },
    { id: "s_cash",       keys: ["наличные", "наличные деньги", "cash"] },
    { id: "s_lodging",    keys: ["обеспечивается проживание", "обеспечивается место проживания"] },
    { id: "s_expenses",   keys: ["оплачиваются все расходы", "оплачиваются все расходы во время пребывания"] },
    { id: "s_transport",  keys: ["транспорт предоплачен"] },
    { id: "s_other2",     keys: ["иные (указать)"] },
  ],
};

const TEXT_MAP = {
  f_surname: "fill_6",
  f_surname_birth: "fill_7",
  f_given_names: "fill_8",
  f_dob: "fill_9",
  f_pob: "Text1",
  f_cob: "fill_10",
  f_citizenship_now: "Text2",
  f_citizenship_birth: "Text3",
  f_citizenship_other: "Text4",
  f_minor: "Text18",
  f_id: "fill_14",
  f_doctype_other: "Text19",
  f_passport: "fill_16",
  f_passport_issue: "fill_17",
  f_passport_valid: "fill_18",
  f_passport_issuer: "fill_19",
  f_eu_surname: "fill_20",
  f_eu_given: "fill_21",
  f_eu_dob: "fill_22",
  f_eu_cit: "fill_23",
  f_eu_doc: "fill_24",
  f_relation_other: "Text20",
  f_address: "Text21",
  f_phone: "fill_5_2",
  f_residence_no: "fill_1",
  f_residence_until: "fill_2",
  f_profession: "fill_7_2",
  f_employer: "Text22",
  f_purpose_other: "Text23",
  f_purpose_extra: "fill_10_2",
  f_main_country: "fill_11_2",
  f_first_entry: "fill_12_2",
  f_date_in: "Text7",
  f_date_out: "Text8",
  f_fp_date: "fill_3",
  f_fp_sticker: "fill_14_2",
  f_final_from: "Text9",
  f_final_to: "Text10",
  f_host_name: "Text24",
  f_host: "Text25",
  f_host_phone: "fill_17_2",
  f_company: "Text27",
  f_company_contact: "Text26",
  f_company_phone: "fill_20_2",
  f_filler_name: "Text11",
  f_filler_addr: "Text12",
  f_filler_phone: "Text13",
  f_sign_place_date: "fill_5_3",
  f_sponsor_name: "undefined_3",
};

const LEADING_NEWLINE = new Set([
  "f_address", "f_phone", "f_employer", "f_host_name", "f_host", "f_company", "f_company_contact",
]);

const PHONE_FIELDS = new Set([
  "f_phone", "f_host_phone", "f_company_phone", "f_filler_phone",
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
  c_cash: "toggle_2_2",
  c_checks: "toggle_3_2",
  c_card: "toggle_4_2",
  c_lodging: "toggle_5_2",
  c_transport: "toggle_6_2",
  c_other_money: "toggle_7_2",
};

const CHECK_MAP_SPONSOR = {
  s_mentioned: "toggle_9_2",
  s_other: "toggle_10_2",
  s_cash: "toggle_11_2",
  s_lodging: "toggle_12_2",
  s_expenses: "toggle_13_2",
  s_transport: "toggle_14_2",
  s_other2: "toggle_15_2",
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
  if (!block) return;
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

function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

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

const ID_TO_BLOCK = {
  f_minor: "block_minor",
  f_id: "block_id",
  f_eu_surname: "block_eu",
  f_eu_given: "block_eu",
  f_eu_dob: "block_eu",
  f_eu_cit: "block_eu",
  f_eu_doc: "block_eu",
  f_relation: "block_eu",
  f_relation_other: "block_eu",
  f_residence: "block_residence",
  f_residence_no: "block_residence",
  f_residence_until: "block_residence",
  f_purpose_extra: "block_purpose_extra",
  f_final_from: "block_final",
  f_final_to: "block_final",
  f_company: "block_company",
  f_company_contact: "block_company",
  f_company_phone: "block_company",
  f_filler_name: "block_filler",
  f_filler_phone: "block_filler",
  f_filler_addr: "block_filler",
};

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const block = document.getElementById(btn.dataset.target);
    if (!block) return;
    setToggleState(btn, block.classList.contains("hidden"));
  });
});

document.querySelectorAll("textarea").forEach(el => {
  el.addEventListener("input", () => autoGrow(el));
  autoGrow(el);
});

document.querySelectorAll("label").forEach(el => {
  el.title = el.textContent.trim();
});

document.querySelectorAll("textarea[placeholder='ДД-ММ-ГГГГ']").forEach(attachDateMask);

const STORAGE_KEY = "visaFiller:v2";
let storageDisabled = false;

function collectFormState() {
  const s = { texts: {}, selects: {}, checks: {}, toggles: {} };
  document.querySelectorAll("textarea").forEach(el => { if (el.id) s.texts[el.id] = el.value; });
  document.querySelectorAll("select").forEach(el => { if (el.id) s.selects[el.id] = el.value; });
  document.querySelectorAll("input[type=checkbox]").forEach(el => { if (el.id) s.checks[el.id] = el.checked; });
  document.querySelectorAll(".toggle-btn").forEach(b => { s.toggles[b.dataset.target] = b.classList.contains("open"); });
  return s;
}

function applyFormState(s) {
  if (!s) return;
  Object.entries(s.texts || {}).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el) { el.value = v ?? ""; autoGrow(el); }
  });
  Object.entries(s.selects || {}).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el && el.tagName === "SELECT") el.value = v;
  });
  Object.entries(s.checks || {}).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el && el.type === "checkbox") el.checked = !!v;
  });
  Object.entries(s.toggles || {}).forEach(([t, open]) => {
    const btn = document.querySelector(`.toggle-btn[data-target="${t}"]`);
    if (btn) setToggleState(btn, !!open);
  });
}

function saveFormState() {
  if (storageDisabled) return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collectFormState())); } catch (e) {}
}
function loadFormState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) applyFormState(JSON.parse(raw));
  } catch (e) {}
}
function clearFormState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

document.getElementById("f_marital").value = "single";
document.getElementById("f_doctype").value = "ordinary";
document.getElementById("f_purpose").value = "tourism";
document.getElementById("f_entries").value = "1";
document.getElementById("f_money_who").value = "self";

loadFormState();

document.getElementById("block_doctype_other").classList.toggle("hidden", document.getElementById("f_doctype").value !== "other");
document.getElementById("block_money_self").classList.toggle("hidden", document.getElementById("f_money_who").value !== "self");
document.getElementById("block_money_sponsor").classList.toggle("hidden", document.getElementById("f_money_who").value !== "sponsor");

(function attachAutoSave() {
  let timer = null;
  const schedule = () => {
    if (storageDisabled) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(saveFormState, 300);
  };

  document.addEventListener("input", (e) => {
    if (storageDisabled) return;
    if (e.target && e.target.matches && e.target.matches("textarea, input, select")) schedule();
  });
  document.addEventListener("change", (e) => {
    if (storageDisabled) return;
    if (e.target && e.target.matches && e.target.matches("textarea, input, select")) saveFormState();
  });
  document.querySelectorAll(".toggle-btn").forEach(b => {
    b.addEventListener("click", () => { if (!storageDisabled) saveFormState(); });
  });

  window.addEventListener("beforeunload", () => {
    if (storageDisabled) return;
    if (timer) clearTimeout(timer);
    saveFormState();
  });
  window.addEventListener("pagehide", () => {
    if (storageDisabled) return;
    if (timer) clearTimeout(timer);
    saveFormState();
  });
})();

(function initClearButton() {
  const clearBtn = document.getElementById("clearData");
  if (!clearBtn) return;
  clearBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    const ok = window.confirm("Очистить все введённые данные и сбросить форму?");
    if (!ok) return;

    storageDisabled = true;
    clearFormState();

    document.querySelectorAll("textarea").forEach(el => { el.value = ""; });
    document.querySelectorAll("select").forEach(el => { el.selectedIndex = 0; });
    document.querySelectorAll("input[type=checkbox]").forEach(el => { el.checked = false; });

    location.reload();
  });
})();

function cleanValue(raw) {
  let v = raw.replace(/^\s+|\s+$/g, "");
  v = v.replace(/[.,;]+\s*$/, "");
  return v;
}

function splitNumberedLine(line) {
  const m = line.match(/^\s*(\d+)(?:\.(\d+))?\.?\s*(.*)$/);
  if (!m) return null;
  const key = m[2] ? `${m[1]}.${m[2]}` : m[1];
  return { key, rest: m[3] };
}

function extractValue(rest) {
  const idx = rest.lastIndexOf(":");
  if (idx < 0) return cleanValue(rest);
  return cleanValue(rest.slice(idx + 1));
}

function applyLine(rawLine) {
  const line = rawLine.replace(/\r$/, "");
  if (!line.trim()) return { ok: true, skip: true };

  const parsed = splitNumberedLine(line);
  if (!parsed) {
    return { ok: false, reason: "строка не начинается с номера" };
  }
  const { key, rest } = parsed;
  const value = extractValue(rest);

  if (!value) return { ok: true, skip: true };

  if (Object.prototype.hasOwnProperty.call(KEY_TO_TEXT, key)) {
    const id = KEY_TO_TEXT[key];
    const el = document.getElementById(id);
    if (!el) return { ok: false, reason: `поле ${key} не найдено в HTML` };

    let finalValue = value;
    if (el.placeholder === "ДД-ММ-ГГГГ") {
      finalValue = formatDateString(value);
    }

    el.value = finalValue;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    autoGrow(el);
    if (ID_TO_BLOCK[id]) openBlockById(ID_TO_BLOCK[id]);
    return { ok: true };
  }

  if (Object.prototype.hasOwnProperty.call(KEY_TO_SELECT, key)) {
    const cfg = KEY_TO_SELECT[key];
    const el = document.getElementById(cfg.id);
    if (!el) return { ok: false, reason: `селект ${key} не найден в HTML` };

    const vLower = value.toLowerCase();
    let val = null;
    for (const [k, v] of Object.entries(cfg.map)) {
      if (k.toLowerCase() === vLower) { val = v; break; }
    }
    if (val === null) {
      for (const [k, v] of Object.entries(cfg.map)) {
        const kL = k.toLowerCase();
        if (vLower.startsWith(kL) || kL.startsWith(vLower)) { val = v; break; }
      }
    }
    if (val === null) {
      return { ok: false, reason: `неизвестное значение для ${key}: "${value}"` };
    }
    el.value = val;
    el.dispatchEvent(new Event("change", { bubbles: true }));
    if (ID_TO_BLOCK[cfg.id]) openBlockById(ID_TO_BLOCK[cfg.id]);

    if (cfg.id === "f_money_who") {
      document.getElementById("block_money_self").classList.toggle("hidden", val !== "self");
      document.getElementById("block_money_sponsor").classList.toggle("hidden", val !== "sponsor");
    }
    if (cfg.id === "f_doctype") {
      document.getElementById("block_doctype_other").classList.toggle("hidden", val !== "other");
    }

    return { ok: true };
  }

  if (Object.prototype.hasOwnProperty.call(KEY_TO_CHECKS, key)) {
    const list = KEY_TO_CHECKS[key];
    const parts = value.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    for (const part of parts) {
      for (const c of list) {
        if (c.keys.some(k => {
          const kL = k.toLowerCase();
          return kL === part || part.startsWith(kL) || kL.startsWith(part);
        })) {
          const el = document.getElementById(c.id);
          if (el) el.checked = true;
        }
      }
    }
    return { ok: true };
  }

  return { ok: false, reason: `неизвестный номер: ${key}` };
}

const modal      = document.getElementById("modal");
const modalText  = document.getElementById("modalText");
const modalError = document.getElementById("modalError");
const loadBtn    = document.getElementById("loadText");

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

  const lines = text.split(/\r?\n/);
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

const runBtn = document.getElementById("run");
const statusEl = document.getElementById("status");
let lastBlobUrl = null;

runBtn.onclick = async () => {
  statusEl.textContent = "Готовлю PDF…";

  if (lastBlobUrl) {
    try { URL.revokeObjectURL(lastBlobUrl); } catch (e) {}
    lastBlobUrl = null;
  }

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
      } catch (e) {
        try {
          const f = form.getTextField(fieldName);
          const helv = doc.getForm().getDefaultFont();
          f.defaultUpdateAppearances(helv);
          f.setFontSize(9);
          f.enableMultiline();
          f.setText(value);
          filled++;
        } catch (e2) {}
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
      try { form.getCheckBox(fieldName).check(); filled++; } catch (e) {}
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
    lastBlobUrl = urlOut;

    const surname = (document.getElementById("f_surname").value || "").trim();
    const given = (document.getElementById("f_given_names").value || "").trim();
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const fullName = [given, surname].filter(Boolean).join(" ") || "без имени";
    const fileName = `Анкета (${fullName}) ${dd}-${mm}-${yyyy}.pdf`;

    const a = document.createElement("a");
    a.href = urlOut;
    a.download = fileName;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    statusEl.textContent = `Готово. Заполнено полей: ${filled}. Если файл не появился — нажми ещё раз.`;
    clearFormState();
  } catch (e) {
    statusEl.textContent = "Ошибка: " + e.message;
  }
};
