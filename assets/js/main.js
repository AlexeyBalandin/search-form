/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// Получаем элементы DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
// Добавление слушателей событий на кнопку поиска и поле ввода
searchButton.addEventListener('click', searchRepositories);
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchRepositories();
  }
});
// Функция для получения поискового запроса и проверки
function searchRepositories() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length < 3) {
    alert('Пожалуйста, введите не менее трех символов.');
    return;
  }
  // Отправка запроса на Github API для поиска репозиториев
  fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Ничего не найдено</p>';
      } else {
        const results = data.items.slice(0, 10).map((item) => `
          <div class="result">
            <h3 class="result__title"><a href="${item.html_url}" target="_blank">${item.name}</a></h3>
            <p class="result__description">${item.description}</p>
            <p class="result__language">Language: ${item.language}</p>
          </div>
        `).join('');
        resultsContainer.innerHTML = results;
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Произошла ошибка при выполнении запроса.');
    });
}
