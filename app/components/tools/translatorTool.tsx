import styles from "./styles.module.scss";
import type { TranslateParams, TranslateResult } from "~/tools.definition";

const TranslatorTool = ({
  input,
  output,
}: {
  input: TranslateParams;
  output?: TranslateResult;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.inputSection}>
          <div className={styles.label}>Input</div>
          <div className={styles.text}>{input.text}</div>
          <div className={styles.meta}>Target: {input.targetLanguage}</div>
        </div>

        <div className={styles.separator} />

        <div className={styles.outputSection}>
          <div className={styles.label}>Output</div>
          <div className={styles.text}>
            {output ? (
              output.result
            ) : (
              <span className={styles.loading}>Translating...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorTool;
