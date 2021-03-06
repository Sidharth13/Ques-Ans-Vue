import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import NewQuesAns from "@/components/NewQuesAns";
import ViewQuesAns from "@/components/ViewQuesAns";
import EditQuesAns from "@/components/EditQuesAns";
import Login from "@/components/Login";
import Register from "@/components/Register";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "new-question",
      component: NewQuesAns,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:ques",
      name: "edit-question",
      component: EditQuesAns,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:ques",
      name: "view-question",
      component: ViewQuesAns,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
