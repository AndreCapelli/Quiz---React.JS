import { useState } from "react";
import Questao from "../components/Questao";
import QuestaoModel from "../model/questao";
import RespostaModel from "../model/resposta";

const questaoMock = new QuestaoModel(1, "Melhor Cor?", [
  RespostaModel.errada("Verde"),
  RespostaModel.errada("Vermelha"),
  RespostaModel.errada("Azul"),
  RespostaModel.certa("Preta"),
]);

export default function Home() {
  const [questao, setQuestao] = useState(questaoMock);

  function onResponse(indice: number) {
    setQuestao(questao.responderCom(indice));
  }

  function tempoEsgotado() {
    if (!questao.respondida) {
      setQuestao(questao.responderCom(-1));
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Questao
        valor={questao}
        onResponse={onResponse}
        tempoEsgotado={tempoEsgotado}
      />
    </div>
  );
}
