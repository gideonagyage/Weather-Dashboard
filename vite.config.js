import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const envIP = process.env.VITE_IP;
  const envPort = process.env.VITE_PORT;

  return defineConfig({
    plugins: [vue()],
    server: {
      host: envIP,
      port: parseInt(envPort),
    },
  });
};
