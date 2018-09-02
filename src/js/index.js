require('styl/index.styl');
var html = require('pug/index.pug');
var moment = require('moment')
import { autocomplete } from "./autocomplete/autocomplete.js";
require('daterangepicker/daterangepicker')


if (module.hot) {
  module.hot.accept();
  document.body.innerHTML = html;
}

var countries = ["Афганистан", "Аландские острова", "Албания", "Алжир", "Американское Самоа", "Андорра", "Ангола", "Ангилья", "Антарктида", "Антигуа и Барбуда", "Аргентина", "Армения", "Аруба", "Австралия", "Австрия", "Азербайджан", "Багамы", "Бахрейн", "Бангладеш", "Барбадос", "Беларусь", "Бельгия", "Белиз", "Бенин", "Бермуды", "Бутан", "Боливия", "Босния и Герцеговина", "Ботсвана", "Остров Буве", "Бразилия", "Британская территория Индийского океана", "Бруней-Даруссалам", "Болгария", "Буркина-Фасо", "Бурунди", "Камбоджа", "Камерун", "Канада", "Кабо-Верде", "Каймановы острова", "Центрально-Африканская Республика", "Чад", "Чили", "Китай", "Остров Рождества", "Кокосовые (Килингские острова)", "Колумбия", "Коморские острова", "Конго", "Конго, Демократическая Республика", "Острова Кука", "Коста-Рика", "Берег Слоновой Кости", "Хорватия", "Куба", "Кипр", "Чешская Республика", "Дания", "Джибути", "Доминика", "Доминиканская Республика", "Эквадор", "Египет", "Сальвадор", "Экваториальная Гвинея", "Эритрея", "Эстония", "Эфиопия", "Фолклендские (Мальвинские) острова", "Фарерские острова", "Фиджи", "Финляндия", "Франция", "Французская Гвиана", "Французская Полинезия", "Южные Французские Территории", "Габон", "Гамбия", "Грузия", "Германия", "Гана", "Гибралтар", "Греция", "Гренландия", "Гренада", "Гваделупа", "Гуам", "Гватемала", "Гернси", "Гвинея", "Гвинея-Бисау", "Гайана", "Гаити", "Острова Херд и Макдональд", "Святейший Престол (Государство Ватикан)", "Гондурас", "Гонконг", "Венгрия", "Исландия", "Индия", "Индонезия", "Иран, Исламская Республика", "Ирак", "Ирландия", "Остров Мэн", "Израиль", "Италия", "Ямайка", "Япония", "Джерси", "Иордания", "Казахстан", "Кения", "Кирибати", "Корея, Демократическая Народная Республика", "Корея, Республика", "Кувейт", "Кыргызстан", "Лаосская Народно-Демократическая Республика", "Латвия", "Ливан", "Лесото", "Либерия", "Ливийская арабская джамахирия", "Лихтенштейн", "Литва", "Люксембург", "Макао", "Македония, бывшая югославская Республика", "Мадагаскар", "Малави", "Малайзия", "Мальдивы", "Мали", "Мальта", "Маршалловы острова", "Мартиника", "Мавритания", "Маврикий", "Майотта", "Мексика", "Микронезия, Федеративные Штаты", "Молдова, Республика", "Монако", "Монголия", "Черногория", "Монсеррат", "Марокко", "Мозамбик", "Мьянма", "Намибия", "Науру", "Непал", "Нидерланды", "Нидерландские Антильские острова", "Новая Каледония", "Новая Зеландия", "Никарагуа", "Нигер", "Нигерия", "Ниуэ", "Остров Норфолк", "Северные Марианские острова", "Норвегия", "Оман", "Пакистан", "Palau", "Палестинская территория, оккупированная", "Панама", "Папуа - Новая Гвинея", "Парагвай", "Перу", "Филиппины", "Pitcairn", "Польша", "Португалия", "Пуэрто-Рико", "Катар", "Воссоединение", "Румыния", "Российская Федерация", "Руанда", "Святой Бартелеми", "Святой Елены", "Сент-Китс и Невис", "Санкт-Люсия", "Сен-Пьер и Микелон", "Святой Винсент и Гренадины", "Самоа", "Сан-Марино", "Сан-Томе и Принсипи", "Саудовская Аравия", "Сенегал", "Сербия", "Сейшелы", "Сьерра-Леоне", "Сингапур", "Словакия", "Словения", "Соломоновы острова", "Сомали", "Южная Африка", "Южная Георгия и Южные Сандвичевы острова", "Испания", "Шри-Ланка", "Судан", "Суринам", "Свальбард и Ян Майен", "Свазиленд", "Швеция", "Швейцария", "Сирийская Арабская Республика", "Тайвань, провинция Китая", "Таджикистан", "Танзания, Объединенная Республика", "Таиланд", "Восточный Тимор", "Идти", "Токелау", "Тонга", "Тринидад и Тобаго", "Тунис", "Турция", "Туркменистан", "Острова Теркс и Кайкос", "Тувалу", "Уганда", "Украина", "Объединенные Арабские Эмираты", "Великобритания", "Соединенные Штаты", "Малые отдаленные острова Соединенных Штатов", "Уругвай", "Узбекистан", "Вануату", "Венесуэла", "Вьетнам", "Виргинские острова, британцы", "Виргинские острова, США", "Уоллис и Футуна", "Западная Сахара", "Йемен", "Замбия", "Зимбабве"];
var autoupdate = false;

function onResize() {
  if (window.matchMedia('(max-width: 800px)').matches) {
    $('.header-container-nav').removeClass('header-container-nav-visible')
  } else {
    $('.header-container-nav').addClass('header-container-nav-visible')
  }
}

function date1() {
  $('.date-picker').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minDate: new Date(),
    autoApply: true,
    autoUpdateInput: autoupdate,
    locale: {
      format: 'DD.MM'
    }
  }, function(chosen_date) {
    $('.date-picker').val(chosen_date.format('DD.MM'));
  });
}

function ChDate() {
  if ($('.date-picker').val().length == 0) {
    autoupdate = true;
    console.log('true');
    date1();
  };
  var departpicker = $('.date-picker').val();
  $('.date-picker-2').daterangepicker({
    minDate: departpicker,
    singleDatePicker: true,
    showDropdowns: true,
    autoApply: true,
    locale: {
      format: 'DD.MM'
    }
  });

  var drp = $('.date-picker-2').data('daterangepicker');
  drp.setStartDate(departpicker);
  drp.setEndDate(departpicker);
}
$(document).ready(function() {

  date1();
  $('.date-picker-2').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minDate: new Date(),
    autoApply: true,
    autoUpdateInput: false,
    locale: {
      format: 'DD.MM'
    }
  }, function(chosen_date) {
    $('.date-picker-2').val(chosen_date.format('DD.MM'));
  });
  $('.date-picker').on('apply.daterangepicker', ChDate);

  $('.header-button, .header-nav__span').click(function() {
    $('.header-container-nav').slideToggle();
  });
  $('.header-list__item-link').click(function() {
    $('.header-list__item-link').removeClass('header-list__item-link-active');
    $(this).addClass('header-list__item-link-active');
    $('.header-nav__span').text($(this).text())
    $('.header-container-nav').slideUp();
  })
  $('.find-out-more').click(function() {
    $('.find-more-container').slideToggle();
  })
  onResize();
  $(window).on('resize', onResize);
  autocomplete(document.getElementById("country-input"), countries);
});