const mercadopago = require("mercadopago");
const QRCode = require("qrcode");

module.exports = {
  name: "interactionCreate",
  execute: (client) => {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;

      try {
        // Solicitar valor ao cliente
        // await interaction.reply("Por favor, insira o valor a ser pago:");
        await interaction.deferReply();
        // Aguardar a resposta do cliente
        const filter = (response) =>
          response?.author?.id === interaction.user.id;
        //const valueCollector = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });

        // if (valueCollector.size === 0) {
        //   await interaction.followUp("Tempo para inserção do valor esgotado. Tente novamente.");
        //   return;
        // }

        const valueInput = await interaction.customId.split(":")[1];

        const transactionAmount = parseFloat(valueInput);

        // if (isNaN(transactionAmount)) {
        //   await interaction.followUp("Por favor, insira um valor válido.");
        //   return;
        // }

        // Configuração do Mercado Pago
        const config = {
          accessToken:
            "TEST-264671423807749-121120-e1a67a70890d2c950057d8a3f458f6d0-501937372",
          publicKey: "TEST-443ec9e0-70ac-4761-a774-0f5e89a5270f", // Adicione sua chave pública aqui
        };
        mercadopago.configurations = new mercadopago.MercadoPagoConfig(config);

        const paymentInstance = new mercadopago.Payment(
          mercadopago.configurations
        );

        if ((await interaction.customId.split(":")[0]) === "pix") {
          // Lógica para processar pagamento com PIX
          let payment_data = {
            body: {
              transaction_amount: transactionAmount,
              description: "Pagamento com PIX",
              payment_method_id: "pix",
              payer: {
                email: "bdarkbrclassic@gmail.com", // substitua pelo email do pagador
              },
            },
          };

          let pagamento = await paymentInstance.create(payment_data);
          console.log(
            "Resposta completa do pagamento PIX:",
            JSON.stringify(pagamento, null, 2)
          );

          if (pagamento && pagamento.point_of_interaction) {
            const transactionData =
              pagamento.point_of_interaction.transaction_data;
            console.log(
              "Dados da transação:",
              JSON.stringify(transactionData, null, 2)
            );

            if (transactionData.qr_code && transactionData.ticket_url) {
              const qrCodeText = transactionData.qr_code;
              const paymentLink = transactionData.ticket_url;

              console.log("Código QR:", qrCodeText);
              console.log("Link de pagamento:", paymentLink);

              // Gerar QR Code usando o módulo qrcode
              const qrCodeBase64 = await QRCode.toDataURL(qrCodeText);
              //const qrCodeBase64 = "text"

              await interaction.followUp({
                content: `${interaction.user} escolheu pagar com PIX. Aqui está o QR code e o código do PIX: \nLink de pagamento:\n ${paymentLink}  \nCódigo do PIX:\n ${qrCodeText}`,
                files: [
                  {
                    attachment: Buffer.from(
                      qrCodeBase64.split(",")[1],
                      "base64"
                    ),
                    name: "qrcode.png",
                  },
                ],
              });
            } else {
              console.log(
                "Erro: QR code ou link de pagamento não encontrados."
              );
              await interaction.followUp(
                "Houve um problema ao obter o QR code ou o link de pagamento. Por favor, tente novamente mais tarde."
              );
            }
          } else {
            console.log(
              "Erro: pagamento.body ou pagamento.body.point_of_interaction está indefinido."
            );
            await interaction.followUp(
              "Houve um problema ao processar o pagamento. Por favor, tente novamente mais tarde."
            );
          }
        }
        // else if (await interaction.customId.split(":")[0] === "cartao") {

        //   // Lógica para processar pagamento com Cartão de Crédito
        //   let payment_data = {
        //     body: {
        //       transaction_amount: transactionAmount,
        //       description: "Pagamento com Cartão de Crédito",
        //       payment_method_id: "visa", // ou outro método de pagamento válido
        //       payer: {
        //         email: "bdarkbrclassic@gmail.com", // substitua pelo email do pagador
        //       },
        //     },
        //   };

        //   let pagamento = await paymentInstance.create(payment_data);
        //   console.log("Resposta completa do pagamento Cartão de Crédito:", JSON.stringify(pagamento, null, 2));

        //   if (pagamento && pagamento.point_of_interaction) {
        //     const transactionData = pagamento.point_of_interaction.transaction_data;
        //     console.log("Dados da transação:", JSON.stringify(transactionData, null, 2));

        //     if (transactionData.ticket_url) {
        //       const paymentLink = transactionData.ticket_url;
        //       await interaction.followUp(
        //         `${interaction.user} escolheu pagar com Cartão de Crédito. Link para pagamento: ${paymentLink}`
        //       );
        //     } else {
        //       console.log("Erro: Link de pagamento não encontrado.");
        //       await interaction.followUp(
        //         "Houve um problema ao obter o link de pagamento. Por favor, tente novamente mais tarde."
        //       );
        //     }
        //   } else {
        //     console.log("Erro: pagamento.body ou pagamento.body.point_of_interaction está indefinido.");
        //     await interaction.followUp(
        //       "Houve um problema ao processar o pagamento. Por favor, tente novamente mais tarde."
        //     );
        //   }
        // }
      } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        await interaction.followUp(
          "Houve um erro ao processar seu pagamento. Tente novamente mais tarde."
        );
      }
    });
  },
};
