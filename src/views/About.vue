<template>
  <v-container class="pb-12">
    <v-card>
      <v-card-title class="text-justify">
        Olá! Meu nome é Vitor James e gostaria de apresentar o meu projeto
        pessoal: um site que reúne as imagens das missões de Marte, registradas
        pelos rovers que estão explorando o Planeta Vermelho.
      </v-card-title>
      <v-card-text class="text-sm-h6 text-justify">
        O objetivo do meu projeto é oferecer ao público em geral a oportunidade
        de explorar e visualizar as incríveis paisagens de Marte, como nunca
        antes visto. As imagens registradas pelos rovers são verdadeiras obras
        de arte, que revelam a beleza e complexidade do planeta vizinho. Além de
        apresentar as imagens, o site também traz informações sobre cada missão,
        incluindo seus objetivos, resultados e descobertas mais importantes. É
        um lugar para aprender e se inspirar, para aqueles que são fascinados
        pelo universo e pela exploração espacial.

        <br /><br />
        As imagens de Marte capturadas pelos rovers têm sido uma das maiores
        conquistas da exploração espacial nas últimas décadas. Com o meu site,
        espero que todos possam desfrutar dessa maravilha e sentir-se inspirados
        a continuar explorando o cosmos.

        <b
          >O site é uma iniciativa independente e está em constante atualização,
          para garantir que as imagens mais recentes e as informações mais
          relevantes sejam sempre compartilhadas com o público. Espero que você
          goste do meu projeto e que ele inspire você a conhecer mais sobre o
          universo. <br /><br />
          Se você gostou do projeto e gostaria de ajudar a manter, pode enviar
          qualquer valor para a chave PIX:</b
        >
      </v-card-text>
      <v-card-actions>
        <v-card width="100%" elevation="0" outlined class="ma-2">
          <v-card-text class="pa-1">
            <v-col cols="12">
              <v-row>
                <v-col cols="12">
                  <h4>Chave aleatória</h4>
                </v-col>
                <v-col cols="12">
                  <h4>{{ pixKey }}</h4>
                </v-col>
                <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                  <v-btn color="primary" block @click="copyUrl()" ref="mylink"
                    >{{ copyText }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pixKey: "deca3170-a333-498f-ba33-404671f4f88d",
    copyText: "Copiar"
  }),
  methods: {
    copyUrl() {
      const el = document.createElement("textarea");
      el.value = this.pixKey;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      this.copyText = 'Copiado';
      setTimeout(() => {
        this.copyText = 'Copiar';
      }, 1500);
    },
  },
};
</script>

<style>
</style>