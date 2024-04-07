<p align="center">
  <a href="https://angular.io" target="blank"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="200" alt="Angular logo"> </a>
</p>

# Frontend

Тестовое задание для Парадокс <br>
Node version 18.10.0 <br>
Версия Angular: [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

### Сторонние ресурсы
В проекте используются [moment.js](https://momentjs.com/) и [Taiga-ui](https://taiga-ui.dev)

### Режим разработки

`ng serve`: Запуск в режиме разработчика. Рабочий порт: `http://localhost:4200/`. 

### Сборка 

`ng build`: Сборка проекта. Артефакты собираются в папке `dist/`. Содержимое папки dist/frontend необходимо скопировать в `dist` backend под именем `client` после сборки backend-проекта.

# Модули

## 1. Теги

Облако тегов, с возможностью добавления, а также редактирования/удаления для неиспользующихся тегов

## 2. Уведомления

Сетка карточек уведомлений с просмотром ранее созданных и созданием новых (с указанием содержания и срока выполнения).
Выполненные уведомления можно пометить чекбоксом. 

## 3. Заметки
Таблица заметок с функционалом добавления, просмотра, редактирования и удаления заметок. 
Переход на заметку осуществляется по двойному клику строки.
Редактирование и удаление доступны по кнопкам столбца "действия".
Создание - отдельная кнопка слева над таблицей.

# Навигация
Навигация по модулям осуществляется при помощи tab-панели под header'ом.


## файловая структура (внутри src/app):
1. [api-services](/src/app/api-services): абстракции над HttpClient и конечные endpoint'ы, перехватчики
2. [outer-wrap](/src/app/outer-wrap): footer и header 
3. [models](/src/app/models): интерфейсы
4. Модули:
   * [tabs](/src/app/tabs): tab-панель навигации
   * [notes](/src/app/notes): модуль заметок
   * [notifications](/src/app/notifications): модуль уведомлений
   * [tags](/src/app/tags): модуль тегов
5. app.* - корень приложения

