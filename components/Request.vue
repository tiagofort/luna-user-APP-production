<template>
    <v-container>
        <v-row justify="center">
            <v-dialog
                v-model="dialogRequest"
                persistent
                max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Request</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="4" class="text-right">
                                    <v-btn color="#b86935" height="50" class="mt-2 white--text" @click="btRemove()">-</v-btn>
                                </v-col>
                                <v-col cols="4">
                                    <v-otp-input
                                        v-model="data_request.qtd"
                                        label="Quantity"
                                        :length="1"
                                        required
                                    ></v-otp-input>
                                </v-col>
                                <v-col cols="4" class="text-left justify-center">
                                    <v-btn color="#b86935" height="50" class="mt-2 white--text" @click="btAdd()">+</v-btn>
                                </v-col>    
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-textarea
                                        v-model="data_request.obs"
                                        color="#b86935"
                                        outlined
                                        name="input-7-4"
                                        label="Comment">
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red"
                            text
                            @click="closeRequest(false)"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            color="green"
                            text
                            @click="submeterPedido(data_request)"
                        >
                            Send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data () {
        return{
            dialog: false,
            data_request: {
                qtd: '0',
                obs: ''
            }
        }
    },

    methods:{
        btAdd(){
            let temp = 0;
            temp = parseInt(this.data_request.qtd) + 1;
            this.data_request.qtd = temp.toString();
        },

        btRemove(){
        if(parseInt(this.data_request.qtd) > 0){
            let temp = 0;
            temp = parseInt(this.data_request.qtd) - 1;
            this.data_request.qtd = temp.toString();
        }else{
            this.data_request.qtd = '0';
        }    
        },

        clear(){
            this.data_request.qtd = '0'
            this.data_request.obs = '';
        }
    },
    
    props: ["submeterPedido", "closeRequest", "dialogRequest"]    
}     
</script>