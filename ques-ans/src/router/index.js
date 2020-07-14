import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NewQuesAns from "@/components/NewQuesAns";
import ViewQuesAns from "@/components/ViewQuesAns";
import EditQuesAns from "@/components/EditQuesAns";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/new",
      name: "new-question",
      component: NewQuesAns
    },
    {
      path: "/edit/:ques",
      name: "edit-question",
      component: EditQuesAns
    },
    {
      path: "/:ques",
      name: "view-question",
      component: ViewQuesAns
    }
  ]
});
