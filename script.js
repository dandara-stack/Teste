const questions = [
  {
    question: "Se você pudesse voar para qualquer lugar agora, onde seria?",
    options: [
      {
        text: "Para o topo de uma montanha gelada, só para gritar no vento!",
        points: { original: 1 },
      },
      {
        text: "Para Barra de Guaratiba, ouvindo Alan Bernardes.",
        points: { ultra: 1 },
      },
      {
        text: "Para uma ilha tropical.",
        points: { mango: 1 },
      },
      {
        text: "Para um festival de música com minhas bandas favoritas",
        points: { pipeline: 1 },
      },
    ],
  },
  {
    question: "Se pudesse escolher, qual seria seu superpoder?",
    options: [
      {
        text: "Super velocidade, mas só poderá correr 100 metros por vez!",
        points: { original: 1 },
      },
      {
        text: "Invisibilidade, para escapar de situações chatas.",
        points: { ultra: 1 },
      },
      {
        text: "Ouvir os pensamentos das pessoas (Fofoca infinita).",
        points: { mango: 1 },
      },
      {
        text: "Fazer tudo ao redor dançar ao som de uma batida.",
        points: { pipeline: 1 },
      },
    ],
  },
  {
    question: "Em uma festa muito louca, o que você faria primeiro?",
    options: [
      {
        text: "Pular no palco e chamar geral pra pista de dança!",
        points: { original: 1 },
      },
      {
        text: "Comer as paradas disponíveis, porque se estou em uma festa, posso furar a dieta.",
        points: { ultra: 1 },
      },
      { text: "Caçar 'presas'.", points: { mango: 1 } },
      {
        text: "Organizar um jogo de dança com prêmios bestas.",
        points: { pipeline: 1 },
      },
    ],
  },
  {
    question: "Se você fosse um animal mitológico, qual seria?",
    options: [
      {
        text: "Um dragão feroz, cuspindo fogo o dia todo!",
        points: { original: 1 },
      },
      {
        text: "Uma fênix calma, renascendo sempre equilibrada.",
        points: { ultra: 1 },
      },
      {
        text: "Um pássaro tropical gigante, voando por florestas.",
        points: { mango: 1 },
      },
      {
        text: "Um unicórnio festeiro, com chifres arrumados.",
        points: { pipeline: 1 },
      },
    ],
  },
  {
    question: "Se sua vida fosse um filme, qual gênero seria?",
    options: [
      {
        text: "Uma aventura de ação com explosões e corridas!",
        points: { original: 1 },
      },
      {
        text: "Um drama leve sobre amizade e equilíbrio.",
        points: { ultra: 1 },
      },
      {
        text: "Uma comédia tropical no estilo 'Como Se Fosse A Primeira vez'.",
        points: { mango: 1 },
      },
      {
        text: "Um musical animado com danças e risadas.",
        points: { pipeline: 1 },
      },
    ],
  },
];

const results = {
  original: {
    title: "Você é o Monster Original!",
    image: "/img/original.webp",
    description:
      "Você é clássico, intenso e sempre pronto para a ação. Nada como uma dose de energia pura para te motivar!",
  },
  ultra: {
    title: "Você é o Monster Ultra!",
    image: "/img/ultra.webp",
    description:
      "Você prioriza saúde e equilíbrio. Seu energético é leve, mas poderoso o suficiente para te manter no ritmo!",
  },
  mango: {
    title: "Você é o Monster Mango Loco!",
    image: "/img/mangolouco.webp",
    description:
      "Aventureiro e tropical, você ama o exotismo. Seu energético é doce e te leva para jornadas incríveis!",
  },
  pipeline: {
    title: "Você é o Monster Pipeline Punch!",
    image: "/img/pipeline.png",
    description:
      "Refrescante e divertido, você é o rei da descontração. Seu energético é perfeito para momentos leves e alegres!",
  },
};

let currentQuestion = 0;
let scores = { original: 0, ultra: 0, mango: 0, pipeline: 0 };

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option.text;
    btn.addEventListener("click", () => selectOption(option.points));
    optionsDiv.appendChild(btn);
  });
}

function selectOption(points) {
  for (const [key, value] of Object.entries(points)) {
    scores[key] += value;
  }
  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    document.getElementById("next-btn").classList.add("hidden");
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("question-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  const winner = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  const result = results[winner];
  document.getElementById("result-title").textContent = result.title;
  document.getElementById("result-image").src = result.image;
  document.getElementById("result-description").textContent =
    result.description;
}

function restartQuiz() {
  currentQuestion = 0;
  scores = { original: 0, ultra: 0, mango: 0, pipeline: 0 };
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}
