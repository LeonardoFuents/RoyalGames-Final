# Royal Games

Loja/catálogo de **jogos** feito com **Next.js**. O visitante navega pelo catálogo, filtra por categoria e vê os detalhes de cada jogo; o administrador faz login para cadastrar, editar, ativar e remover jogos.

## Funcionalidades

- **Catálogo de jogos** com pesquisa e filtro por categoria
- **Detalhes do jogo**: classificação indicativa, gêneros, plataformas, preço e imagem
- **Login** com token salvo de forma segura
- **Cadastrar / editar jogo**: nome, valor, gênero, plataforma, classificação e imagem
- **Ativar/desativar** e **excluir** jogos

## Tecnologias

- **Next.js 16** (Pages Router) + **React 19** + **TypeScript**
- **Axios** para consumir a API REST
- **react-secure-storage** para guardar o token
- **react-toastify** para notificações
- CSS Modules

## Estrutura

```
src/
  components/   # header, footer, catalogo, info-banner
  pages/
    home/  login/  cadastrar-jogo/  detalhes-jogo/
    api/        # api.ts (Axios) + serviços: auth, jogo, gênero, plataforma, classificação
  utils/        # toasts
```

## Integração com a API

O front consome os recursos `Auth/login`, `Jogo`, `Genero`, `Plataforma` e `ClassificacaoIndicativa`. A URL base da API fica em `src/pages/api/api.ts`.

## Como rodar

Pré-requisitos: Node.js 18+ e a API do Royal Games rodando.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Autor

**Leonardo Fuentes** — [GitHub](https://github.com/LeonardoFuents)
