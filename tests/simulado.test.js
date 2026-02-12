const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testarSimulado() {
    // Configura o driver (o Selenium Manager tratará do resto)
    let options = new chrome.Options();
    options.addArguments('--loglevel=3'); // Ignora avisos e logs de erro do sistema
    options.addArguments('--silent');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    

    try {
        // 1. Abre o seu projeto (ajuste o caminho se estiver a usar um servidor local)
        // Se estiver apenas a abrir o ficheiro localmente:
        await driver.get(`file://${process.cwd()}/index.html`); 

        // 2. Tela de Login: Preenche Nome e Instituição
        await driver.findElement(By.id('nome-input')).sendKeys('Candidato Teste');
        await driver.findElement(By.id('inst-input')).sendKeys('Escola de Tecnologia');
        
        // Clica no botão para iniciar
        await driver.findElement(By.className('btn-primary')).click();

        // 3. Tela de Seleção: Escolhe o caderno de Front-End
        // Espera o card estar visível
        const cardFront = await driver.wait(
            until.elementLocated(By.xpath("//h3[text()='FRONT-END']")), 
            5000
        );
        await cardFront.click();

        for (let i = 1; i <= 10; i++) {
            console.log(`Respondendo questão ${i}...`);

            // Espera as opções de resposta (da sua classe .opcao-item) estarem visíveis
            await driver.wait(until.elementLocated(By.className('opcao-item')), 5000);

            // Procura todas as opções de rádio da questão atual
            const opcoes = await driver.findElements(By.name('resposta'));
            
            // Clica na primeira opção (índice 0) de cada questão
            await opcoes[0].click();

            // Se for a última questão (10), clica em "Finalizar Prova"
            // Caso contrário, clica em "Próxima"
            if (i === 10) {
                const btnFinalizar = await driver.findElement(By.className('btn-finalizar'));
                await btnFinalizar.click();

                try {
                    // O alerta só aparece no seu script.js se faltarem respostas
                    // Como respondemos todas, vamos tentar lidar com ele apenas se aparecer
                    await driver.wait(until.alertIsPresent(), 1000);
                    await driver.switchTo().alert().accept();
                    console.log("Alerta de confirmação aceito.");
                } catch (e) {
                    // Se não houver alerta, o código continua normalmente para o resultado
                    console.log("Nenhum alerta apareceu (todas as questões foram respondidas).");
                }
            } else {
                const btnProximo = await driver.findElement(By.id('btn-proximo'));
                await btnProximo.click();
            }
            
            // Pequena pausa para você conseguir observar a automação visualmente
            await driver.sleep(500); 
        }

        // 5. Verificação Final: Checar se a nota aparece na tela
        await driver.wait(until.elementLocated(By.id('nota')), 5000);
        const notaFinal = await driver.findElement(By.id('nota')).getText();
        console.log(`Simulado finalizado! Sua nota foi: ${notaFinal}`);

    } catch (error) {
        console.error("O teste falhou:", error);
    } finally {
        // Aguarda 3 segundos para ver o resultado antes de fechar
        await driver.sleep(3000);
        await driver.quit();
    }
}

testarSimulado();