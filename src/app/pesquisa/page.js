"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import countries from "@/app/public/countries+states+cities.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./pesquisa.module.css";

export default function PesquisaMostra() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const country = countries.find((c) => c.name === selectedCountry);
  const states = country?.states || [];
  const state = states.find((s) => s.name === selectedState);
  const cities = state?.cities || [];

const [form, setForm] = useState({
  nome: "",
  faixaEtaria: "",
  pais: "",
  estado: "",
  cidade: "",
  hospedagem: "",
  hospedagemOutro: "",
  soube: [],
  soubeOutro: "",
  primeiraVez: "",
  salaFrequentada: "",
  avaliacaoSalaPrincipal: "",
  avaliacaoSalaPetrobras: "",
  comentarioNota: "",
  pontoMaisDestaca: "",
  pontoMaisDestacaOutro: "", // ✅ ADICIONAR
  pontoMenosDestaca: "",
  pontoMenosDestacaOutro: "", // ✅ ADICIONAR
  melhoria: "",
  melhoriaOutro: "", // ✅ ADICIONAR
  motivoVoltar: "", // ✅ ADICIONAR (substitui 'voltar')
  recomendacao: "",
  sugestao: "",
});

  useEffect(() => {
    setForm((f) => ({
      ...f,
      pais: selectedCountry,
      estado: selectedState,
      cidade: selectedCity,
    }));
  }, [selectedCountry, selectedState, selectedCity]);

  function handleChange(e) {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "soube") {
      setForm((prev) => {
        const exists = prev.soube.includes(value);
        const next = exists
          ? prev.soube.filter((s) => s !== value)
          : [...prev.soube, value];
        return { ...prev, soube: next };
      });
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

function validateStep(s) {
  if (s === 1) {
    return (
      form.nome.trim() !== "" &&
      form.faixaEtaria !== "" &&
      selectedCountry !== "" &&
      selectedState !== "" &&
      selectedCity !== ""
    );
  }
  
  if (s === 2) {
    if (!form.hospedagem) return false;
    if (form.hospedagem === "outro" && !form.hospedagemOutro.trim()) {
      return false;
    }
    if (form.soube.length === 0) return false;
    if (form.soube.includes("outros") && !form.soubeOutro.trim()) {
      return false;
    }
    return form.primeiraVez !== "";
  }
  
  if (s === 3) {
    // Validações obrigatórias
    if (!form.salaFrequentada) return false;
    if (!form.avaliacaoSalaPrincipal) return false;
    if (!form.avaliacaoSalaPetrobras) return false;
    
    // Valida pontoMaisDestaca
    if (!form.pontoMaisDestaca) return false;
    if (form.pontoMaisDestaca === "outro" && !form.pontoMaisDestacaOutro?.trim()) {
      return false;
    }
    
    // Valida pontoMenosDestaca
    if (!form.pontoMenosDestaca) return false;
    if (form.pontoMenosDestaca === "outro" && !form.pontoMenosDestacaOutro?.trim()) {
      return false;
    }
    
    // Valida melhoria
    if (!form.melhoria) return false;
    if (form.melhoria === "outro" && !form.melhoriaOutro?.trim()) {
      return false;
    }
    
    // Valida recomendação (obrigatório)
    if (!form.recomendacao) return false;
    
    // ✅ Todos os campos obrigatórios validados
    return true;
  }
  
  return false;
}
async function enviarPesquisa() {
  // 🔍 DEBUG - remova depois
  console.log("Form completo:", form);
  console.log("Validação Step 3:", validateStep(3));
  
  if (!validateStep(3)) {
    // Verifica cada campo individualmente
    console.log("salaFrequentada:", form.salaFrequentada);
    console.log("avaliacaoSalaPrincipal:", form.avaliacaoSalaPrincipal);
    console.log("avaliacaoSalaPetrobras:", form.avaliacaoSalaPetrobras);
    console.log("pontoMaisDestaca:", form.pontoMaisDestaca);
    console.log("pontoMenosDestaca:", form.pontoMenosDestaca);
    console.log("melhoria:", form.melhoria);
    console.log("recomendacao:", form.recomendacao);
    
    toast.error("Preencha todos os campos obrigatórios antes de enviar.");
    return;
  }
  
  setLoading(true);
  // ... resto do código
}

  async function enviarPesquisa() {
    if (!validateStep(3)) {
      toast.error("Preencha todos os campos obrigatórios antes de enviar.");
      return;
    }

    setLoading(true);
    const cpf = localStorage.getItem("cpf");

    const payload = {
      cpf: cpf || null,
      form,
      sentAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/pesquisa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao enviar");

      toast.success("Pesquisa enviada com sucesso!");
      setForm((f) => ({ ...f, nome: "" }));
      setForm({
  nome: "",
  faixaEtaria: "",
  pais: "",
  estado: "",
  cidade: "",
  hospedagem: "",
  hospedagemOutro: "",
  soube: [],
  soubeOutro: "",
  primeiraVez: "",
  salaFrequentada: "",
  avaliacaoSalaPrincipal: "",
  avaliacaoSalaPetrobras: "",
  comentarioNota: "",
  pontoMaisDestaca: "",
  pontoMaisDestacaOutro: "",
  pontoMenosDestaca: "",
  pontoMenosDestacaOutro: "",
  melhoria: "",
  melhoriaOutro: "",
  motivoVoltar: "",
  recomendacao: "",
  sugestao: "",
});

// Reset dos selects de localização
setSelectedCountry("");
setSelectedState("");
setSelectedCity("");
      setStep(1);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar a pesquisa. Tente novamente.");
    }

    setLoading(false);
  }

  function next() {
    if (!validateStep(step)) {
      toast.warn("Preencha corretamente os campos desta etapa para continuar.");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  }

  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  const progress = (step / 3) * 100;

  return (
    <div className={style.container}>
      <ToastContainer position="top-center" />

      <header className={style.header}>
        <h1 className={style.title}>Pesquisa — 12ª Mostra de Cinema de Gostoso</h1>
        <p className={style.subtitle}>Sua opinião importa. Leva menos de 1 minuto.</p>

        <div className={style.progressBar}>
          <div
            className={style.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <motion.form
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) next();
          else enviarPesquisa();
        }}
        className={style.form}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <section className={style.step}>
            <h2 className={style.stepTitle}>Primeiro, queremos te conhecer</h2>

            <label className={style.label}>
              <span className={style.labelText}>1. Nome e sobrenome: *</span>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className={style.input}
                required
              />
            </label>

            <div className={style.group}>
              <label>
                <input
                  type="radio"
                  name="faixaEtaria"
                  value="-18"
                  checked={form.faixaEtaria === "-18"}
                  onChange={handleChange}
                  required
                /> 
                Menos de 18
              </label>

              <label>
                <input
                  type="radio"
                  name="faixaEtaria"
                  value="18-24"
                  checked={form.faixaEtaria === "18-24"}
                  onChange={handleChange}
                /> 
                18–24
              </label>

              <label>
                <input
                  type="radio"
                  name="faixaEtaria"
                  value="25-34"
                  checked={form.faixaEtaria === "25-34"}
                  onChange={handleChange}
                /> 
                25–34
              </label>

              <label>
                <input
                  type="radio"
                  name="faixaEtaria"
                  value="35-44"
                  checked={form.faixaEtaria === "35-44"}
                  onChange={handleChange}
                /> 
                35–44
              </label>

              <label>
                <input
                  type="radio"
                  name="faixaEtaria"
                  value="45-54"
                  checked={form.faixaEtaria === "45-54"}
                  onChange={handleChange}
                /> 
                45–54
              </label>

              <label>
                <input
                  type="radio"
                  name="faixaEtaria"
                  value="55+"
                  checked={form.faixaEtaria === "55+"}
                  onChange={handleChange}
                /> 
                55+
              </label>
            </div>


            <div className={style.row}>
              <label className={style.label}>
                <span className={style.labelText}>País *</span>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={style.select}
                >
                  <option value="">Selecione</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className={style.label}>
                <span className={style.labelText}>Estado *</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className={style.select}
                  disabled={!selectedCountry}
                >
                  <option value="">Selecione</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className={style.label}>
                <span className={style.labelText}>Cidade *</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={style.select}
                  disabled={!selectedState}
                >
                  <option value="">Selecione</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={style.actions}>
              <button type="button" onClick={next} className={style.buttonNext}>
                Continuar →
              </button>
            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <section className={style.step}>
            <h2 className={style.stepTitle}>
              Agora queremos saber se você veio para a Mostra
            </h2>

<fieldset className={style.fieldset}>
  <legend className={style.legend}>Você se hospedou em Gostoso para: *</legend>

  <div className={style.optionsColumn}>
    {[
      ["mostra", "A Mostra de Cinema de Gostoso"],
      ["turismo", "Turismo em geral"],
      ["trabalho", "Trabalho"],
      ["outro", "Outro"],
    ].map(([v, t]) => (
      <div key={v}>
        <label className={style.option}>
          <input
            type="radio"
            name="hospedagem"
            value={v}
            checked={form.hospedagem === v}
            onChange={handleChange}
          />
          <span>{t}</span>
        </label>

        {v === "outro" && form.hospedagem === "outro" && (
          <input
            type="text"
            name="hospedagemOutro"
            value={form.hospedagemOutro}
            onChange={handleChange}
            className={style.inputSmall}
            placeholder="Especifique"
          />
        )}
      </div>
    ))}
  </div>
</fieldset>

           <fieldset className={style.fieldset}>
  <legend className={style.legend}>Como você ficou sabendo da Mostra? *</legend>

  <div className={style.optionsColumn}>
    {[
      ["instagram", "Instagram da Mostra"],
      ["redes", "Outros perfis em redes sociais"],
      ["indicacao", "Indicação de amigos ou familiares"],
      ["midia", "Mídia tradicional"],
      ["outros", "Outros"],
    ].map(([v, t]) => (
      <div key={v} className={style.optionWrapper}>
        <label className={style.option}>
          <input
            type="checkbox"
            name="soube"
            value={v}
            checked={form.soube.includes(v)}
            onChange={handleChange}
          />
          <span>{t}</span>
        </label>

        {v === "outros" && form.soube.includes("outros") && (
          <input
            type="text"
            name="soubeOutro"
            value={form.soubeOutro}
            onChange={handleChange}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className={style.inputSmall}
            placeholder="Especifique"
          />
        )}
      </div>
    ))}
  </div>
</fieldset>
            <fieldset className={style.fieldset}>
              <legend className={style.legend}>É sua primeira vez na Mostra? *</legend>

              <div className={style.optionsRow}>
                <label className={style.option}>
                  <input
                    type="radio"
                    name="primeiraVez"
                    value="sim"
                    checked={form.primeiraVez === "sim"}
                    onChange={handleChange}
                  />
                  Sim
                </label>

                <label className={style.option}>
                  <input
                    type="radio"
                    name="primeiraVez"
                    value="nao"
                    checked={form.primeiraVez === "nao"}
                    onChange={handleChange}
                  />
                  Não
                </label>
              </div>
            </fieldset>

            <div className={style.actions}>
              <button type="button" onClick={prev} className={style.buttonBack}>
                ← Voltar
              </button>

              <button type="button" onClick={next} className={style.buttonNext}>
                Continuar →
              </button>
            </div>
          </section>
        )}

