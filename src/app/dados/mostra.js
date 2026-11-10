// Programação da Mostra Competitiva da 13ª Mostra de Cinema de Gostoso (2026).
// Cada sessão tem a sua própria votação: o público vota nos filmes que acabou de ver.
//
// votacaoAbre: horário (de Brasília) em que a votação da sessão abre. Foi estimado
// somando a duração dos filmes ao horário de início — ajuste se a sessão atrasar.
// A votação fica aberta por HORAS_DE_VOTACAO a partir daí.
//
// imagem: still do filme. Coloque o arquivo em /public/mostra2026/filmes/ e
// preencha com o caminho, ex.: '/mostra2026/filmes/lagoa-do-abandono.jpg'.

export const HORAS_DE_VOTACAO = 3;

export const SESSOES = [
  {
    id: 'sessao-1',
    data: '2026-11-21',
    diaSemana: 'Sábado',
    horario: '20h',
    votacaoAbre: '2026-11-21T21:40:00-03:00',
    filmes: [
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
        imagem: null,
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
        imagem: null,
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
        imagem: null,
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
        imagem: null,
      },
    ],
  },
  {
    id: 'sessao-2',
    data: '2026-11-21',
    diaSemana: 'Sábado',
    horario: '22h12',
    votacaoAbre: '2026-11-21T23:50:00-03:00',
    filmes: [
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
        imagem: null,
      },
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
        imagem: null,
      },
    ],
  },
  {
    id: 'sessao-3',
    data: '2026-11-22',
    diaSemana: 'Domingo',
    horario: '20h',
    votacaoAbre: '2026-11-22T21:45:00-03:00',
    filmes: [
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
        imagem: null,
      },
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
        imagem: null,
      },
    ],
  },
  {
    id: 'sessao-4',
    data: '2026-11-23',
    diaSemana: 'Segunda',
    horario: '20h',
    votacaoAbre: '2026-11-23T21:50:00-03:00',
    filmes: [
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
        imagem: null,
      },
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
        imagem: null,
      },
    ],
  },
  {
    id: 'sessao-5',
    data: '2026-11-23',
    diaSemana: 'Segunda',
    horario: '22h23',
    votacaoAbre: '2026-11-23T23:55:00-03:00',
    filmes: [
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
        imagem: null,
      },
    ],
  },
];

export function buscarSessao(id) {
  return SESSOES.find((sessao) => sessao.id === id) ?? null;
}

// Só funciona no servidor. Para testar fora do horário, defina no .env:
// VOTACAO_FORCAR_SESSAO=sessao-1
export function votacaoAberta(sessao, agora = new Date()) {
  if (!sessao) return false;
  if (process.env.VOTACAO_FORCAR_SESSAO === sessao.id) return true;

  const abre = new Date(sessao.votacaoAbre).getTime();
  const fecha = abre + HORAS_DE_VOTACAO * 60 * 60 * 1000;
  const t = agora.getTime();
  return t >= abre && t < fecha;
}

// Sessão cuja votação está aberta agora (a mais recente, se houver mais de uma).
export function sessaoEmVotacao(agora = new Date()) {
  const abertas = SESSOES.filter((sessao) => votacaoAberta(sessao, agora));
  return abertas.at(-1) ?? null;
}

// "21.11" e "Sábado"
export function dataCurta(sessao) {
  const [, mes, dia] = sessao.data.split('-');
  return { diaMes: `${dia}.${mes}`, diaSemana: sessao.diaSemana };
}

// "10 min., CE, 2026, Livre"
export function infoFilme(filme) {
  return `${filme.duracao} min., ${filme.uf}, ${filme.ano}, ${filme.classificacao}`;
}
