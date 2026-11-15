import CardList from "@/components/cardList/CardList"
import styles from "./blog.module.css"
import Menu from "@/components/menu/Menu"

const Blog = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.catg_title}>Fashion Blog</h1>
      <div className={styles.content_section}>
        <CardList />
        <Menu />
      </div>
    </div>
  )
}

export default Blog
