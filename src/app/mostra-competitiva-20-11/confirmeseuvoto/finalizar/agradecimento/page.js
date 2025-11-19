"use client";

import { useState } from "react";
import style from "./agradecimento.module.css";
import Image from "next/image";
import logo from "../../../../assets/mostra2025/12MCG_Logo.svg";
import manganga from "../../../../assets/mostra2025/BICHAO 2 1.png";
import sol from "../../../../assets/mostra2025/SOL.png";
import Link from "next/link";

export default function Agradecimento() {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");






  // Função para enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const form = e.target;

    // Coleta dos campos do formulário
    const formData = {
      nome: form.nome.value,
      faixa: form.faixa.value,
      estado: form.estado.value,
      cidade: form.cidade.value,
      pais: form.pais.value,
      primeiraVez: form.primeiraVez.value,
      motivo: form.motivo.value === "outro" ? form.motivoOutro.value : form.motivo.value,

      soube: Array.from(form.querySelectorAll("input[name='soube']:checked")).map(
        (c) => (c.value === "outros" ? form.soubeOutro.value : c.value)
      ),

      estrutura: form.estrutura.value,
      organizacao: form.organizacao.value,
      programacao: form.programacao.value,
      acessibilidade: form.acessibilidade.value,
      recomendacao: form.recomendacao.value,

      comentario: form.comentario.value,
    };

    // Recupera CPF salvo no localStorage
    const cpf = localStorage.getItem("cpf");

    if (!cpf) {
      alert("CPF não encontrado. Refaça a votação.");
      setLoading(false);
      return;
    }

    try {
      // Payload final enviado ao MongoDB


      const response = await fetch("/api/updateForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
          body: JSON.stringify({
          form: formData,
          cpf: cpf
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setSuccessMessage("Obrigado! Sua pesquisa foi enviada.");
        
        // Limpa o localStorage se quiser
        localStorage.removeItem("cpf");
        localStorage.removeItem("filme1");
        localStorage.removeItem("filme2");
       

        setTimeout(() => setOpenPopup(false), 1500);
      } else {
        alert(data.message || "Erro ao enviar.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao enviar.");
    }

    setLoading(false);
  };

  return (
    <>
    <main className={style.container}>
      <Image src={logo} alt="" className={style.logo} />

      <div className={style.text}>
        <h1 className={style.title}>SUA VOTAÇÃO FOI</h1>
        <h2 className={style.subtitle}>CONFIRMADA!</h2>
      </div>



      {/* POP-UP */}
      {openPopup && (
        <div className={style.popupOverlay}>
          <div className={style.popupCard}>
            <button className={style.closePopup} onClick={() => setOpenPopup(false)}>
              ✕
            </button>

            <form className={style.formulario} onSubmit={handleSubmit}>
              <h3 className={style.formTitle}>Pesquisa Rápida</h3>

              <label>Nome Completo:<input type="text" name="nome" required /></label>

              <div className={style.group}>
                <p>Faixa etária:</p>
                <label><input type="radio" name="faixa" value="-18" /> Menos de 18</label>
                <label><input type="radio" name="faixa" value="18-24" /> 18–24</label>
                <label><input type="radio" name="faixa" value="25-34" /> 25–34</label>
                <label><input type="radio" name="faixa" value="35-44" /> 35–44</label>
                <label><input type="radio" name="faixa" value="45-54" /> 45–54</label>
                <label><input type="radio" name="faixa" value="55+" /> 55+</label>
              </div>

              <label>Estado:<input type="text" name="estado" /></label>
              <label>Cidade:<input type="text" name="cidade" /></label>
              <label>País de origem:<input type="text" name="pais" /></label>

              <div className={style.group}>
                <p>É sua primeira vez em São Miguel do Gostoso?</p>
                <label><input type="radio" name="primeiraVez" value="sim" /> Sim</label>
                <label><input type="radio" name="primeiraVez" value="nao" /> Não</label>
              </div>

              <div className={style.group}>
                <p>Você está hospedado(a) para:</p>
                <label><input type="radio" name="motivo" value="mostra" /> A Mostra</label>
                <label><input type="radio" name="motivo" value="turismo" /> Turismo</label>
                <label><input type="radio" name="motivo" value="trabalho" /> Trabalho</label>
                <label>
                  <input type="radio" name="motivo" value="outro" /> Outro:
                  <input type="text" name="motivoOutro" className={style.outroInput} />
                </label>
              </div>

              <div className={style.group}>
                <p>Como ficou sabendo?</p>
                <label><input type="checkbox" name="soube" value="redes" /> Redes sociais</label>
                <label><input type="checkbox" name="soube" value="ads" /> Publicidade online</label>
                <label><input type="checkbox" name="soube" value="sites" /> Sites especializados</label>
                <label><input type="checkbox" name="soube" value="indicacao" /> Indicação</label>
                <label><input type="checkbox" name="soube" value="midia" /> Mídia tradicional</label>
                <label>
                  <input type="checkbox" name="soube" value="outros" /> Outros:
                  <input type="text" name="soubeOutro" className={style.outroInput} />
                </label>
              </div>

              <div className={style.group}>
                <p>Avalie (1 a 5):</p>
                <label>Estrutura:<input type="number" min="1" max="5" name="estrutura" /></label>
                <label>Organização:<input type="number" min="1" max="5" name="organizacao" /></label>
                <label>Programação:<input type="number" min="1" max="5" name="programacao" /></label>
                <label>Acessibilidade:<input type="number" min="1" max="5" name="acessibilidade" /></label>
                <label>Recomendaria:<input type="number" min="1" max="5" name="recomendacao" /></label>
              </div>

              <label>Comentário:<textarea name="comentario" rows="4"></textarea></label>

              <button type="submit" className={style.submitBtn} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>

              {successMessage && <p className={style.successMsg}>{successMessage}</p>}
            </form>
          </div>
        </div>
      )}

      <Link href="/" className={style.button}>INÍCIO</Link>
      <Image src={manganga} alt="" className={style.manganga} />


    </main>
      <footer className={style.footer}>
        <h2 className={style.sorteio}>QUER CONCORRER A UM KIT DE PRODUTOS DA MOSTRA? BASTA RESPONDER A UMA RÁPIDA PESQUISA</h2>

        <p className={style.paragrafo}>RESPONDA UMA RÁPIDA </p>
        <p className={style.paragrafo}>PESQUISA E CONCORRRA </p>

          {/* BOTÃO QUE ABRE O POPUP  */}
        <button className={style.buttonForm} onClick={() => setOpenPopup(true)}>
          RESPONDER
        </button> 
        <Image src={sol} alt="" className={style.sol} />

        <ul className={style.lista}>
          <li>- 1 camiseta</li>
          <li>- 1 boné</li>
          <li>- 1 caneca</li>
          <li>- 1 bolsa</li>
          <li>- 1 cartaz</li>
        </ul>
      </footer>
</>
  );
}
