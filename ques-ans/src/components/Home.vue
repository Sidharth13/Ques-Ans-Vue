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
  name: "home",
  data() {
    return {
      quesans: [],
    };
  },
  created() {
    db.collection("quesans")
      .orderBy("quesno")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            quesno: doc.data().quesno,
            ques: doc.data().ques,
            ans: doc.data().ans,
            res: doc.data().res,
          };
          this.quesans.push(data);
        });
      });
  },
};
</script>
