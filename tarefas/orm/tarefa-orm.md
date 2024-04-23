# Tarefa ORM

### Links

### OBDC ([index.js](https://github.com/suelitonx/bd2/blob/main/tarefas/orm/ODBC/index.js))
ODBC (Open Database Connectivity) é uma interface padrão para acesso a bancos de dados. Ele permite que sistemas de softwares se conectem a vários SGBDs (Sistemas Gerenciadores de Bancos de Dados) de forma independente da plataforma.
- O pacote pg é o driver oficial recomendado para se conectar ao PostgreSQL a partir do Node.js.
- Ele segue os padrões da biblioteca libpq, que é utilizada nas aplicações nativas do PostgreSQL.
- Ao invés de usar ODBC, o pg implementa a conexão de forma nativa, sem necessidade de drivers ODBC instalados.
- Para gerenciar múltiplas conexões de forma eficiente, o pg utiliza o conceito de pool (pool de conexões).
- Isso é feito através da classe Pool, onde especificamos parâmetros de conexão como BD, usuário, senha etc.
- Ao executar queries, o driver reutiliza conexões já abertas da pool, ao invés de criar novas a cada operação.
- Isso melhora o desempenho ao evitar overhead de estabelecer novas conexões sempre.
- Podemos executar queries/transações através dos métodos do pool, como pool.query(), pool.connect() etc.

##### Criei os endpoints para a resposta (a, b, c) da questão 5

> http://localhost:3000/questao5/a
> http://localhost:3000/questao5/b
> http://localhost:3000/questao5/c

### ORM
ORM (Object Relationship Mapping) é uma técnica de mapear objetos de programação para tabelas relacionais em bancos de dados.

No Node.js, podemos utilizar ORMs para:
- Abstrair a camada de acesso a dados e consultas SQL.
- Trabalhar com objetos e métodos ao invés de queries diretas.
- Definir modelos (classes/tabelas) e associações entre eles.
- Realizar operações CRUD de forma simplificada.

Um dos frameworks ORM mais populares para Node.js é o Sequelize. Alguns pontos:
- Permite definir modelos nomeando atributos e relacionamentos.
- Conecta a diversos bancos como PostgreSQL, MySQL, Sqlite etc.
- Realiza mapeamento automático de tipos de dados.
- Inclui métodos para criar, ler, atualizar e deletar registros.
- Gerencia transações de forma agrupada.
- Possui poderosos mecanismos de associação entre modelos.
- Cria estruturas otimizadas para melhor desempenho.
- Facilita escalabilidade em aplicações com muitos dados.