# Tarefa ORM

### Links

### OBDC
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