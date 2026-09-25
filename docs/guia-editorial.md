# Guia de instalação e edição — LabHO

Arquivo para instalar: `labho.zip`, gerado com `npm run package` (fica em `dist/`). Requisitos: WordPress 6.0 ou mais novo e PHP 7.4 ou mais novo. Não precisa de nenhum plugin.

---

## 1. Instalação (DTI / quem administra o WordPress)

1. Vá em **Aparência › Temas › Adicionar novo › Enviar tema**, escolha `labho.zip` e clique em **Ativar**.
2. Em **Configurações › Links permanentes**, escolha **Nome do post** e salve. Isso ativa os endereços `/acervo/`, `/eventos/` e `/entrevista/nome/`.
3. Crie as páginas abaixo em **Páginas › Adicionar**. O endereço (slug) precisa ser exatamente este:
   | Página | Slug | O que aparece |
   |---|---|---|
   | Início (qualquer título) | livre | a página inicial |
   | Quem somos | `laboratorio` | abas "Quem somos" e "Produções" |
   | Contato | `contato` | e-mail, endereço e redes |
4. Em **Configurações › Leitura**, marque **Uma página estática** e escolha a página "Início".
5. Em **Aparência › Personalizar › Contatos do laboratório**, preencha o e-mail (labho.dhi@ufv.br), o endereço, o Instagram e o YouTube.
6. Em **Aparência › Widgets › Rodapé — Apoio (logos)**, adicione um bloco **Imagem** para cada logo de apoio. O ideal é usar PNG ou SVG com fundo transparente.
7. *(Opcional)* Em **Aparência › Menus**, monte o menu "Menu principal". Sem menu, o site já mostra Início · Sobre · Acervo · Eventos · Contato.
8. Cadastre a equipe em **Usuários** com o papel **Editor**. Esse papel publica conteúdo, mas não mexe no tema nem nos plugins.

> Mantenha o WordPress e os plugins atualizados. O tema não depende de nenhum plugin, então as atualizações não quebram o site.

---

## 2. Como alimentar o site (equipe do laboratório)

### Página inicial
A abertura (fundo laranja com "Laboratório de História Oral" e a logo da UFV) é fixa no tema. Os demais trechos vêm da página "Início":
- **Título**: é a frase de abertura da apresentação, logo abaixo do banner. Coloque a palavra que deve ficar em itálico entre asteriscos, por exemplo `Vozes que *atravessam* o tempo.`
- **Resumo** (fica na barra lateral, em "Resumo"): é a frase que aparece abaixo do título.
- **Imagem destacada**: é a foto grande ao lado da apresentação.
- **Conteúdo**: é o texto de apresentação. Se você incluir um bloco **Galeria**, ele vira o carrossel de fotos. As legendas das fotos aparecem no carrossel.

A **animação das pessoas com balões** se monta sozinha a partir das entrevistas que têm o campo "Fala em destaque" preenchido. Ela mostra até 7 falas, sorteadas, e só aparece quando houver pelo menos 2. Na animação, clicar em quem está falando abre a entrevista daquela pessoa.

### Projetos (Acervo)
Menu **Projetos**. Cada projeto (por exemplo, "Memórias negras e indígenas da Zona da Mata") tem:
- **Título**, **Imagem destacada** (banner) e **Resumo** (frase curta).
- **Conteúdo**: vira a aba **Apresentação**. Um bloco Galeria no conteúdo vira a grade de fotos.
- **Atributos › Ordem**: define a ordem dos projetos (1, 2, ...).

A aba **Entrevistas** do projeto é montada automaticamente, com busca e filtro de A a Z.

### Entrevistas
Menu **Entrevistas › Adicionar**:
- **Título**: nome completo da pessoa entrevistada.
- **Imagem destacada**: foto da pessoa.
- **Resumo**: uma linha, por exemplo "Capitã de congado".
- **Conteúdo**: biografia. Um bloco **Galeria** no fim vira a galeria de fotos em grade.
- Painel **Dados da entrevista**, abaixo do editor (se estiver recolhido, clique em "Meta Boxes"):
  - **Projeto do acervo**: em qual projeto a entrevista aparece.
  - **Fala em destaque**: uma frase curta para os balões da página inicial.
  - **Vídeo no YouTube**: cole o link do vídeo. O vídeo abre em pop-up.
  - **Transcrição em PDF**: clique em "Enviar / escolher PDF".
  - **Ficha técnica**: um item por linha, no formato `Campo: valor`.

### Eventos
Menu **Eventos**: título, imagem destacada (banner), resumo, conteúdo (descrição e galeria), e o painel **Dados do evento** (data, local, link da gravação e pasta de certificados no Drive). A lista de eventos se ordena sozinha pela data.

### Produções
Menu **Produções**: título, imagem, resumo, tipo (YouTube, Site, Drive...) e link. As produções aparecem na aba "Produções" da página Sobre.

### Dicas
- Fotos: use JPG de até cerca de 2000 px de largura. O WordPress gera as versões menores sozinho.
- Enquanto um item não tem foto, o site mostra um fundo em degradê no lugar.

---

## 3. Para desenvolvedores
Arquitetura, modelo de conteúdo e ambiente de desenvolvimento estão no [README](../README.md). Abaixo, só o que interessa a quem for manter o tema no servidor.

- Tipos de conteúdo: `projeto` (arquivo em `/acervo/`), `entrevista`, `evento` (arquivo em `/eventos/`) e `producao` (sem página própria).
- Campos: post meta `_labho_*`, com meta boxes nativas em `functions.php` (`labho_fields()`).
- Front-end: `assets/js/app.js` (módulo ES) e `assets/js/scene.js` (a cena Three.js). Three.js e Lenis vêm por CDN via importmap (jsDelivr). Se a rede da UFV bloquear CDN, baixe os dois arquivos para `assets/js/vendor/` e troque as URLs no `functions.php` (hook `wp_head`).
- Estilos: `assets/css/main.css`. As cores ficam em `:root`.
- Fontes: a referência visual (thereach.travel) usa **Bradford LL** (Lineto) e **TWK Everett** (Weltkern), ambas pagas. O tema usa as alternativas gratuitas mais próximas: Newsreader e Inter Tight (Google Fonts). Se o laboratório comprar a licença web, coloque os arquivos `.woff2` em `assets/fonts/` e declare `@font-face` no topo do `main.css` com os nomes `"Bradford LL"` e `"TWK Everett"`. As variáveis `--serif` e `--sans` já dão prioridade a essas fontes.
- Logos da UFV 100 anos: `assets/img/ufv100-branco.png` (no banner) e `assets/img/ufv100-laranja.png` (no rodapé).
