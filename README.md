# Constr Up - Gestão de Produtos (Frontend)

Interface web moderna desenvolvida em **Vue.js 3**, **TypeScript** e **Vite** para gerenciamento e controle de estoque de produtos, consumindo a [API em Laravel (Backend)](https://github.com/pcidro/constr_up-back_end).

---

## Tecnologias Utilizadas

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API com `<script setup>`)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Cliente HTTP**: [Axios](https://axios-http.com/)
- **Ícones**: [lucide-vue-next](https://lucide.dev/)

---

## Funcionalidades

- Listagem de Produtos: Tabela com exibição de nome, marca, preço formatado, descrição e badge dinâmica de status de estoque.
- Cadastro de Produtos: Modal com formulário interativo para cadastro de novos itens.
- Edição de Produtos: Modal dedicado para atualização dos dados de produtos existentes.
- Exclusão de Produtos: Remoção com confirmação de segurança.

## Como Executar o Projeto

### 1. Pré-requisitos

backend em Laravel esteja rodando em `http://127.0.0.1:8000`.  
Consulte as instruções no repositório do backend: [https://github.com/pcidro/constr_up-back_end](https://github.com/pcidro/constr_up-back_end).

### 2. Clonar o repositório

```bash
git clone https://github.com/pcidro/constr_up-front-end.git
cd constr_up-front-end
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar em ambiente de desenvolvimento

```bash
npm run dev
```

O aplicativo estará acessível no navegador em: `http://localhost:5173`
