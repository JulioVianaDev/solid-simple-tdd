TDD usando solid

Comandos docker usados:

### movendo o banco do wsl pra imagem

```
docker cp create.sql {dockerImageName}:/create.sql
```

### inicializando o create.sql:

```
docker exec -it  solid-simple-tdd-db-1 psql -U julio -d julio -f /create.sql
```

### Entrando na imagem

```
 docker exec -it solid-simple-tdd-db-1 psql -U julio -d julio
```

### Conectando ao banco

```
\c julio
```

### selecionando o contratos 

```
select * from julio.contract;
```