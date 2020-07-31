<template>
  <div id="new-question">
    <h3>New Question</h3>
    <div class="row">
      <form @submit.prevent="saveQues" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="quesno" required />
            <label>Ques No#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ques" required />
            <label>Ques</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ans" required />
            <label>Answer</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="res" required />
            <label>Reason</label>
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
  name: "new-employee",
  data() {
    return {
      quesno: null,
      ques: null,
      ans: null,
      res: null
    };
  },
  methods: {
    saveQues() {
      db.collection("quesans")
        .add({
          quesno: this.quesno,
          ques: this.ques,
          ans: this.ans,
          res: this.res
        })
        .then(docRef => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error adding ques: ", error);
        });
    }
  }
};
</script>