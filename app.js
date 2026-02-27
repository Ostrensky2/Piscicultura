// -------------------------------------------------------------------
// app.js � Piscicultura 2026-1 (Supabase edition)
// -------------------------------------------------------------------

// --- CONFIGURA��O SUPABASE ----------------------------------------
// Substitua pelos valores reais ap�s criar o projeto em supabase.com
const SUPABASE_URL = 'https://rftdfznpjlgwmitoykzr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdGRmem5wamxnd21pdG95a3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTgwNDYsImV4cCI6MjA4Nzc3NDA0Nn0.4iJz6TCTqSrhcwxcndqBdZF3LAmPwW5r2oq1lOFXDg8';
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- SEED (refer�ncia local � nunca vai para o DOM) ---------------
const COLORS = ['#137fec', '#8b5cf6', '#10b981', '#f59e0b', '#64748b', '#ef4444', '#06b6d4'];
const SEED_STUDENTS = [
  { name: 'ADILSON JOSE UHLIK JUNIOR', initials: 'AU' },
  { name: 'ALERRANDRO PEREIRA DE MAGALHAES', initials: 'AM' },
  { name: 'ALESSANDRA ASSUMPCAO MOREIRA', initials: 'AM' },
  { name: 'ALINE ILIAN SILVA', initials: 'AS' },
  { name: 'ANGELO GABRIEL ABREU PASSOS DE SOUSA', initials: 'AS' },
  { name: 'CARLOS EDUARDO DA CUNHA', initials: 'CC' },
  { name: 'DENISE DE FATIMA BURCHAK FERREIRA', initials: 'DF' },
  { name: 'EMANUELE EUGENIO', initials: 'EE' },
  { name: 'HANNAH SANTOS BERENGUER', initials: 'HB' },
  { name: 'HEICTOR BELLATO ARAUJO', initials: 'HA' },
  { name: 'ISABELA JUSTINO ANTUNES', initials: 'IA' },
  { name: 'ISABELLY ALVES DE MORAIS', initials: 'IM' },
  { name: 'JULIO UTUARI MAROJA', initials: 'JM' },
  { name: 'KATRINE PIETRA CAVALLI PRANDO', initials: 'KP' },
  { name: 'KHAUANE PAIANO DOS SANTOS', initials: 'KS' },
  { name: 'LEONARDO MUNHOZ BUCHER', initials: 'LB' },
  { name: 'MARIA EDUARDA PAZETTO SANITA', initials: 'MS' },
  { name: 'OLIVIA KAMINSKI KUPCZYK', initials: 'OK' },
  { name: 'RAFAEL GONCALVES DA LUZ', initials: 'RL' },
  { name: 'RAFAELA STRAPASSON PRIMIERI', initials: 'RP' },
  { name: 'SARAH MOREIRA RIBEIRO BARCIKI', initials: 'SB' },
  { name: 'VINICIUS RAAB FERREIRA', initials: 'VF' },
  { name: 'VITOR HUGO OLIVEIRA GOMES', initials: 'VG' },
].map((s, i) => ({ ...s, color: COLORS[i % COLORS.length] }));

const SEED_GROUPS = [
  { name: 'Sem aloca��o', icon: 'help', sort_order: 0 },
  { name: 'Coordena��o (Diretoria do Projeto)', icon: 'shield', sort_order: 1 },
  { name: 'Planejamento e Viabilidade', icon: 'calendar_today', sort_order: 2 },
  { name: 'Produ��o, Manejo e Qualidade de �gua', icon: 'water_drop', sort_order: 3 },
  { name: 'Nutri��o e Desempenho', icon: 'nutrition', sort_order: 4 },
  { name: 'Sustentabilidade, Licenciamento e Biosseguran�a', icon: 'eco', sort_order: 5 },
  { name: 'Mercado, Tend�ncias e Plano de Neg�cios', icon: 'storefront', sort_order: 6 },
];

