import styles from './ErrorText.module.css';

type TProps = {
  label: string;
};
const ErrorText = (props: TProps) => {
  const { label } = props;
  return <p className={styles.errorBlock}>{label}</p>;
};

export default ErrorText;
