import styles from "./menu.module.css";
import MenuPosts from "./MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";
const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sub_title}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts showImage={false} />
      <h2 className={styles.sub_title}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.sub_title}>Choosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts />
    </div>
  );
};

export default Menu;
