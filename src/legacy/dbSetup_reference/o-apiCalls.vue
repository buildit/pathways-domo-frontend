<template>
  <div>
    <h1>API Calls</h1>

    <h2>DBs</h2>

    7881f857-4db0-4a12-9295-d625d1164933 - pathways_linkage_user_to_skill (1)<br>
    66101ce3-6851-4e57-b9bb-b441884e2c0e - pathways_linkage_skill_to_groups (65)<br>
    ed1e7311-0a95-4923-927f-67a0b8764374 - pathways_roles (5)<br>
    556bf6f5-304e-4c05-8600-39cd7e3b61a6 - pathways_skill_descriptions (260)<br>
    93826da7-4292-499f-a6bd-d90fb9dff9f5 - pathways_groups (7)<br>
    1e8b696d-9f3d-40cf-85f0-def955da9401 - pathways_skills (65)<br>
    e409dad8-eacf-4c74-a871-9b0b674798c2 - pathways_skill_levels (4)<br>

    <h2>Users DB Metadata</h2>

    <button @click="getDataset(dataSetID)">
      Load Users Metadata
    </button>

    <ol>
      <li v-for="(item, key) in dataset">
        {{ key }}: "{{ item }}"
      </li>
    </ol>


    <h2>Data from User API</h2>
    <button @click="getDatasetData(dataSetID)">
      Load Users
    </button>

    <ol>
      <template v-for="row in datasetData.data">
        <li v-if="row.user_is_active==='true'">
          <a v-bind:href="'#/u/'+row.user_first_name+'/'+row.user_last_name+'/'+row.user_id">
            {{ row.user_id }} {{
              row.user_first_name }} {{ row.user_last_name }}</a>
          <span v-if="row.user_is_contractor==='true'"> (Contractor)</span>
        </li>
      </template>
    </ol>

    <h2>Datasets</h2>

    <button @click="getDatasetList">
      Load Datasets
    </button>

    <ol>
      <li v-for="item in datasetList">
        {{ item.id }} - {{ item.name }} ({{ item.rows }})
      </li>
    </ol>
  </div>
</template>

<script>
    import axios from 'axios';
    import Papa from 'papaparse';

    export default {
        name: 'o-apiCalls',
        data() {
            return {
                accessToken: '',
                datasetListOffset: 0,
                datasetList: [],
                dataset: [],
                datasetData: '',
                dataSetID: '8b209fa4-bb92-4b39-8e73-3f4183542129'
            };
        },
        // Fetches posts when the component is created.
        created() {
            console.clear();
            this.getAccessToken();
        },
        methods: {
            getAccessToken() {
                const config = {
                    url: 'https://api.domo.com/oauth/token?grant_type=client_credentials&scope=data%20user',
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/jsonObject',
                        'Authorization': 'Basic ' + btoa('b8ac9139-d8f6-4bff-b7c8-34167d242ee6:73f47d8f10cfb960aa3ac3b2c6647ceeccf2788c6b13259de018e74dd6abe617')
                    }
                };

                axios(config)
                    .then(response => {
                        console.log('getting access token');
                        console.log(response);

                        if (response.status === 200) {
                            this.accessToken = 'Bearer ' + response.data.access_token;

                            //8b209fa4-bb92-4b39-8e73-3f4183542129 - Users API (330)

                            // this.getDatasetData(this.dataSetID);
                            // this.getDataset(this.dataSetID);
                            // this.getDatasetList();
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getDatasetList() {
                const config = {
                    url: 'https://api.domo.com/v1/datasets',
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/jsonObject',
                        'Authorization': this.accessToken
                    },
                    params: {
                        'offset': this.datasetListOffset
                    }
                };

                axios(config)
                    .then(response => {
                        console.log('getting dataset list');
                        console.log(response);

                        if (response.status === 200 && response.data.length > 0) {
                            for (let i = 0; i < response.data.length; i++) {
                                this.datasetList.push(response.data[i]);
                            }

                            this.datasetListOffset += 51;

                            this.getDatasetList();
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getDataset(id) {
                // b390b522-36e2-4009-8966-0ac31457552f = user api from harvest


                const config = {
                    url: 'https://api.domo.com/v1/datasets/' + id,
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/jsonObject',
                        'Authorization': this.accessToken
                    },
                    params: {}
                };

                axios(config)
                    .then(response => {
                        console.log('getting info about dataset');
                        console.log(response);

                        if (response.status === 200) {
                            this.dataset = response.data;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getDatasetData(id) {
                // b390b522-36e2-4009-8966-0ac31457552f = user api from harvest


                const config = {
                    url: 'https://api.domo.com/v1/datasets/' + id + '/data',
                    method: 'get',
                    headers: {
                        'Content-Type': 'text/csv',
                        'Authorization': this.accessToken
                    },
                    params: {
                        includeHeader: true
                    }
                };

                axios(config)
                    .then(response => {
                        console.log('getting data from dataset');
                        console.log(response);

                        if (response.status === 200) {
                            const papaParseConfig = {
                                header: true,
                            };

                            this.datasetData = Papa.parse(response.data, papaParseConfig);

                            console.log(this.datasetData);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>

<style scoped>

</style>