{/* STEP 3 */}
{step === 3 && (
  <section className={style.step}>
    <h2 className={style.stepTitle}>Agora nos conte como foi sua experiência</h2>

    {/* Qual sala frequentou */}
    <fieldset className={style.fieldset}>
      <legend className={style.legend}>
        Qual sala você frequentou durante a Mostra? *
      </legend>

      <div className={style.optionsRow}>
        <label className={style.option}>
          <input
            type="radio"
            name="salaFrequentada"
            value="aoArLivre"
            checked={form.salaFrequentada === "aoArLivre"}
            onChange={handleChange}
          />
          Sala ao ar livre
        </label>

        <label className={style.option}>
          <input
            type="radio"
            name="salaFrequentada"
            value="petrobras"
            checked={form.salaFrequentada === "petrobras"}
            onChange={handleChange}
          />
          Sala Petrobras
        </label>

        <label className={style.option}>
          <input
            type="radio"
            name="salaFrequentada"
            value="ambas"
            checked={form.salaFrequentada === "ambas"}
            onChange={handleChange}
          />
          Sala ao ar livre e Sala Petrobras
        </label>
      </div>
    </fieldset>

    {/* Notas das salas - aparecem condicionalmente */}
    {form.salaFrequentada && (
      <div className={style.row}>
        <legend className={style.legend}>
          Com base na sua resposta anterior, como você avalia a experiência geral na sala?
        </legend>

        {/* Sala ao ar livre - mostra se escolheu "aoArLivre" ou "ambas" */}
        {(form.salaFrequentada === "aoArLivre" || form.salaFrequentada === "ambas") && (
          <label className={style.label}>
            <span className={style.labelText}>Sala ao ar livre — Nota (1–5) *</span>
            <select
              name="avaliacaoSalaPrincipal"
              value={form.avaliacaoSalaPrincipal}
              onChange={handleChange}
              className={style.select}
            >
              <option value="">Nota</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        )}

        {/* Sala Petrobras - mostra se escolheu "petrobras" ou "ambas" */}
        {(form.salaFrequentada === "petrobras" || form.salaFrequentada === "ambas") && (
          <label className={style.label}>
            <span className={style.labelText}>Sala Petrobras — Nota (1–5) *</span>
            <select
              name="avaliacaoSalaPetrobras"
              value={form.avaliacaoSalaPetrobras}
              onChange={handleChange}
              className={style.select}
            >
              <option value="">Nota</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        )}
      </div>
    )}

    {/* Comentário sobre a nota */}
    <label className={style.label}>
      <span className={style.labelText}>Algum comentário sobre a nota? (opcional)</span>
      <textarea
        name="comentarioNota"
        value={form.comentarioNota}
        onChange={handleChange}
        className={style.textarea}
        placeholder="Escreva um breve comentário..."
      />
    </label>

{/* O que mais se destacou */}
<fieldset className={style.fieldset}>
  <legend className={style.legend}>Qual ponto mais se destaca na Mostra de Cinema de Gostoso? *</legend>

  <div className={style.optionsColumn}>
    {[
      ["programacao", "Curadoria (Programação dos filmes, debates e seminários)"],
      ["estrutura", "Estrutura (Sala, projeção, som, praça de alimentação, banheiros)"],
      ["organizacao", "Equipe (Orientação, retirada de dúvidas, cordialidade, organização)"],
      ["sistema", "⁠Sistema de votação (Online ou cartão entregue no fim da sessão)"],
  
    ].map(([v, t]) => (
      <label key={v} className={style.option}>
        <input
          type="radio"
          name="pontoMaisDestaca"
          value={v}
          checked={form.pontoMaisDestaca === v}
          onChange={handleChange}
        />
        <span>{t}</span>

        {v === "outro" && form.pontoMaisDestaca === "outro" && (
          <input
            type="text"
            name="pontoMaisDestacaOutro"
            value={form.pontoMaisDestacaOutro || ""}
            onChange={handleChange}
            className={style.inputSmall}
            placeholder="Especifique"
          />
        )}
      </label>
    ))}
  </div>
</fieldset>

{/* O que menos se destacou */}
<fieldset className={style.fieldset}>
  <legend className={style.legend}>Qual ponto menos se destaca na Mostra de Cinema de Gostoso? *</legend>

  <div className={style.optionsColumn}>
    {[
      ["programacao", "Curadoria (Programação dos filmes, debates e seminários)"],
      ["estrutura", "Estrutura (Sala, projeção, som, praça de alimentação, banheiros)"],
      ["organizacao", "Equipe (Orientação, retirada de dúvidas, cordialidade, organização)"],
      ["sistema", "Sistema de votação (Online ou cartão entregue no fim da sessão)"],
    ].map(([v, t]) => (
      <label key={v} className={style.option}>
        <input
          type="radio"
          name="pontoMenosDestaca"
          value={v}
          checked={form.pontoMenosDestaca === v}
          onChange={handleChange}
        />
        <span>{t}</span>

        {v === "outro" && form.pontoMenosDestaca === "outro" && (
          <input
            type="text"
            name="pontoMenosDestacaOutro"
            value={form.pontoMenosDestacaOutro || ""}
            onChange={handleChange}
            className={style.inputSmall}
            placeholder="Especifique"
          />
        )}
      </label>
    ))}
  </div>
</fieldset>

{/* O que pode melhorar */}
<fieldset className={style.fieldset}>
  <legend className={style.legend}>Se você pudesse escolher uma próxima melhoria, qual seria? *</legend>

  <div className={style.optionsColumn}>
    {[
      ["estrutura", "⁠Ampliar sala principal (Cadeiras, entrada, estrutura da fila)"],
      ["programacao", "Programação (Mais sessões)"],
      ["organizacao", "Aumentar equipe (Suporte, dúvidas, auxílio)"],
    ].map(([v, t]) => (
      <label key={v} className={style.option}>
        <input
          type="radio"
          name="melhoria"
          value={v}
          checked={form.melhoria === v}
          onChange={handleChange}
        />
        <span>{t}</span>

        {v === "outro" && form.melhoria === "outro" && (
          <input
            type="text"
            name="melhoriaOutro"
            value={form.melhoriaOutro || ""}
            onChange={handleChange}
            className={style.inputSmall}
            placeholder="Especifique"
          />
        )}
      </label>
    ))}
  </div>
</fieldset>


    {/* O que te faz querer voltar */}
    <label className={style.label}>
      <span className={style.labelText}>O que te faz querer voltar na Mostra?</span>
      <textarea
        name="motivoVoltar"
        value={form.motivoVoltar}
        onChange={handleChange}
        className={style.textarea}
        placeholder="Conte pra gente..."
      />
    </label>

    {/* Recomendaria (1–5) */}
    <label className={style.label}>
      <span className={style.labelText}>Você recomenda a Mostra de Cinema de Gostoso? Nota de 1 a 5 *</span>
      <select
        name="recomendacao"
        value={form.recomendacao}
        onChange={handleChange}
        className={style.select}
      >
        <option value="">Selecione</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </label>

    {/* Sugestão final */}
    <label className={style.label}>
      <span className={style.labelText}>Alguma sugestão ou elogio para a próxima Mostra?</span>
      <textarea
        name="sugestao"
        value={form.sugestao}
        onChange={handleChange}
        className={style.textarea}
        placeholder="Deixe sua mensagem :)"
      />
    </label>

            <div className={style.actions}>
              <button type="button" onClick={prev} className={style.buttonBack}>
                ← Voltar
              </button>

              <button
                type="submit"
                disabled={loading}
                className={style.buttonSubmit}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </section>
        )}
      </motion.form>
    </div>
  );
}
