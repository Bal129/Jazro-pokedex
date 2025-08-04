import { ref, onMounted, watch } from "vue";

const theme = ref("pokeball");
const themes = ["pokeball", "greatball", "ultraball", "masterball"];

export function useTheme() {
  const applyTheme = () => {
    document.documentElement.setAttribute("data-theme", theme.value);
  }

  const loadTheme = () => {
    const saved = localStorage.getItem("theme");
    // if (saved === "pokeball") theme.value = "pokeball"
    // else if (saved === "ultraball") theme.value = "ultraball"
    // else theme.value = "pokeball";

    if (!themes.includes(saved)) {
      theme.value = "pokeball";
    } else {
      theme.value = saved;
    }

    applyTheme();
  }

  const toggleTheme = () => {
    theme.value = theme.value === "pokeball" ? "ultraball" : "pokeball";
  }

  const changeTheme = (newTheme) => {
    theme.value = newTheme;
  }

  onMounted(loadTheme);

  watch(theme, (val) => {
    localStorage.setItem("theme", val);
    applyTheme();
  })

  return {
    theme,
    changeTheme
  }
}