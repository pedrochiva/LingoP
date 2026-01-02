/* assets/app.js - scripts */
document.addEventListener('DOMContentLoaded', ()=>{
  // Phrase of the day (simple)
  const phrases = [
  // Inglês
  { text: "Practice everyday — progress follows.", lang: "EN" },
  { text: "Small steps every day lead to big results.", lang: "EN" },
  { text: "Consistency is more important than speed.", lang: "EN" },
  { text: "Mistakes are proof that you are learning.", lang: "EN" },
  { text: "Speak more, fear less.", lang: "EN" },
  { text: "Learning a language opens new doors.", lang: "EN" },
  
  // Português
  { text: "Fale pouco, fale certo — pratique hoje.", lang: "PT" },
  { text: "Errar faz parte do aprendizado.", lang: "PT" },
  { text: "Um pouco todo dia vale mais que muito uma vez.", lang: "PT" },
  { text: "A prática transforma conhecimento em habilidade.", lang: "PT" },
  { text: "Não espere perfeição, comece agora.", lang: "PT" },
  
  // Francês
  { text: "Parlez tous les jours — vous progresserez.", lang: "FR" },
  { text: "Chaque jour est une nouvelle opportunité d’apprendre.", lang: "FR" },
  { text: "Les erreurs font partie de l’apprentissage.", lang: "FR" },
  { text: "La pratique rend la langue naturelle.", lang: "FR" },
  { text: "Apprendre une langue change votre monde.", lang: "FR" }
];
  
  const pEl = document.querySelector('#phrase-of-day');
  if(pEl){ const r = phrases[Math.floor(Math.random()*phrases.length)]; pEl.textContent = r.text; }

  // Pronounce button (SpeechSynthesis)
  window.pronounceText = function(text, lang){
    if(!text) return;
    const ut = new SpeechSynthesisUtterance(text);
    // set voice locale suggestion
    if(lang==='fr') ut.lang='fr-FR';
    else if(lang==='en') ut.lang='en-US';
    else ut.lang='pt-PT';
    window.speechSynthesis.speak(ut);
  }

  // Simple quiz logic
  const quizBtn = document.querySelector('#quiz-check');
  if(quizBtn){
    quizBtn.addEventListener('click', ()=>{
      const ans = document.querySelector('input[name="q1"]:checked');
      const out = document.querySelector('#quiz-result');
      if(!ans){ out.textContent='Escolha uma opção.'; out.style.color='#b91c1c'; return; }
      out.style.color='#0f7b3a';
      out.textContent = (ans.value==='b') ? 'Correto! Excelente.' : 'Quase — a resposta correta é a B.';
    });
  }

  // Translator - using libretranslate public endpoint as default (replace if needed)
  const form = document.getElementById('translate-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = document.getElementById('translate-text').value.trim();
    const from = document.getElementById('translate-from').value;
    const to = document.getElementById('translate-to').value;
    const out = document.getElementById('translate-result');
    
    if (!text) {
      out.textContent = 'Escreva algo para traduzir.';
      return;
    }
    
    out.textContent = 'Traduzindo...';
    
    try {
      const res = await fetch('https://translate.argosopentech.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          source: from === 'auto' ? 'auto' : from,
          target: to,
          format: 'text'
        })
      });
      
      if (!res.ok) {
        throw new Error('Erro na resposta da API');
      }
      
      const data = await res.json();
      
      if (data.translatedText) {
        out.textContent = data.translatedText;
      } else {
        out.textContent = 'Erro ao traduzir. Tente novamente.';
      }
      
    } catch (err) {
      console.error(err);
      out.textContent = 'Falha na tradução. Tente novamente mais tarde.';
    }
  });
}
//modal


//#################
  // simple smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
      }
    });
  });
});