import styles from "./dataNotFound.module.css"
interface DataNotFoundProps {
  module?: string;
  customLable?: string;
}
const DataNotFound = ({module, customLable} : DataNotFoundProps) => {
  return (
    <div className={styles.container}>
      {customLable || `${module || "Data"} Not Found`}
    </div>
  )
}

export default DataNotFound
