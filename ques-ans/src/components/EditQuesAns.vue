<template>
  <div id="edit-question">
    <div class="row">
      <form @submit.prevent="updateQues" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="quesno" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ques" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ans" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseinit";
export default {
  name: "edit-question",
  data() {
    return {
      quesno: null,
      ques: null,
      name: null
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
          });
        });
    },
    updateQues() {
      db.collection("quesans")
        .where("quesno", "==", this.$route.params.quesno)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                quesno: this.quesno,
                ques: this.ques,
                ans: this.ans
              })
              .then(() => {
                this.$router.push({
                  name: "view-question",
                  params: { quesno: this.quesno }
                });
              });
          });
        });
    }
  }
};
</script>