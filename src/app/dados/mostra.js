// Programação da Mostra Competitiva da 13ª Mostra de Cinema de Gostoso (2026).
//
// Cada dia tem DUAS votações separadas:
//   - curtas: aberta no intervalo, logo depois dos curtas;
//   - longas: aberta depois que o(s) longa(s) terminar(em).
// Quem abre e encerra cada votação é a equipe, pelo painel /admin
// (não há mais horário automático). Na votação de curtas só aparecem
// os curtas do dia, e na de longas só os longas.
//
// imagem: still do filme, em /public/mostra2026/filmes/ (1280x720, recortado em 16:9).

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export const CATEGORIAS = {
  curtas: { nome: 'Curtas', singular: 'Curta-metragem' },
  longas: { nome: 'Longas', singular: 'Longa-metragem' },
};

const DIAS = [
  {
    data: '2026-11-21',
    diaSemana: 'Sábado',
    curtas: [
      {
        id: 'lagoa-do-abandono',
        titulo: 'Lagoa do Abandono',
        duracao: 10,
        uf: 'CE',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Diego Maia',
        sinopse:
          'Em 2040, na degradada Lagoa de Messejana, um casal de garças luta para encontrar um lugar para construir um ninho, enquanto a aproximação de trabalhadores e máquinas se torna uma ameaça crescente.',
        imagem: '/mostra2026/filmes/lagoa-do-abandono.jpg',
      },
      {
        id: 'irma',
        titulo: 'Irmã',
        duracao: 25,
        uf: 'ES',
        ano: 2026,
        classificacao: '12 anos',
        direcao: 'Anderson Bardot',
        sinopse:
          'Iara e Elisa estão conectadas pelas águas de uma cachoeira ancestral — as mesmas águas que um dia batizaram seus pais na fé evangélica.',
        imagem: '/mostra2026/filmes/irma.jpg',
      },
      {
        id: 'revelacao',
        titulo: 'Revelação',
        duracao: 17,
        uf: 'RJ',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Gabriela I. Gaia',
        sinopse:
          'Um disco rígido encontrado em um sítio arqueológico do Méier, antigo subúrbio de um território conhecido como Rio de Janeiro, revela imagens inéditas da preparação de um ritual festivo celebrado nos Anos de Surto: o chá de revelação de gênero.',
        imagem: '/mostra2026/filmes/revelacao.jpg',
      },
      {
        id: 'disciplina',
        titulo: 'Disciplina',
        duracao: 45,
        uf: 'MG',
        ano: 2026,
        classificacao: '12 anos',
        direcao: 'Affonso Uchôa',
        sinopse:
          'Kelly, jovem professora de Português, começa a dar aulas em uma escola pública. Durante uma aula, ela discute com Nicolas, aluno do segundo ano, e os dois têm de resolver o conflito diante do diretor. A discussão traz ensinamentos: Kelly aprende que, na periferia do Brasil, a exceção é a regra.',
        imagem: '/mostra2026/filmes/disciplina.jpg',
      },
      {
        id: 'a-voz-das-rochas',
        titulo: 'A Voz das Rochas',
        duracao: 15,
        uf: 'RN',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Evelyn Freitas',
        sinopse:
          'No sertão potiguar, entre fendas, cavernas e pinturas rupestres milenares, ecoa a história de Dodora Maia, que dedicou sua vida à defesa e preservação do Lajedo de Soledade, importante sítio arqueológico do Rio Grande do Norte.',
        imagem: '/mostra2026/filmes/a-voz-das-rochas.jpg',
      },
    ],
    longas: [
      {
        id: 'almeidinha-e-o-sertao-gelado',
        titulo: 'Almeidinha & O Sertão Gelado',
        duracao: 83,
        uf: 'RN',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Gustavo Guedes',
        codirecao: 'Julio Castro',
        sinopse:
          'Almeidinha vive na pacata Seridozinho, a cidade mais quente do país, e trabalha no frigorífico municipal. Sonhador e visionário, é fascinado pelo frio e tem um grande desejo: conhecer a neve! Influenciador digital, faz vídeos sobre o clima. Mas tudo pode mudar com um bilhete premiado e um patrão corrupto.',
        imagem: '/mostra2026/filmes/almeidinha-e-o-sertao-gelado.jpg',
      },
    ],
  },
  {
    data: '2026-11-22',
    diaSemana: 'Domingo',
    curtas: [
      {
        id: 'mariposa',
        titulo: 'Mariposa',
        duracao: 14,
        uf: 'RN',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Alexandre Américo e Pedro Vitor',
        sinopse:
          'Nas dunas de Santa Rita, onde o vento desenha o tempo, Dona Zefa e Oliveira habitam um território em que memória, rito e paisagem se confundem. Entre o silêncio e o barro, suas existências se tensionam em uma batalha a ferro e fogo, movidas pelo desejo de permanência.',
        imagem: '/mostra2026/filmes/mariposa.jpg',
      },
    ],
    longas: [
      {
        id: 'olhe-para-mim',
        titulo: 'Olhe Para Mim',
        duracao: 88,
        uf: 'AL',
        ano: 2026,
        classificacao: '14 anos',
        direcao: 'Rafhael Barbosa',
        sinopse:
          'Marcelo embarca numa viagem com uma feiticeira e seu misterioso filho. Em meio a monstros e aberrações, ele finalmente se sente em casa.',
        imagem: '/mostra2026/filmes/olhe-para-mim.jpg',
      },
    ],
  },
  {
    data: '2026-11-23',
    diaSemana: 'Segunda',
    curtas: [
      {
        id: 'madorna',
        titulo: 'Madorna',
        duracao: 16,
        uf: 'MG',
        ano: 2026,
        classificacao: '14 anos',
        direcao: 'Higor Gomes',
        sinopse:
          'Com a fatura do cartão de crédito prestes a vencer, dois irmãos cruzam a cidade tentando vender colchões magnéticos fornecidos com um assistente virtual. Thaís não crê no sonho de fazer marketing multinível, mas Jeison passa a questionar o negócio e a própria relação dos dois.',
        imagem: '/mostra2026/filmes/madorna.jpg',
      },
    ],
    longas: [
      {
        id: 'adeus-verao',
        titulo: 'Adeus, Verão!',
        duracao: 92,
        uf: 'ES',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Diego de Jesus',
        sinopse:
          'Espírito Santo, verão de 2017. Kenia, uma das líderes da Primavera Secundarista, resolve destruir o país depois de frustrações pessoais e políticas. Para isso, ela tem um plano sonoro que conta com a ajuda de Yuri, um youtuber decadente que se tornará seu namorado.',
        imagem: '/mostra2026/filmes/adeus-verao.jpg',
      },
      {
        id: 'fiz-um-foguete-imaginando-que-voce-vinha',
        titulo: 'Fiz um Foguete Imaginando que Você Vinha',
        duracao: 92,
        uf: 'CE',
        ano: 2026,
        classificacao: '16 anos',
        direcao: 'Janaína Marques',
        sinopse:
          'No zumbido hipnótico de uma ressonância magnética, Rosa é orientada a evocar uma lembrança feliz. Nessa odisseia pelo subconsciente, ela reencontra sua mãe, Dalva, e juntas inventam memórias que nunca existiram.',
        imagem: '/mostra2026/filmes/fiz-um-foguete-imaginando-que-voce-vinha.jpg',
      },
    ],
  },
];

