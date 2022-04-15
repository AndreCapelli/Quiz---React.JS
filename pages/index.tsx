import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Questionario from "../components/Questionario";
import QuestaoModel from "../model/questao";

const BASE_URL = "https://quiz-react-js-sigma.vercel.app/api";

export default function Home() {
  const router = useRouter();

  const [idsDasQuestoes, setIDsDasQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);

  async function carregarQuestoesIDs() {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const idsDasQuestoes = await resp.json();

    setIDsDasQuestoes(idsDasQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resp.json();

    const novaQuestao = QuestaoModel.fromObject(json);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    carregarQuestoesIDs();
  }, []);

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0]);
  }, [idsDasQuestoes]);

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida);
    const acertou = questaoRespondida.acertou;
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0));
  }

  function idProximaPergunta() {
    const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1;
    return idsDasQuestoes[proximoIndice];
  }

  function irPraProximoPasso() {
    const proximoID = idProximaPergunta();
    proximoID ? irPraProximaQuestao(proximoID) : finalizar();
  }

  function irPraProximaQuestao(proximoID: number) {
    carregarQuestao(proximoID);
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas,
      },
    });
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irPraProximoPasso={irPraProximoPasso}
    />
  ) : (
    false
  );
}
