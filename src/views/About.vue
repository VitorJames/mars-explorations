<template>
  <v-container class="pb-12">
    <v-card>
      <v-card-text class="text-sm-h6 text-justify">
        O objetivo desse projeto é oferecer ao público em geral a oportunidade
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

        O site é uma iniciativa independente e está em constante atualização,
        para garantir que as imagens mais recentes e as informações mais
        relevantes sejam sempre compartilhadas com o público. Espero que você
        goste do projeto e que ele inspire você a conhecer mais sobre o
        universo. <br />
      </v-card-text>
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

<style></style>