// Uma sessão de votação por dia e categoria. id: "21-nov-curtas", "21-nov-longas"...
export const SESSOES = DIAS.flatMap(({ data, diaSemana, ...categorias }) => {
  const [, mes, dia] = data.split('-');
  return Object.keys(CATEGORIAS).map((categoria) => ({
    id: `${Number(dia)}-${MESES[Number(mes) - 1].toLowerCase()}-${categoria}`,
    data,
    diaSemana,
    categoria,
    filmes: categorias[categoria],
  }));
});

export function buscarSessao(id) {
  return SESSOES.find((sessao) => sessao.id === id) ?? null;
}

// "21 NOV." e "Sábado"
export function dataCurta(sessao) {
  const [, mes, dia] = sessao.data.split('-');
  return { diaMes: `${Number(dia)} ${MESES[Number(mes) - 1]}.`, diaSemana: sessao.diaSemana };
}

// "10 min, CE, 2026, Livre"
export function infoFilme(filme) {
  return `${filme.duracao} min, ${filme.uf}, ${filme.ano}, ${filme.classificacao}`;
}

// "Curtas · 21 NOV. Sábado" (painel e mensagens)
export function nomeSessao(sessao) {
  const { diaMes, diaSemana } = dataCurta(sessao);
  return `${CATEGORIAS[sessao.categoria].nome} · ${diaMes} ${diaSemana}`;
}
