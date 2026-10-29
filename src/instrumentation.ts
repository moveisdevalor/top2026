export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    process.on("uncaughtException", (err) => {
      console.error("uncaughtException, encerrando para reinício do PM2:", err);
      process.exit(1);
    });
    process.on("unhandledRejection", (reason) => {
      console.error("unhandledRejection, encerrando para reinício do PM2:", reason);
      process.exit(1);
    });
  }
}
