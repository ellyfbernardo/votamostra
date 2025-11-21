"use client";

import { useState, useEffect } from "react";
import style from "./agradecimento.module.css";
import Image from "next/image";
import logo from "../../../../assets/mostra2025/12MCG_Logo.svg";
import manganga from "../../../../assets/mostra2025/BICHAO 2 1.png";
import sol from "../../../../assets/mostra2025/SOL.png";
import Link from "next/link";
import countries from "@/app/public/countries+states+cities.json"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Agradecimento() {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
 

    const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // País selecionado
  const country = countries.find((c) => c.name == selectedCountry);

  // Estados do país selecionado
  const states = country?.states || [];

  // Estado selecionado
  const state = states.find((s) => s.name == selectedState);

  // Cidades do estado selecionado
  const cities = state?.cities || [];




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
        toast.success("Pesquisa enviada com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        });
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
          toast.error("Ocorreu um erro ao enviar a pesquisa.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
    });
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
  <h3 className={style.formTitle}>Pesquisa de Público</h3>
  <h3 className={style.formTitle}>12ª Mostra de Cinema de Gostoso</h3>

  <label>
    <p className={style.fontlabel}>Nome Completo:<span className={style.asteristico}>*</span></p>
    <input type="text" name="nome" required />
  </label>

  <label>
    <p className={style.fontlabel}>Telefone:<span className={style.asteristico}>*</span></p>
    <input type="text" name="telefone" required />
  </label>

  <div className={style.group}>
    <p>Faixa etária:<span className={style.asteristico}>*</span></p>
    <label><input type="radio" name="faixa" value="-18" required /> Menos de 18</label>
    <label><input type="radio" name="faixa" value="18-24" /> 18–24</label>
    <label><input type="radio" name="faixa" value="25-34" /> 25–34</label>
    <label><input type="radio" name="faixa" value="35-44" /> 35–44</label>
    <label><input type="radio" name="faixa" value="45-54" /> 45–54</label>
    <label><input type="radio" name="faixa" value="55+" /> 55+</label>
  </div>

  <label>
    <p className={style.fontlabel}>País de origem:<span className={style.asteristico}>*</span></p>
    <select
      name="pais"
      value={selectedCountry}
      onChange={(e) => {
        setSelectedCountry(e.target.value);
        setSelectedState("");
        setSelectedCity("");
      }}
      required
    >
      <option value="">Selecione um país</option>
      {countries.map((c) => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  </label>

  <label>
    <p className={style.fontlabel}>Estado:<span className={style.asteristico}>*</span></p>
    <select
      name="estado"
      value={selectedState}
      onChange={(e) => {
        setSelectedState(e.target.value);
        setSelectedCity("");
      }}
      disabled={!selectedCountry}
      required
    >
      <option value="">Selecione um estado</option>
      {states.map((s) => (
        <option key={s.id} value={s.name}>
          {s.name}
        </option>
      ))}
    </select>
  </label>

  <label>
    <p className={style.fontlabel}>Cidade:<span className={style.asteristico}>*</span></p>
    <select
      name="cidade"
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      disabled={!selectedState}
      required
    >
      <option value="">Selecione uma cidade</option>
      {cities.map((city) => (
        <option key={city.id} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  </label>

  <div className={style.group}>
    <p>É sua primeira vez em São Miguel do Gostoso?<span className={style.asteristico}>*</span></p>
    <label><input type="radio" name="primeiraVez" value="sim" required /> Sim</label>
    <label><input type="radio" name="primeiraVez" value="nao" /> Não</label>
  </div>

  <div className={style.group}>
    <p>Você está hospedado(a) para:<span className={style.asteristico}>*</span></p>
    <label><input type="radio" name="motivo" value="mostra" required /> A Mostra</label>
    <label><input type="radio" name="motivo" value="turismo" /> Turismo</label>
    <label><input type="radio" name="motivo" value="trabalho" /> Trabalho</label>
    <label>
      <input type="radio" name="motivo" value="outro" /> Outro:
      <input type="text" name="motivoOutro" className={style.outroInput} />
    </label>
  </div>

  <div className={style.group}>
    <p>Como ficou sabendo?<span className={style.asteristico}>*</span></p>
    <label><input type="checkbox" name="soube" value="redes" /> Redes sociais</label>
    <label><input type="checkbox" name="soube" value="ads" /> Publicidade online</label>
    <label><input type="checkbox" name="soube" value="sites" /> Sites especializados</label>
    <label><input type="checkbox" name="soube" value="indicacao" /> Indicação</label>
    <label><input type="checkbox" name="soube" value="midia" /> Mídia tradicional</label>
    <label>
      <input type="checkbox" name="soube" value="outros" /> Outros:
      <input type="text" name="soubeOutro" className={style.outroInput} />
    </label>
    {/* OBS: checkbox não pode ser required individualmente — se quiser obrigar pelo menos 1, posso te passar JS para validar */}
  </div>

  <div className={style.group}>
    <p>Avalie (1 a 5):<span className={style.asteristico}>*</span></p>
 <label>
    Estrutura:
    {[1,2,3,4,5].map((n) => (
      <label key={n}>
        <input type="radio" name="estrutura" value={n} required /> {n}
      </label>
    ))}
  </label>

  <label>
    Organização:
    {[1,2,3,4,5].map((n) => (
      <label key={n}>
        <input type="radio" name="organizacao" value={n} required /> {n}
      </label>
    ))}
  </label>

  <label>
    Programação:
    {[1,2,3,4,5].map((n) => (
      <label key={n}>
        <input type="radio" name="programacao" value={n} required /> {n}
      </label>
    ))}
  </label>

  <label>
    Acessibilidade:
    {[1,2,3,4,5].map((n) => (
      <label key={n}>
        <input type="radio" name="acessibilidade" value={n} required /> {n}
      </label>
    ))}
  </label>

<label>
  Recomendaria:
  {["Sim", "Não"].map((opcao) => (
    <label key={opcao}>
      <input
        type="radio"
        name="recomendacao"
        value={opcao}
        required
      />{" "}
      {opcao}
    </label>
  ))}
</label>
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
        <h2 className={style.sorteio}>QUER CONCORRER A UM KIT DE PRODUTOS DA MOSTRA?</h2>



        <ul className={style.lista}>
          <li>1 CAMISETA</li>
          <li>1 BONÉ</li>
          <li>1 CANECA</li>
          <li>1 BOLSA</li>
          <li>1 CARTAZ</li>
        </ul>

          {/* BOTÃO QUE ABRE O POPUP  */}

        <button className={style.buttonForm} onClick={() => setOpenPopup(true)}>
          RESPONDER
        </button> 

        <p className={style.paragrafo}>BASTA RESPONDER A UMA RÁPIDA PESQUISA </p>
        <Image src={sol} alt="" className={style.sol} />
      </footer>
      <ToastContainer />
</>
  );
}
