# Decomposição LU
(por um errinho bobo nomeamos o repositórios de gauss, porém o código descrito aqui implementa uma [decomposição LU](https://pt.wikipedia.org/wiki/Decomposi%C3%A7%C3%A3o_LU) para resolver um problema de sistrema linear de N variáveis)

## Como Rodar
A interface foi escrita em HTML enquanto a implementação em Javascript. Essa escolha foi feita porque queríamos uma interface mais amigável para nosso programa alem do fato de javascript possuir __for loops__ no estilo de C, que facilitam a implementação do algorítimo.

O HTML e o Javascript foram feitos para rodar em um servidor. Existem várias maneiras de rapidamente criar um servidor para exibir uma pagina completa no seu navegador. A minha opção favorita é usando um modulo do python que já vem instalado com a instalação padrão (fica ai essa dica):
```shell
python -m http.server 2424
```
Não é necessário especificar caminho nenhum pois o comando assume que o seu diretório atual é a raiz do servidor. Logo após isso, entre no seu navegador com o link `http://localhost:2424` para poder interagir com a interface.
