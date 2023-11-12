export default function admin({ router }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role !== "admin") {
    return router.push({ name: "dashboard" });
  }
}