// Mapeamento visual (local, sem salvar no DB)
const GROUP_META = {
  'Sem aloca��o': { bg: 'bg-slate-100', iconColor: 'text-slate-600' },
  'Coordena��o (Diretoria do Projeto)': { bg: 'bg-blue-100', iconColor: 'text-blue-600' },
  'Planejamento e Viabilidade': { bg: 'bg-orange-100', iconColor: 'text-orange-600' },
  'Produ��o, Manejo e Qualidade de �gua': { bg: 'bg-cyan-100', iconColor: 'text-cyan-700' },
  'Nutri��o e Desempenho': { bg: 'bg-green-100', iconColor: 'text-green-600' },
  'Sustentabilidade, Licenciamento e Biosseguran�a': { bg: 'bg-teal-100', iconColor: 'text-teal-600' },
  'Mercado, Tend�ncias e Plano de Neg�cios': { bg: 'bg-purple-100', iconColor: 'text-purple-600' },
};

// --- STATE --------------------------------------------------------
let sbUser = null;
let students = [];         // [{ id, full_name, initials, color, group_id, role_context, group:{name} }]
let interactions = [];     // [{ id, student_id, occurred_at, score, theme, ... }]
let sbGroups = [];         // [{ id, name, sort_order, icon }]
let curScreen = 'home', prevScreen = 'home';
let niStudentId = null, expandedGroup = null;

// --- SCORE HELPERS ------------------------------------------------
function scoreStyle(score) {
  if (score == null) return { bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0' };
  if (score >= 7) return { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' };
  if (score >= 5) return { bg: '#fffbeb', text: '#d97706', border: '#fde68a' };
  return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
}
function scoreChip(score) {
  const s = scoreStyle(score);
  const label = score == null ? '�' : parseFloat(score).toFixed(score % 1 === 0 ? 0 : 1);
  return `<div style="background:${s.bg};color:${s.text};border:1px solid ${s.border}" class="h-9 w-9 rounded-lg font-bold text-sm flex items-center justify-center flex-shrink-0">${label}</div>`;
}
function scoreBadge(score) {
  const s = scoreStyle(score);
  const label = score == null ? 'Sem Nota' : 'Nota: ' + parseFloat(score).toFixed(score % 1 === 0 ? 0 : 1);
  return `<span style="background:${s.bg};color:${s.text};border:1px solid ${s.border}" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold">${label}</span>`;
}

// --- AUTH ---------------------------------------------------------
async function signIn() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  const { error } = await _sb.auth.signInWithPassword({ email, password: pass });
  if (error) { errEl.textContent = 'Erro: ' + error.message; return; }
}
async function signOut() {
  await _sb.auth.signOut();
}

// --- BOOTSTRAP (primeiro login) -----------------------------------
async function ensureBootstrap() {
  const { count } = await _sb.from('groups').select('*', { count: 'exact', head: true });
  if (count > 0) return; // j� inicializado

  showToast('Primeiro acesso: configurando dados�');

  // Inserir grupos
  const { data: groupsInserted, error: gErr } = await _sb.from('groups').insert(
    SEED_GROUPS.map(g => ({ name: g.name, icon: g.icon, sort_order: g.sort_order }))
  ).select();
  if (gErr) { console.error('Erro grupos:', gErr); return; }

  // Pegar ID do grupo "Sem aloca��o"
  const semAloc = groupsInserted.find(g => g.name === 'Sem aloca��o');

  // Inserir alunos
  const { error: sErr } = await _sb.from('students').insert(
    SEED_STUDENTS.map((s, i) => ({
      full_name: s.name,
      initials: s.initials,
      color: s.color,
      group_id: semAloc?.id || null,
      role_context: 'Membro',
      is_active: true,
    }))
  );
  if (sErr) console.error('Erro alunos:', sErr);
  showToast('? Dados inicializados com sucesso!');
}

// --- LOAD DATA ----------------------------------------------------
async function loadData() {
  const [{ data: gs }, { data: ss }, { data: is }] = await Promise.all([
    _sb.from('groups').select('*').order('sort_order'),
    _sb.from('students').select('*, group:groups(name)').order('full_name'),
    _sb.from('interactions').select('*').order('occurred_at', { ascending: false }).limit(500),
  ]);
  sbGroups = gs || [];
  students = (ss || []).map(s => ({ ...s, grupo: s.group?.name || 'Sem aloca��o', papel: s.role_context }));
  interactions = is || [];
}

// --- TOAST --------------------------------------------------------
function showToast(msg, ms = 3000) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg z-[9999] transition-opacity';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._to);
  t._to = setTimeout(() => { t.style.opacity = '0'; }, ms);
}

