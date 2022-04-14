import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "../styles/Temporizador.module.css";

interface TemporizadorProps {
  duracao: number;
  tempoEsgotado: () => void;
}

export default function Temporizador(props: TemporizadorProps) {
  return (
    <div className={styles.temporizador}>
      <CountdownCircleTimer
        duration={props.duracao}
        size={120}
        isPlaying
        onComplete={props.tempoEsgotado}
        colors={["#22ED31", "#F3CA24", "#E81111"]}
        colorsTime={[7, 4, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
