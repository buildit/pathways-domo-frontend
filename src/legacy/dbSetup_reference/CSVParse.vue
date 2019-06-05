<template>
  <div>
    <input
      v-model="dbName"
      type="text"
    >
    <textarea
      v-model="message"
      class="message"
      rows="10"
      col="50"
      @change="parseCSV"
    ></textarea><br>

    <p>
      <button @click="submitDB">
        Submit
      </button>
    </p>
    <!--<p class="booktext">{{ message }} </p>-->
    <ul>
      <li v-for="(item, key) in jsonObject">
        {{ key }}: "{{ item }}"
      </li>
    </ul>
  </div>
</template>

<script>
    const fb = require('../../firebaseConfig.js');

    export default {
        name: "CSVParse",
        data() {
            return {
                message: '',
                dbName: 'skill_groups',
                jsonObject: [],
                rolesObject: []
            };
        },
        created: function () {
            fb.rolesCollection.get().then( docs => {
                this.rolesObject = docs;
            });
        },
        methods: {
            parseCSV() {
                this.jsonObject = JSON.parse(this.message);
                console.log(this.jsonObject);
            },
            submitDB() {
                this.jsonObject = JSON.parse(this.message);

                // const db = fb.firebase.firestore();
                const targetCollection = fb.db.collection(this.dbName);

                for (let i = 0; i < this.jsonObject.length; i++){
                    targetCollection.doc().set({
                        name: this.jsonObject[i].name,
                        // description: this.jsonObject[i].description
                    }).catch(err => {
                        console.log(err);
                    });
                }


            }
        }
    };
</script>

<style scoped>

</style>
