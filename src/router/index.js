import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/layout/Layout.vue";

const routes = [
  {
    name: "Layout",
    component: Layout,
    path: "/",
    redirect: "/dashboard",
    children: [
      {
        name: "dashboard",
        path: "/dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "profile",
        path: "/profile",
        component: () => import("@/views/Profile.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "organizational chart",
        path: "/oc",
        component: () => import("@/views/EmployeesChart.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "add employee",
        path: "/employee/add",
        component: () => import("@/views/employees/AddEmployee.vue"),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        name: "edit employee",
        path: "/employee/:id/edit",
        component: () => import("@/views/employees/EditEmployee.vue"),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        name: "view employee",
        path: "/employee/:id",
        component: () => import("@/views/employees/ViewEmployee.vue"),
        meta: {
          requiresAuth: true,
          admin: true,
        },
      },
      {
        name: "employees",
        path: "/employees",
        component: () => import("@/views/employees/Employees.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    name: "Auth",
    component: () => import("@/layout/AuthLayout.vue"),
    path: "/auth",
    redirect: "/login",
    children: [
      {
        name: "sign-in",
        path: "/login",
        component: () => import("@/auth/SignIn.vue"),
      },
    ],
  },
];

const router = Router();

function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  if (to.meta.requiresAuth && !token) {
    next("/login"); // Redirect to the login page if token is missing
  } else {
    if (to.meta.admin && role !== "admin") {
      next("/dashboard");
    } else {
      next(); // Continue to the requested route
    }
  }
});

export default router;