// --- NAVIGATION ---------------------------------------------------
async function navigate(screen) {
  if (!sbUser && screen !== 'login') { navigate('login'); return; }
  prevScreen = curScreen; curScreen = screen;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screen)?.classList.add('active');
  window.scrollTo(0, 0);
  if (screen === 'home') { await loadData(); renderHome(); }
  if (screen === 'grupos') { await loadData(); renderGroups(); }
  if (screen === 'alunos') { await loadData(); renderAlunos(); }
  if (screen === 'relatorios') { await loadData(); initRelatorios(); }
  if (screen === 'nova-interacao') niInit();
}
function goBack() { navigate(prevScreen !== curScreen ? prevScreen : 'home'); }

// --- HOME ---------------------------------------------------------
function renderHome() {
  const scores = interactions.filter(i => i.score != null).map(i => i.score);
  document.getElementById('stat-total').textContent = interactions.length;
  document.getElementById('stat-avg').textContent = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '�';
  const list = document.getElementById('interactions-list');
  const noEl = document.getElementById('no-interactions');
  const recent = interactions.slice(0, 10);
  if (!recent.length) { list.innerHTML = ''; noEl.classList.remove('hidden'); return; }
  noEl.classList.add('hidden');
  list.innerHTML = recent.map(i => {
    const s = students.find(x => x.id === i.student_id) || { full_name: '?', initials: '?', color: '#ccc', grupo: '' };
    const dt = new Date(i.occurred_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    return `<div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition" onclick="openPerfil('${s.id}')">
      <div class="h-11 w-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style="background:${s.color}">${s.initials}</div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-center"><p class="font-semibold text-sm truncate">${s.full_name}</p><span class="text-xs text-slate-400 ml-2 flex-shrink-0">${dt}</span></div>
        <p class="text-xs text-slate-500 truncate">${i.group_snapshot_name || '�'} � ${i.theme || '�'}</p>
      </div>
      ${i.score != null ? scoreChip(i.score) : ''}
    </div>`;
  }).join('');
}

// --- GRUPOS -------------------------------------------------------
function renderGroups() {
  const q = (document.getElementById('g-search')?.value || '').toLowerCase();
  document.getElementById('groups-list').innerHTML = sbGroups.map(g => {
    const meta = GROUP_META[g.name] || { bg: 'bg-slate-100', iconColor: 'text-slate-600' };
    const members = students.filter(s => s.group_id === g.id && (!q || s.full_name.toLowerCase().includes(q) || g.name.toLowerCase().includes(q)));
    if (q && !members.length && !g.name.toLowerCase().includes(q)) return '';
    const open = expandedGroup === g.id;
    const rows = members.map(m => `<li class="flex items-center justify-between px-4 py-3 ${m.papel === 'L�der' ? 'bg-primary/5' : ''} hover:bg-slate-50 transition cursor-pointer" onclick="openPerfil('${m.id}')">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style="background:${m.color}">${m.initials}</div>
        <div>
          <div class="flex items-center gap-2"><p class="text-sm font-medium">${m.full_name}</p>${m.papel === 'L�der' ? '<span class="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded uppercase">L�der</span>' : ''}</div>
          <p class="text-xs text-slate-500">${m.papel}</p>
        </div>
      </div>
      <button class="text-xs text-primary font-semibold px-2 py-1 hover:bg-primary/10 rounded" onclick="event.stopPropagation();moveStudent('${m.id}')">Mover</button>
    </li>`).join('<li class="border-t border-slate-100 mx-4"></li>');
    return `<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <button class="w-full flex items-center justify-between p-4 ${open ? 'bg-slate-50/50' : ''} hover:bg-slate-50 transition" onclick="expandedGroup=expandedGroup==='${g.id}'?null:'${g.id}';renderGroups()">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full ${meta.bg} ${meta.iconColor} flex items-center justify-center"><span class="material-symbols-outlined text-[22px]">${g.icon || 'group'}</span></div>
          <div class="text-left"><p class="font-semibold text-sm">${g.name}</p><p class="text-xs text-slate-500">${members.length} membros</p></div>
        </div>
        <span class="material-symbols-outlined text-slate-400 transition-transform ${open ? 'rotate-180' : ''}" style="font-variation-settings:'FILL' 0">expand_more</span>
      </button>
      ${open ? `<div class="border-t border-slate-100"><ul>${rows}</ul><div class="p-3 border-t border-slate-100 text-center"><button class="text-sm text-primary font-medium flex items-center justify-center gap-1 w-full py-2 hover:bg-primary/5 rounded-lg transition"><span class="material-symbols-outlined text-[18px]" style="font-variation-settings:'FILL' 0">add_circle</span>Adicionar / Mover Aluno</button></div></div>` : ''}
    </div>`;
  }).join('');
}

function moveStudent(sid) {
  const s = students.find(x => x.id === sid);
  const opts = sbGroups.map(g => `<option value="${g.id}"${s.group_id === g.id ? ' selected' : ''}>${g.name}</option>`).join('');
  const papel = ['Membro', 'L�der', 'Coordena��o'].map(p => `<option${s.papel === p ? ' selected' : ''}>${p}</option>`).join('');
  const dlg = document.createElement('div');
  dlg.className = 'fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4';
  dlg.innerHTML = `<div class="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl">
    <h3 class="font-bold text-lg mb-1">Mover Aluno</h3><p class="text-sm text-slate-500 mb-4">${s.full_name}</p>
    <label class="text-xs font-semibold text-slate-500 uppercase mb-1 block">Grupo</label>
    <select id="mv-grupo" class="w-full rounded-xl border border-slate-200 py-3 px-4 text-sm mb-3 outline-none">${opts}</select>
    <label class="text-xs font-semibold text-slate-500 uppercase mb-1 block">Papel</label>
    <select id="mv-papel" class="w-full rounded-xl border border-slate-200 py-3 px-4 text-sm mb-5 outline-none">${papel}</select>
    <div class="flex gap-3">
      <button onclick="this.closest('.fixed').remove()" class="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold">Cancelar</button>
      <button onclick="confirmMove('${sid}')" class="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold">Confirmar</button>
    </div></div>`;
  document.body.appendChild(dlg);
}

async function confirmMove(sid) {
  const gid = document.getElementById('mv-grupo').value;
  const papel = document.getElementById('mv-papel').value;
  const { error } = await _sb.from('students').update({ group_id: gid, role_context: papel }).eq('id', sid);
  document.querySelector('.fixed.inset-0')?.remove();
  if (error) { showToast('Erro ao mover: ' + error.message); return; }
  await loadData(); renderGroups();
}

// --- ALUNOS -------------------------------------------------------
function renderAlunos() {
  const q = (document.getElementById('a-search')?.value || '').toLowerCase();
  const filtered = students.filter(s => !q || s.full_name.toLowerCase().includes(q));
  const map = interactions.reduce((acc, i) => {
    acc[i.student_id] = acc[i.student_id] || { n: 0, sum: 0 };
    acc[i.student_id].n++;
    if (i.score != null) acc[i.student_id].sum += Number(i.score);
    return acc;
  }, {});
  document.getElementById('alunos-list').innerHTML = filtered.map(s => {
    const d = map[s.id] || { n: 0, sum: 0 };
    const avg = d.n ? +(d.sum / d.n).toFixed(1) : null;
    return `<div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition" onclick="openPerfil('${s.id}')">
      <div class="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style="background:${s.color}">${s.initials}</div>
      <div class="flex-1 min-w-0"><p class="font-semibold text-sm truncate">${s.full_name}</p><p class="text-xs text-slate-500">${s.grupo} � ${s.papel}</p></div>
      <div class="flex flex-col items-end gap-1 flex-shrink-0">
        ${scoreChip(avg)}
        <span class="text-[10px] text-slate-400">${d.n} int.</span>
      </div>
    </div>`;
  }).join('') || '<p class="text-center text-slate-400 py-8 text-sm">Nenhum aluno encontrado.</p>';
}

// --- PERFIL -------------------------------------------------------
async function openPerfil(id) {
  const s = students.find(x => x.id === id); if (!s) return;
  prevScreen = curScreen; curScreen = 'perfil';
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById('screen-perfil').classList.add('active');
  window.scrollTo(0, 0);
  // buscar intera��es deste aluno em tempo real
  const { data: hist } = await _sb.from('interactions').select('*')
    .eq('student_id', id).order('occurred_at', { ascending: false });
  const h = hist || [];
  const scores = h.filter(i => i.score != null).map(i => Number(i.score));
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '�';
  const tHTML = h.map((item, idx) => {
    const dot = idx === 0 ? 'border-2 border-primary bg-white' : 'bg-slate-300 border-2 border-white ring-2 ring-slate-100';
    const dt = new Date(item.occurred_at).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    return `<div class="relative pl-8 pb-8 ${idx === h.length - 1 ? '' : 'border-l-2 border-slate-200'}">
      <div class="absolute -left-[9px] top-0 h-4 w-4 rounded-full ${dot}"></div>
      <div class="flex items-center justify-between mb-1"><span class="text-xs font-semibold text-slate-500">${dt}</span>${scoreBadge(item.score)}</div>
      <p class="text-sm font-bold mb-1">${item.theme || '(sem tema)'}</p>
      ${item.notes ? `<p class="text-sm text-slate-600 leading-relaxed mb-2">${item.notes}</p>` : ''}
      <div class="flex gap-2 flex-wrap">
        <span class="text-[10px] uppercase font-bold tracking-wide text-slate-400 bg-slate-100 px-2 py-1 rounded">${item.interaction_type || ''}</span>
        <span class="text-[10px] uppercase font-bold tracking-wide text-slate-400 bg-slate-100 px-2 py-1 rounded">${item.group_snapshot_name || ''}</span>
      </div>
    </div>`;
  }).join('') || '<p class="text-slate-400 text-sm text-center py-8">Nenhuma intera��o registrada.</p>';
  document.getElementById('perfil-content').innerHTML = `
    <div class="flex flex-col items-center pt-8 pb-6 px-4">
      <div class="relative">
        <div class="h-32 w-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-slate-50" style="background:${s.color}">${s.initials}</div>
        <div class="absolute bottom-1 right-1 bg-green-500 border-2 border-white rounded-full w-6 h-6 flex items-center justify-center"><span class="material-symbols-outlined text-white text-[14px]">check</span></div>
      </div>
      <h1 class="mt-4 text-[22px] font-bold text-center leading-tight">${s.full_name}</h1>
      <p class="text-slate-500 text-base font-medium text-center mt-1">Piscicultura 2026-1</p>
      <div class="flex gap-2 mt-3 flex-wrap justify-center">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">${s.grupo}</span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">${s.papel}</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 px-4 pb-4">
      <div class="flex flex-col gap-1 p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div class="text-primary"><span class="material-symbols-outlined">forum</span></div>
        <p class="text-2xl font-bold">${h.length}</p>
        <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Intera��es</p>
      </div>
      <div class="flex flex-col gap-1 p-4 rounded-xl bg-orange-50 border border-orange-100">
        <div class="text-orange-500"><span class="material-symbols-outlined">grade</span></div>
        <p class="text-2xl font-bold">${avg}</p>
        <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">M�dia Geral</p>
      </div>
    </div>
    <div class="flex-1 bg-white rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] mt-2">
      <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <h3 class="text-lg font-bold">Hist�rico</h3>
        <button onclick="navigate('nova-interacao')" class="flex items-center gap-1 text-sm font-semibold text-primary"><span class="material-symbols-outlined text-lg">add_circle</span>Nova Intera��o</button>
      </div>
      <div class="px-6 pt-6 pb-24">${tHTML}</div>
    </div>
    <button onclick="navigate('nova-interacao')" class="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white z-50 active:scale-95 transition-all"><span class="material-symbols-outlined text-[28px]">edit_note</span></button>`;
}

// --- NOVA INTERA��O -----------------------------------------------
function niInit() {
  niStudentId = null;
  ['ni-search', 'ni-theme', 'ni-notes'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('ni-selected')?.classList.add('hidden');
  document.getElementById('ni-dropdown')?.classList.add('hidden');
  document.getElementById('ni-score').value = 8.5;
  document.getElementById('ni-score-val').textContent = '8.5';
  const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('ni-datetime').value = now.toISOString().slice(0, 16);
  document.querySelectorAll('.chip.selected').forEach(c => c.classList.remove('selected'));
}
function niFilter() {
  const q = document.getElementById('ni-search').value.toLowerCase();
  const dd = document.getElementById('ni-dropdown');
  if (!q) { dd.classList.add('hidden'); return; }
  const res = students.filter(s => s.full_name.toLowerCase().includes(q));
  if (!res.length) { dd.classList.add('hidden'); return; }
  dd.innerHTML = res.map(s => `<button class="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left" onmousedown="niSelect('${s.id}')">
    <div class="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background:${s.color}">${s.initials}</div>
    <div><p class="font-semibold text-sm">${s.full_name}</p><p class="text-xs text-slate-400">${s.grupo} � ${s.papel}</p></div>
  </button>`).join('');
  dd.classList.remove('hidden');
}
function niShowDrop() { if (document.getElementById('ni-search').value) niFilter(); }
function niHideDrop() { document.getElementById('ni-dropdown')?.classList.add('hidden'); }
function niSelect(id) {
  const s = students.find(x => x.id === id); niStudentId = id;
  document.getElementById('ni-search').value = '';
  document.getElementById('ni-dropdown').classList.add('hidden');
  document.getElementById('ni-av').textContent = s.initials;
  document.getElementById('ni-av').style.background = s.color;
  document.getElementById('ni-name').textContent = s.full_name;
  document.getElementById('ni-meta').textContent = `${s.grupo} � ${s.papel}`;
  document.getElementById('ni-selected').classList.remove('hidden');
  document.getElementById('ni-role').value = s.papel === 'Coordena��o' ? 'Coordena��o' : s.papel === 'L�der' ? 'L�der' : 'Membro';
}
function niClear() { niStudentId = null; document.getElementById('ni-selected').classList.add('hidden'); }
function niChip(el) {
  el.classList.toggle('selected');
  document.getElementById('ni-theme').value = [...document.querySelectorAll('.chip.selected')].map(c => c.textContent).join(', ');
}
async function niSave() {
  if (!niStudentId) { showToast('Selecione um aluno primeiro!'); return; }
  const s = students.find(x => x.id === niStudentId);
  const dt = document.getElementById('ni-datetime').value;
  const rec = {
    student_id: niStudentId,
    occurred_at: dt ? new Date(dt).toISOString() : new Date().toISOString(),
    score: parseFloat(document.getElementById('ni-score').value),
    theme: document.getElementById('ni-theme').value.trim() || null,
    notes: document.getElementById('ni-notes').value.trim() || null,
    interaction_type: document.getElementById('ni-type').value,
    role_context: document.getElementById('ni-role').value,
    group_snapshot_name: s.grupo,
  };
  const { error } = await _sb.from('interactions').insert(rec);
  if (error) { showToast('Erro ao salvar: ' + error.message); return; }
  showToast(`? Intera��o salva � ${s.full_name.split(' ')[0]} (${s.grupo})`);
  navigate('home');
}

// --- RELAT�RIOS ---------------------------------------------------
function initRelatorios() {
  const ra = document.getElementById('r-aluno');
  const rg = document.getElementById('r-grupo');
  if (ra.options.length <= 1) {
    students.forEach(s => { const o = document.createElement('option'); o.value = s.id; o.textContent = s.full_name; ra.appendChild(o); });
    sbGroups.forEach(g => { const o = document.createElement('option'); o.value = g.name; o.textContent = g.name; rg.appendChild(o); });
  }
  renderRelatorios();
}
function renderRelatorios() {
  const sid = document.getElementById('r-aluno').value;
  const grp = document.getElementById('r-grupo').value;
  const de = document.getElementById('r-de').value;
  const ate = document.getElementById('r-ate').value;
  const tema = (document.getElementById('r-tema').value || '').toLowerCase();
  const data = interactions.filter(i => {
    if (sid && i.student_id !== sid) return false;
    if (grp && i.group_snapshot_name !== grp) return false;
    if (de && i.occurred_at.slice(0, 10) < de) return false;
    if (ate && i.occurred_at.slice(0, 10) > ate) return false;
    if (tema && !(i.theme || '').toLowerCase().includes(tema)) return false;
    return true;
  });
  const scores = data.filter(i => i.score != null).map(i => Number(i.score));
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '�';
  document.getElementById('r-summary').innerHTML = `
    <div class="p-4 rounded-xl bg-primary/5 border border-primary/10"><p class="text-2xl font-bold">${data.length}</p><p class="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Intera��es</p></div>
    <div class="p-4 rounded-xl bg-orange-50 border border-orange-100"><p class="text-2xl font-bold">${avg}</p><p class="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">M�dia Nota</p></div>`;
  document.getElementById('r-list').innerHTML = data.map(i => {
    const s = students.find(x => x.id === i.student_id) || { full_name: '?', initials: '?', color: '#ccc' };
    const dt = new Date(i.occurred_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    return `<div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
      <div class="h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style="background:${s.color}">${s.initials}</div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm truncate">${s.full_name}</p>
        <p class="text-xs text-slate-500 truncate">${dt} � ${i.group_snapshot_name || '�'} � ${i.interaction_type || ''}</p>
        <p class="text-xs text-slate-400 truncate">${i.theme || '�'}</p>
      </div>
      ${i.score != null ? scoreChip(i.score) : ''}
    </div>`;
  }).join('') || '<p class="text-center text-slate-400 py-8 text-sm">Nenhuma intera��o para os filtros selecionados.</p>';
}

// --- EXPORTAR CSV ------------------------------------------------
function exportCSV() {
  const sid = document.getElementById('r-aluno')?.value;
  const grp = document.getElementById('r-grupo')?.value;
  const de = document.getElementById('r-de')?.value;
  const ate = document.getElementById('r-ate')?.value;
  const tema = (document.getElementById('r-tema')?.value || '').toLowerCase();
  const data = interactions.filter(i => {
    if (sid && i.student_id !== sid) return false;
    if (grp && i.group_snapshot_name !== grp) return false;
    if (de && i.occurred_at.slice(0, 10) < de) return false;
    if (ate && i.occurred_at.slice(0, 10) > ate) return false;
    if (tema && !(i.theme || '').toLowerCase().includes(tema)) return false;
    return true;
  });
  const esc = v => `"${(v || '').toString().replace(/"/g, '""')}"`;
  const header = 'Nome,Grupo (snapshot),Data/Hora,Nota,Tipo,Papel,Tema,Observacoes';
  const rows = data.map(i => {
    const s = students.find(x => x.id === i.student_id) || { full_name: '?' };
    return [esc(s.full_name), esc(i.group_snapshot_name), esc(new Date(i.occurred_at).toLocaleString('pt-BR')),
    i.score ?? '', esc(i.interaction_type), esc(i.role_context), esc(i.theme), esc(i.notes)].join(',');
  });
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent([header, ...rows].join('\n'));
  a.download = `piscicultura_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

// --- IMPORTAR DO LOCALSTORAGE -------------------------------------
async function importFromLocalStorage() {
  const rawS = localStorage.getItem('psc_students');
  const rawI = localStorage.getItem('psc_interactions');
  if (!rawI) { showToast('Nenhuma intera��o encontrada no localStorage.'); return; }
  const localStudents = JSON.parse(rawS || '[]');
  const localInteractions = JSON.parse(rawI || '[]');
  if (!localInteractions.length) { showToast('Nenhuma intera��o para importar.'); return; }

  showToast(`Importando ${localInteractions.length} intera��es�`);
  let ok = 0, skip = 0;
  for (const li of localInteractions) {
    const ls = localStudents.find(x => x.id === li.student_id);
    if (!ls) { skip++; continue; }
    const dbS = students.find(x => x.full_name === ls.name);
    if (!dbS) { skip++; continue; }
    // dedup simples
    const dup = interactions.find(x =>
      x.student_id === dbS.id &&
      x.occurred_at.slice(0, 16) === new Date(li.occurred_at).toISOString().slice(0, 16) &&
      String(x.score) === String(li.score)
    );
    if (dup) { skip++; continue; }
    const { error } = await _sb.from('interactions').insert({
      student_id: dbS.id,
      occurred_at: li.occurred_at,
      score: li.score,
      theme: li.theme || null,
      notes: li.notes || null,
      interaction_type: li.interaction_type || null,
      role_context: li.role_context || null,
      group_snapshot_name: li.group_snapshot_name || ls.grupo || null,
    });
    if (!error) ok++; else skip++;
  }
  await loadData();
  renderHome();
  showToast(`? Importadas: ${ok} | Ignoradas/erros: ${skip}`, 5000);
}

// --- INICIALIZA��O ------------------------------------------------
_sb.auth.onAuthStateChange(async (event, session) => {
  sbUser = session?.user || null;
  if (sbUser) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-home').classList.add('active');
    curScreen = 'home';
    // Mostrar email no header
    const emailEl = document.getElementById('hdr-email');
    if (emailEl) emailEl.textContent = sbUser.email;
    await ensureBootstrap();
    await loadData();
    renderHome();
  } else {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-login').classList.add('active');
    curScreen = 'login';
  }
});
