<template>
  <div id="view-question">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{Questions}}</h4>
      </li>
      <li class="collection-item">Ques No#: {{quesno}}</li>
      <li class="collection-item">Answer: {{ans}}</li>
      <li class="collection-item">Reason: {{res}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteQues" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{ name: 'edit-question', params: { quesno: quesno }}"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseinit";
export default {
  name: "view-question",
  data() {
    return {
      quesno: null,
      ques: null,
      ans: null,
      res: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("quesans")
      .where("quesno", "==", to.params.quesno)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.quesno = doc.data().quesno;
            vm.ques = doc.data().ques;
            vm.ans = doc.data().ans;
            vm.res = doc.data().res;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("quesans")
        .where("quesno", "==", this.$route.params.quesno)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.quesno = doc.data().quesno;
            this.ques = doc.data().ques;
            this.ans = doc.data().ans;
            this.res = doc.data().res;
          });
        });
    },
    deleteQues() {
      if (confirm("Are you sure?")) {
        db.collection("quesans")
          .where("quesno", "==", this.$route.params.quesno)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>