## Простое CRUD приложение

Данные читаются и сохраняются в _data.json_.
После запуска с помощью `npm run dev` возможны следующе запросы:

1. Показать все задачи

```javascript
curl -i -X GET http://localhost:1337/api/v1/todos
```
 
2. Найти задачу по id

```javascript
curl -i -X GET http://localhost:1337/api/v1/1
```

3. Добавить новую задачу с названием и приоритетом

```javascript
curl -d '{"title":"TaskTitle", "priority":1}' -H "Content-Type: application/json" -X POST http://localhost:1337/todos
```

4. Удалить задачу по id

```javascript
curl -i -X DELETE http://localhost:1337/todos/1
```

5. Изменить статус задачи (выполнена / не выполнена) по id

```javascript
curl -i -X PUT -H "Content-Type: application/json" -d '{ "isDone": true}'  http://localhost:1337/todos/2
```
