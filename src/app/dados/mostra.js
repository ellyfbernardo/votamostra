// Programação da Mostra Competitiva da 13ª Mostra de Cinema de Gostoso (2026),
// conforme o documento "13MCG – Programação Mostra Competitiva".
//
// Cada sessão tem a sua própria votação, só com os filmes daquela sessão.
// Quem abre e encerra cada votação é a equipe, pelo painel /admin (não há
// horário automático). Ex.: no sábado, a votação da Sessão 1 abre no intervalo
// e a da Sessão 2 depois que ela terminar.
//
// categoria: 'curtas' ou 'longas' (usada no ranking do painel).
// imagem: still do filme, em /public/mostra2026/filmes/ (1280x720, recortado em 16:9).

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export const CATEGORIAS = {
  curtas: { nome: 'Curtas', singular: 'Curta' },
  longas: { nome: 'Longas', singular: 'Longa' },
};

export const SESSOES = [
  {
    id: '21-nov-sessao-1',
    numero: 1,
    data: '2026-11-21',
    diaSemana: 'Sábado',
    horario: '20h',
    filmes: [
      {
        id: 'lagoa-do-abandono',
        titulo: 'Lagoa do Abandono',
        categoria: 'curtas',
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
        categoria: 'curtas',
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
        categoria: 'curtas',
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
        categoria: 'curtas',
        duracao: 45,
        uf: 'MG',
        ano: 2026,
        classificacao: '12 anos',
        direcao: 'Affonso Uchôa',
        sinopse:
          'Kelly, jovem professora de Português, começa a dar aulas em uma escola pública. Durante uma aula, ela discute com Nicolas, aluno do segundo ano, e os dois têm de resolver o conflito diante do diretor. A discussão traz ensinamentos: Kelly aprende que, na periferia do Brasil, a exceção é a regra.',
        imagem: '/mostra2026/filmes/disciplina.jpg',
      },
    ],
  },
  {
    id: '21-nov-sessao-2',
    numero: 2,
    data: '2026-11-21',
    diaSemana: 'Sábado',
    horario: '22h12',
    filmes: [
      {
        id: 'a-voz-das-rochas',
        titulo: 'A Voz das Rochas',
        categoria: 'curtas',
        duracao: 15,
        uf: 'RN',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Evelyn Freitas',
        sinopse:
          'No sertão potiguar, entre fendas, cavernas e pinturas rupestres milenares, ecoa a história de Dodora Maia, que dedicou sua vida à defesa e preservação do Lajedo de Soledade, importante sítio arqueológico do Rio Grande do Norte.',
        imagem: '/mostra2026/filmes/a-voz-das-rochas.jpg',
      },
      {
        id: 'almeidinha-e-o-sertao-gelado',
        titulo: 'Almeidinha & O Sertão Gelado',
        categoria: 'longas',
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
    id: '22-nov-sessao-3',
    numero: 3,
    data: '2026-11-22',
    diaSemana: 'Domingo',
    horario: '20h',
    filmes: [
      {
        id: 'mariposa',
        titulo: 'Mariposa',
        categoria: 'curtas',
        duracao: 14,
        uf: 'RN',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Alexandre Américo e Pedro Vitor',
        sinopse:
          'Nas dunas de Santa Rita, onde o vento desenha o tempo, Dona Zefa e Oliveira habitam um território em que memória, rito e paisagem se confundem. Entre o silêncio e o barro, suas existências se tensionam em uma batalha a ferro e fogo, movidas pelo desejo de permanência.',
        imagem: '/mostra2026/filmes/mariposa.jpg',
      },
      {
        id: 'olhe-para-mim',
        titulo: 'Olhe Para Mim',
        categoria: 'longas',
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
    id: '23-nov-sessao-4',
    numero: 4,
    data: '2026-11-23',
    diaSemana: 'Segunda',
    horario: '20h',
    filmes: [
      {
        id: 'madorna',
        titulo: 'Madorna',
        categoria: 'curtas',
        duracao: 16,
        uf: 'MG',
        ano: 2026,
        classificacao: '14 anos',
        direcao: 'Higor Gomes',
        sinopse:
          'Com a fatura do cartão de crédito prestes a vencer, dois irmãos cruzam a cidade tentando vender colchões magnéticos fornecidos com um assistente virtual. Thaís não crê no sonho de fazer marketing multinível, mas Jeison passa a questionar o negócio e a própria relação dos dois.',
        imagem: '/mostra2026/filmes/madorna.jpg',
      },
      {
        id: 'adeus-verao',
        titulo: 'Adeus, Verão!',
        categoria: 'longas',
        duracao: 92,
        uf: 'ES',
        ano: 2026,
        classificacao: 'Livre',
        direcao: 'Diego de Jesus',
        sinopse:
          'Espírito Santo, verão de 2017. Kenia, uma das líderes da Primavera Secundarista, resolve destruir o país depois de frustrações pessoais e políticas. Para isso, ela tem um plano sonoro que conta com a ajuda de Yuri, um youtuber decadente que se tornará seu namorado.',
        imagem: '/mostra2026/filmes/adeus-verao.jpg',
      },
    ],
  },
  {
    id: '23-nov-sessao-5',
    numero: 5,
    data: '2026-11-23',
    diaSemana: 'Segunda',
    horario: '22h23',
    filmes: [
      {
        id: 'fiz-um-foguete-imaginando-que-voce-vinha',
        titulo: 'Fiz um Foguete Imaginando que Você Vinha',
        categoria: 'longas',
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

// "Sessão 1 · 21 NOV. Sábado, 20h" (painel)
export function nomeSessao(sessao) {
  const { diaMes, diaSemana } = dataCurta(sessao);
  return `Sessão ${sessao.numero} · ${diaMes} ${diaSemana}, ${sessao.horario}`;
}
