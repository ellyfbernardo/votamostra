import { buscarSessao } from '../../dados/mostra';
import { cpfValido, texto, listaDeTextos, objetoSimples } from '../../lib/validacao';
import { salvarPesquisa } from '../../lib/armazenamento';

// Monta o formulário só com os campos da pesquisa de satisfação.
function limparFormulario(form) {
  return {
    nome: texto(form.nome, 120),
    faixa: texto(form.faixa, 10),
    pais: texto(form.pais, 100),
    estado: texto(form.estado, 100),
    cidade: texto(form.cidade, 100),
    primeiraVez: texto(form.primeiraVez, 10),
    motivo: texto(form.motivo, 200),
    soube: listaDeTextos(form.soube),
    estrutura: texto(form.estrutura, 1),
    organizacao: texto(form.organizacao, 1),
    programacao: texto(form.programacao, 1),
    acessibilidade: texto(form.acessibilidade, 1),
    recomendacao: texto(form.recomendacao, 10),
    comentario: texto(form.comentario, 2000),
  };
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response('Requisição inválida', { status: 400 });
  }

  const { cpf, sessao: sessaoId, form } = data ?? {};

  if (!cpfValido(cpf) || !buscarSessao(sessaoId) || !objetoSimples(form)) {
    return new Response('CPF, sessão e formulário são obrigatórios', { status: 400 });
  }

  const formulario = limparFormulario(form);
  if (!formulario.nome) {
    return new Response('Nome é obrigatório', { status: 400 });
  }

  try {
    // Só preenche se a pesquisa desse voto ainda estiver vazia,
    // assim ninguém sobrescreve uma resposta já enviada.
    const resultado = await salvarPesquisa(cpf, sessaoId, formulario);

    if (resultado === 'ja-respondida') {
      return new Response('Pesquisa já respondida', { status: 409 });
    }
    if (resultado === 'sem-voto') {
      return new Response('Voto não encontrado', { status: 404 });
    }
    return new Response('Pesquisa enviada com sucesso!', { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar a pesquisa:', error);
    return new Response('Erro interno no servidor', { status: 500 });
  }
}
