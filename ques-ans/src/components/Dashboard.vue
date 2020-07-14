<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Questions</h4>
      </li>
      <li v-for="ques in quesans" v-bind:key="ques.id" class="collection-item">
        {{ ques.quesno }}: {{ ques.ques }}
        <router-link
          class="secondary-content"
          v-bind:to="{ name: 'view-question', params: { quesno: ques.quesno } }"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseinit";
export default {
  name: "dashboard",
  data() {
    return {
      quesans: []
    };
  },
  created() {
    db.collection("quesans")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            quesno: doc.data().quesno,
            ques: doc.data().ques,
            ans: doc.data().ans
          };
          this.quesans.push(data);
        });
      });
  }
};
</script>
